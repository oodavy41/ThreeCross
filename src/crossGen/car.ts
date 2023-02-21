import {
  ArrowHelper,
  BoxGeometry,
  BufferGeometry,
  Color,
  Layers,
  Line,
  LineBasicMaterial,
  Material,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  SphereGeometry,
  Vector,
  Vector2,
  Vector3,
} from "three";

import cross from "./cross";
import road from "./road";
import trail from "./trail";
import lane from "./lane";
import { ClassElement } from "typescript";
import carModel from "./carModel";
import { carModelType, CategoryId, targetTypes } from "./carModelTypes";
import { ArraySeries, EMWA } from "../utils/LPF";
const SHOW_TRAIL = false;
const Filter = false;
const SMOOTH = 0.2;

export interface carManager<userDataType> {
  selfObj: Object3D;
  update(T: number): {
    pos: Vector3;
    coord: Vector3;
    type: number;
    layers: THREE.Layers;
    userdata?: userDataType;
  }[];
  getCar(id: string): car<userDataType> | carTrail | undefined;
}

export class carPool implements carManager<void> {
  selfObj: Object3D;
  limit: number;
  chance: number;
  cross: cross;
  carPool: carTrail[];
  lastLiving: number;
  constructor(chance: number, limit: number, parent: cross) {
    this.selfObj = new Object3D();
    this.limit = limit;
    this.chance = chance;
    this.cross = parent;
    this.carPool = [];
    this.lastLiving = -1;
  }

  switch(a: number, b: number) {
    let temp = this.carPool[a];
    this.carPool[a] = this.carPool[b];
    this.carPool[b] = temp;
  }
  beDead(pos: number) {
    if (pos !== this.lastLiving) {
      this.switch(pos, this.lastLiving);
    }
    this.lastLiving--;
  }
  awake() {
    let [from, to] = this.cross.randomLanes();
    let speed = (40 / 27000) * (Math.random() * 0.6 + 0.7);

    if (this.lastLiving + 1 >= this.carPool.length) {
      if (this.carPool.length < this.limit) {
        let newcar = new carTrail(from, to, speed);
        this.carPool.push(newcar);
        this.selfObj.add(newcar.carObj);
        this.lastLiving++;
        if (SHOW_TRAIL) {
          this.selfObj.add(newcar.trailObj);
          this.selfObj.add(...newcar.trail.trailPoints);
        }
      }
    } else {
      let car = this.carPool[this.lastLiving + 1];

      car.reset(
        from,
        to,
        speed,
        Math.floor((Math.random() * Object.keys(CategoryId).length) / 2)
      );
      this.lastLiving++;
    }
  }

  update(t: number) {
    let pos = 0;
    while (pos <= this.lastLiving) {
      let state = this.carPool[pos].update(t);
      if (!state) {
        this.beDead(pos);
      }
      pos++;
    }
    if (Math.random() < this.chance) {
      this.awake();
    }
    return this.carPool.map((car, idx) => {
      return {
        type: car.type,
        license: idx + "",
        coord: new Vector3(),
        pos: car.carObj.position.clone(),
        layers: car.carObj.layers,
      };
    });
  }
  getCar(id: string): carTrail | undefined {
    return this.carPool.find((car) => car.carObj.uuid === id);
  }
}

export class carMap<
  Q,
  T extends {
    position: Vector3;
    direction: Vector3;
    speed: Vector3;
    type?: CategoryId;
    userdata: Q;
  }
> implements carManager<Q>
{
  selfObj: Object3D;
  cross: cross;
  carMap: { [key: string]: { car: car<Q>; living: boolean } };
  constructor(parent: cross) {
    this.selfObj = new Object3D();
    this.cross = parent;
    this.carMap = {};
  }

  update(T: number) {
    for (let id in this.carMap) {
      this.carMap[id].car.update(T);
    }
    return Object.keys(this.carMap).map((key) => {
      let car = this.carMap[key].car;
      return {
        pos: car.carObj.position.clone(),
        coord: new Vector3(),
        type: car.type || 0,
        userdata: car.userData || undefined,
        layers: car.carObj.layers,
      };
    });
  }

  getCar(id: string): car<Q> | undefined {
    let resultId = Object.keys(this.carMap).find(
      (key) => this.carMap[key].car.carObj.uuid === id
    );
    return resultId ? this.carMap[resultId]?.car : undefined;
  }

  pushData(data: { [key: string]: T }) {
    for (let id in this.carMap) {
      this.carMap[id].living = false;
    }
    for (let uuid in data) {
      let carData = data[uuid];
      if (this.carMap[uuid]) {
        let carNode = this.carMap[uuid].car;
        carNode?.fit(
          carData.position,
          carData.direction,
          carData.speed,
          carData.type || 0,
          carData.userdata
        );
        this.carMap[uuid].living = true;
      } else {
        let carObj = new car<Q>(carData.type);
        carObj.fit(
          carData.position,
          carData.direction,
          carData.speed,
          carData.type || 0,
          carData.userdata
        );
        this.selfObj.add(carObj.carObj);
        this.carMap[uuid] = { car: carObj, living: true };
      }
    }
    for (let id in this.carMap) {
      if (!this.carMap[id].living) {
        let rubbish = this.carMap[id].car;
        this.selfObj.remove(rubbish.carObj);
        rubbish.carObj.traverse((obj) => {
          if (obj instanceof Mesh) {
            obj.geometry.dispose();
            obj.material.dispose();
          }
        });
        rubbish.carObj.visible = false;
        delete this.carMap[id];
      }
    }
    return Object.keys(this.carMap).map((key) => ({
      key,
      pos: this.carMap[key].car.carObj.getWorldPosition(new Vector3()),
    }));
  }
}

