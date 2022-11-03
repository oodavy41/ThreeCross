import {
  ArrowHelper,
  BoxGeometry,
  BufferGeometry,
  Color,
  Line,
  LineBasicMaterial,
  Material,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  SphereGeometry,
  Vector,
  Vector3,
} from "three";

import cross from "./cross";
import road from "./road";
import trail from "./trail";
import lane from "./lane";
import { ClassElement } from "typescript";
import carModel from "./carModel";
import { carModelType } from "./carModelTypes";
import { ArraySeries, EMWA } from "../utils/LPF";

const SHOW_TRAIL = false;
const Filter = false;
const SMOOTH = 0.2;

export interface carManager {
  selfObj: Object3D;
  update(T: number): void;
}

export class carPool implements carManager {
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

      car.reset(from, to, speed);
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
  }
}

export class carMap<
  T extends {
    position: Vector3;
    direction: Vector3;
    speed: Vector3;
    type?: carModelType;
  }
> implements carManager
{
  selfObj: Object3D;
  cross: cross;
  carMap: { [key: string]: { car: car; living: boolean } };
  constructor(parent: cross) {
    this.selfObj = new Object3D();
    this.cross = parent;
    this.carMap = {};
  }

  update(T: number) {
    for (let id in this.carMap) {
      this.carMap[id].car.update(T);
    }
  }

  pushData(data: { [key: string]: T }) {
    for (let id in this.carMap) {
      this.carMap[id].living = false;
    }
    for (let uuid in data) {
      let carData = data[uuid];
      if (this.carMap[uuid]) {
        let carNode = this.carMap[uuid].car;
        carNode?.fit(carData.position, carData.direction, carData.speed);
        this.carMap[uuid].living = true;
      } else {
        let carObj = new car(carData.type);
        carObj.fit(carData.position, carData.direction, carData.speed);
        this.selfObj.add(carObj.carObj);
        this.carMap[uuid] = { car: carObj, living: true };
      }
    }
    for (let id in this.carMap) {
      if (!this.carMap[id].living) {
        this.selfObj.remove(this.carMap[id].car.carObj);
        delete this.carMap[id];
      }
    }
  }
}

let carModelClass: undefined | (new (type: carModelType) => carModel);
if (typeof window !== "undefined") {
  import("./carModel").then((carModel) => {
    carModelClass = carModel.default;
  });
}

export class car {
  carObj: Object3D;
  dataSmoothing?: {
    pos: ArraySeries<EMWA>;
    dir: ArraySeries<EMWA>;
    speed: ArraySeries<EMWA>;
  };
  speed: Vector3;
  direction: Vector3;
  type?: carModelType;

  constructor(type?: carModelType) {
    this.carObj = new Object3D();
    this.carObj.rotateY(Math.PI / 2);
    this.speed = new Vector3();
    this.direction = new Vector3();
    this.type = type ? type : carModelType.random();
    if (carModelClass) {
      this.carObj.add(new carModelClass(this.type));
    }
    if (Filter) {
      this.dataSmoothing = {
        pos: new ArraySeries<EMWA>(EMWA, 3, SMOOTH),
        dir: new ArraySeries<EMWA>(EMWA, 3, SMOOTH),
        speed: new ArraySeries<EMWA>(EMWA, 3, SMOOTH),
      };
    }
  }

  fit(pos: Vector3, dir: Vector3, speed: Vector3, type?: carModelType) {
    if (Filter && this.dataSmoothing) {
      // console.log("A", pos.toArray(), dir.toArray(), speed.toArray());
      pos = new Vector3().fromArray(this.dataSmoothing.pos.next(pos.toArray()));
      dir = new Vector3().fromArray(this.dataSmoothing.dir.next(dir.toArray()));
      speed = new Vector3().fromArray(
        this.dataSmoothing.speed.next(speed.toArray())
      );
      // console.log("B", pos.toArray(), dir.toArray(), speed.toArray());
    }

    this.carObj.position.copy(pos);
    this.carObj.lookAt(pos.clone().add(dir));
    this.speed.copy(speed);
    if (type && this.type !== type && carModelClass) {
      this.carObj.children = [];
      this.carObj.add(new carModelClass(type));
    }
  }

  update(t: number) {
    this.carObj.position.add(this.speed.clone().multiplyScalar(t));
  }
}

export class carTrail {
  trail: trail;
  carObj: Object3D;
  trailObj!: Line;
  speed!: number;
  lifeTime!: number;
  living!: number;
  type!: carModelType;

  constructor(from: lane, to: lane, speed: number) {
    this.trail = new trail(from, to);
    this.carObj = new Object3D();
    this.carObj.position.set(100, 100, 100);
    // this.carObj.rotateY(Math.PI / 2);
    this.trailObj = new Line(new BufferGeometry(), new LineBasicMaterial());
    this.reset(from, to, speed);
  }

  reset(from: lane, to: lane, speed: number, type?: carModelType) {
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
    this.type = type || carModelType.random();
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
    return this.living < this.lifeTime;
  }
}
