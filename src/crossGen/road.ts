import cross from "./cross";
import { Vector3 } from "three";
import { borderRay } from "./types";
import { intersectPoint } from "./utils";

const VEC_UP = new Vector3(0, 1, 0);

export default class road {
  angle: number;
  width: number;
  parent: cross;
  selfIndex: number;

  direction!: Vector3;
  rightDir!: Vector3;
  midLine!: Vector3;
  borderRight!: Vector3;
  borderLeft!: Vector3;
  intersectRight?: Vector3;
  intersectLeft?: Vector3;
  crossDistance?: number;
  crossWalkDistance: number = 0.2;

  constructor(
    angle: number,
    width: number,
    parent: cross,
    index: number,
    crossWalkWidth?: number
  ) {
    this.angle = angle;
    this.width = width;
    this.parent = parent;
    this.selfIndex = index;
    crossWalkWidth && (this.crossWalkDistance = crossWalkWidth);
    this.caculateSelfInfo();
  }

  getRay(flag: "mid" | "left" | "right"): borderRay {
    switch (flag) {
      case "mid":
        return { start: new Vector3(), direction: this.direction };
      case "left":
        return { start: this.borderLeft, direction: this.direction };
      case "right":
        return { start: this.borderRight, direction: this.direction };
    }
  }
  getPoint(distance: number, offset: number) {
    return new Vector3(0, 0, 0)
      .add(this.direction.clone().multiplyScalar(distance))
      .add(this.rightDir.clone().multiplyScalar(offset));
  }

  caculateSelfInfo() {
    let radian = (this.angle / 180) * Math.PI;
    this.direction = new Vector3(Math.cos(radian), 0, -Math.sin(radian));
    this.rightDir = this.direction.clone().cross(VEC_UP).normalize();
    this.midLine = new Vector3(0, 0, 0);
    this.borderRight = new Vector3(0, 0, 0).add(
      this.rightDir.clone().multiplyScalar(this.width)
    );
    this.borderLeft = new Vector3(0, 0, 0).add(
      this.rightDir.clone().multiplyScalar(-this.width)
    );
  }

  caculateJunction() {
    if (!this.borderRight || !this.borderLeft) return;
    let preRoad =
        this.parent.roads[
          (this.selfIndex + this.parent.length - 1) % this.parent.length
        ],
      nextRoad =
        this.parent.roads[
          (this.selfIndex + this.parent.length + 1) % this.parent.length
        ];
    if (preRoad.borderLeft && preRoad.direction)
      this.intersectRight =
        // preRoad.intersectLeft?.clone() ||
        intersectPoint(this.getRay("right"), preRoad.getRay("left"));
    if (nextRoad.borderRight)
      this.intersectLeft =
        // nextRoad.intersectRight?.clone() ||
        intersectPoint(this.getRay("left"), nextRoad.getRay("right"));

    this.crossDistance = [this.intersectRight, this.intersectLeft]
      .map((value) =>
        this.direction?.clone().dot(value?.clone().sub(new Vector3(0, 0, 0))!)
      )
      .sort()[1];
    this.borderRight = new Vector3(0, 0, 0)
      .add(this.direction.clone().multiplyScalar(this.crossDistance!))
      .add(this.rightDir.clone().multiplyScalar(this.width));
    this.borderLeft = new Vector3(0, 0, 0)
      .add(this.direction.clone().multiplyScalar(this.crossDistance!))
      .add(this.rightDir.clone().multiplyScalar(-this.width));
  }
}
