import cross from "./cross";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  Texture,
  Vector3,
} from "three";
import { borderRay } from "./types";
import { intersectPoint } from "./utils";
import RoadMat from "./threeobj/roadMaterial";
import WalkCrossMat from "./threeobj/walkCrossMaterial";
import lane from "./lane";

const CROSS_LANE_DIS = 0.1;
const ROAD_LENGTH = 100;
const LANE_WIDTH = 0.35;
const CROSS_WALK_DIS = 0.5;

export default class road {
  angle: number;
  width: number;
  parent: cross;
  selfIndex: number;

  direction!: Vector3;
  rightDir!: Vector3;
  borderRight!: Vector3;
  borderLeft!: Vector3;
  intersectRight?: Vector3;
  intersectLeft?: Vector3;
  crossDistance?: number;
  crossWalkDistance: number = CROSS_WALK_DIS;
  laneWidth: number = LANE_WIDTH;
  lanes!: lane[];

  constructor(
    angle: number,
    width: number,
    parent: cross,
    index: number,
    crossWalkWidth?: number,
    laneWidth?: number
  ) {
    this.angle = angle;
    this.width = width;
    this.parent = parent;
    this.selfIndex = index;
    crossWalkWidth && (this.crossWalkDistance = crossWalkWidth);
    laneWidth && (this.laneWidth = laneWidth);
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
    this.direction = new Vector3(
      Math.cos(radian),
      0,
      -Math.sin(radian)
    ).normalize();
    this.rightDir = this.direction
      .clone()
      .cross(new Vector3(0, 1, 0))
      .normalize();

    this.borderRight = new Vector3(0, 0, 0).add(
      this.rightDir.clone().multiplyScalar(this.width / 2)
    );
    this.borderLeft = new Vector3(0, 0, 0).add(
      this.rightDir.clone().multiplyScalar(-this.width / 2)
    );
  }

  caculateSides() {
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
      .add(this.rightDir.clone().multiplyScalar(this.width / 2));
    this.borderLeft = new Vector3(0, 0, 0)
      .add(this.direction.clone().multiplyScalar(this.crossDistance!))
      .add(this.rightDir.clone().multiplyScalar(-this.width / 2));
  }

  initLanes(wc_rad: number) {
    let count = Math.floor(this.width / this.laneWidth);
    this.laneWidth = this.width / count;
    let rightStart = this.borderRight
      .clone()
      .add(
        this.direction
          .clone()
          .multiplyScalar(wc_rad + this.crossWalkDistance + CROSS_LANE_DIS)
      );
    this.lanes = [];
    for (let i = 0; i < count; i++) {
      let start = rightStart
        .clone()
        .sub(this.rightDir.clone().multiplyScalar((i + 0.5) * this.laneWidth));
      this.lanes.push(
        new lane(
          this,
          this.laneWidth,
          start,
          i,
          i >= (count - 1) / 2 ? "anear" : "away"
        )
      );
    }
    let lanearCount = this.lanes.filter((v) => v.front === "anear").length;
    this.lanes.forEach((lane) =>
      lane.afterConstructor(this.lanes.length, lanearCount)
    );
  }

  genRoadObj(roadTex: Texture, mapScale: number, roundRad: number) {
    let points = [this.borderRight.clone(), this.borderLeft.clone()];
    points.push(
      this.borderLeft
        .clone()
        .add(this.direction.clone().multiplyScalar(ROAD_LENGTH))
    );
    points.push(
      this.borderRight
        .clone()
        .add(this.direction.clone().multiplyScalar(ROAD_LENGTH))
    );
    let position = points.reduce((retArr: number[], point) => {
      retArr.push(...point.toArray());
      return retArr;
    }, []);
    let geo = new BufferGeometry();
    geo.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(position), 3)
    );
    geo.setIndex([0, 2, 1, 0, 3, 2]);
    let obj = new Mesh(geo, new RoadMat(roadTex, mapScale));
    obj.add(this.genCrossWalk(roundRad));
    this.lanes.map((v) => {
      obj.add(v.genLinesObj(100));
    });
    return obj;
  }

  genCrossWalk(roundRad: number) {
    let crossDirection = this.borderRight
      .clone()
      .sub(this.borderLeft.clone())
      .normalize();
    let points = [
      this.borderRight
        .clone()
        .add(this.direction.clone().multiplyScalar(roundRad)),
      this.borderLeft
        .clone()
        .add(this.direction.clone().multiplyScalar(roundRad)),
      this.borderLeft
        .clone()
        .add(
          this.direction
            .clone()
            .multiplyScalar(roundRad + this.crossWalkDistance)
        ),
      this.borderRight
        .clone()
        .add(
          this.direction
            .clone()
            .multiplyScalar(roundRad + this.crossWalkDistance)
        ),
    ];
    let position = points.reduce((retArr: number[], point) => {
      retArr.push(...point.toArray());
      return retArr;
    }, []);
    let geo = new BufferGeometry();
    geo.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(position), 3)
    );
    geo.setAttribute(
      "crossDir",
      new BufferAttribute(
        new Float32Array(
          new Array(points.length)
            .fill(crossDirection)
            .reduce((retArr, value) => {
              retArr.push(...value.toArray());
              return retArr;
            }, [])
        ),
        3
      )
    );
    geo.setIndex([0, 2, 1, 0, 3, 2]);
    let obj = new Mesh(geo, new WalkCrossMat(new Color(0xffffff), 0.1));
    obj.position.y += 0.002;
    return obj;
  }
}
