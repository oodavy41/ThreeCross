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
} from "three";
import cross from "./cross";
import road from "./road";
import trail from "./trail";
import carModel from "./carModel";
import lane from "./lane";

const SHOW_TRAIL = false;

export class carPool {
  selfObj: Object3D;
  limit: number;
  chance: number;
  cross: cross;
  carPool: car[];
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
        let newcar = new car(from, to, speed);
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

export class car {
  trail: trail;
  carObj: Object3D;
  trailObj!: Line;
  speed!: number;
  lifeTime!: number;
  living!: number;

  constructor(from: lane, to: lane, speed: number) {
    this.trail = new trail(from, to);
    this.carObj = new Object3D();
    this.carObj.position.set(100, 100, 100);
    this.carObj.rotateY(Math.PI / 2);
    this.trailObj = new Line(new BufferGeometry(), new LineBasicMaterial());
    this.reset(from, to, speed);
  }

  reset(from: lane, to: lane, speed: number) {
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
    this.carObj.add(new carModel());
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