let carModelClass: undefined | (new (type: CategoryId) => carModel);
if (typeof window !== "undefined") {
  import("./carModel").then((carModel) => {
    console.log("load carModel");
    carModelClass = carModel.default;
  });
}

export class car<UserDataType> {
  carObj: Object3D;
  carModel?: carModel;
  dataSmoothing?: {
    pos: ArraySeries<EMWA>;
    dir: ArraySeries<EMWA>;
    speed: ArraySeries<EMWA>;
  };
  speed: Vector3;
  direction: Vector3;
  type?: CategoryId;
  userData?: UserDataType;

  constructor(type: CategoryId = 16) {
    // this.carObj = new Object3D();
    this.carObj = new Mesh(
      new BoxGeometry(0.3, 0.2, 0.6),
      new MeshBasicMaterial({
        color: 0x0,
        opacity: 0,
        transparent: true,
        depthWrite: false,
      })
    );
    this.carObj.layers.set(targetTypes.get(type));
    this.carObj.rotateY(Math.PI / 2);
    this.speed = new Vector3();
    this.direction = new Vector3();
    this.type = type;
    if (carModelClass) {
      this.carModel = new carModelClass(type);
      this.carObj.add(this.carModel);
    }
    if (Filter) {
      this.dataSmoothing = {
        pos: new ArraySeries<EMWA>(EMWA, 3, SMOOTH),
        dir: new ArraySeries<EMWA>(EMWA, 3, SMOOTH),
        speed: new ArraySeries<EMWA>(EMWA, 3, SMOOTH),
      };
    }
  }

  fit(
    pos: Vector3,
    dir: Vector3,
    speed: Vector3,
    type: CategoryId,
    userdata: UserDataType
  ) {
    // if (Filter && this.dataSmoothing) {
    //   console.log("Filter");
    //   pos = new Vector3().fromArray(this.dataSmoothing.pos.next(pos.toArray()));
    //   dir = new Vector3().fromArray(this.dataSmoothing.dir.next(dir.toArray()));
    //   speed = new Vector3().fromArray(
    //     this.dataSmoothing.speed.next(speed.toArray())
    //   );
    // }

    this.carObj.position.copy(pos);
    this.carObj.lookAt(pos.clone().add(dir));
    this.speed.copy(speed);
    if (type && this.type !== type && carModelClass) {
      this.carObj.children = [];
      this.carObj.add(new carModelClass(type));
      this.carObj.layers.set(targetTypes.get(type));
    }
    this.userData = userdata;
  }

  update(t: number) {
    this.carObj.position.add(this.speed.clone().multiplyScalar(t / 1000));
  }
  dispatch() {
    if (this.carModel) {
      this.carModel.dispatch();
    }
  }
}

export class carTrail {
  trail: trail;
  carObj: Object3D;
  trailObj!: Line;
  speed!: number;
  lifeTime!: number;
  living!: number;
  type!: CategoryId;

  constructor(from: lane, to: lane, speed: number) {
    console.log("new cartrail");
    this.trail = new trail(from, to);
    // this.carObj = new Object3D();

    this.carObj = new Mesh(
      new BoxGeometry(),
      new MeshBasicMaterial({ color: 0xff0000 })
    );
    this.carObj.position.set(100, 100, 100);
    // this.carObj.rotateY(Math.PI / 2);
    this.trailObj = new Line(new BufferGeometry(), new LineBasicMaterial());
    this.reset(
      from,
      to,
      speed,
      Math.floor((Math.random() * Object.keys(CategoryId).length) / 2)
    );
  }

  reset(from: lane, to: lane, speed: number, type: CategoryId = 21) {
    this.trail.from = from;
    this.trail.to = to;
    this.speed = speed;
    this.lifeTime = this.trail.trailLine.getLength() / this.speed;
    this.trailObj.geometry = new BufferGeometry().setFromPoints(
      this.trail.trailLine.getPoints(20)
    );
    this.trailObj.children = [];

    for (let i = 0; i < 20; i++) {
      this.trailObj.add(
        new ArrowHelper(
          this.trail.trailLine.getTangent(i / 20),
          this.trail.trailLine.getPoint(i / 20),
          0.1,
          "red"
        )
      );
    }
    this.trailObj.computeLineDistances();

    this.living = 0;
    this.carObj.clear();
    this.carObj = new Object3D();
    this.carObj.position.set(100, 100, 100);
    this.type = type;
    if (carModelClass) {
      this.carObj.add(new carModelClass(this.type));
    }

    this.carObj.visible = true;
  }

  update(t: number) {
    this.living += t;
    if (this.living < this.lifeTime) {
      let lifeStage = this.living / this.lifeTime;
      this.carObj.position.copy(this.trail.trailLine.getPoint(lifeStage));
      this.carObj.lookAt(
        this.carObj.position
          .clone()
          .add(this.trail.trailLine.getTangentAt(lifeStage))
      );
    } else {
      this.carObj.visible = false;
    }
    // console.log("update cartrail", this.carObj.position, this.carObj.visible);
    return this.living < this.lifeTime;
  }
}
