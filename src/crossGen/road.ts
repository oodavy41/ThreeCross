import cross from "./cross";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  Texture,
  Vector,
  Vector3,
  Mesh,
  SphereGeometry,
  MeshBasicMaterial,
} from "three";
import { borderRay } from "./types";
import { intersectPoint } from "./utils";
import RoadMat from "./threeobj/roadMaterial";
import WalkCrossMat from "./threeobj/walkCrossMaterial";
import lane, { laneForward } from "./lane";
import { crossInfo, laneInfo, roadInfo } from "../threescript/threeMain";

export const CROSS_LANE_DIS = 0.1;
export const ROAD_LENGTH = 100;
export const LANE_WIDTH = 0.35;
export const CROSS_WALK_DIS = 0.5;

export default class road {
  width: number;
  widthWithTurner: number;
  parent: cross;
  selfIndex: number;

  direction!: Vector3;
  rightDir!: Vector3;
  borderRight!: Vector3;
  borderLeft!: Vector3;
  withTurnerRight!: Vector3;
  withTurnerLeft!: Vector3;
  leftTurnerOffset!: Vector3;
  rightTurnerOffset!: Vector3;
  intersectRight?: Vector3;
  intersectLeft?: Vector3;
  crossDistance?: number;
  parentInfo: crossInfo;
  roadInfo: roadInfo;
  lanes!: lane[];
  lanesInfo: laneInfo[];

  constructor(
    direction: Vector3,
    lanesInfo: laneInfo[],
    parent: cross,
    index: number,
    info: roadInfo,
    parentinfo: crossInfo
  ) {
    this.direction = direction;
    this.lanesInfo = lanesInfo;
    this.widthWithTurner = lanesInfo.reduce(
      (pre, cur) => pre + (cur.width || LANE_WIDTH),
      0
    );
    this.width =
      this.widthWithTurner -
      lanesInfo
        .filter((info) => (info.signType & 0b111000) === 0b111000)
        .reduce((pre, cur) => pre + (cur.width || LANE_WIDTH), 0);
    console.log(this.widthWithTurner, this.width);
    this.parent = parent;
    this.selfIndex = index;
    this.roadInfo = info;
    this.parentInfo = parentinfo;
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
    this.rightDir = this.direction
      .clone()
      .cross(new Vector3(0, 1, 0))
      .normalize();
    this.withTurnerRight = new Vector3(0, 0, 0).add(
      this.rightDir.clone().multiplyScalar(this.widthWithTurner / 2)
    );
    this.withTurnerLeft = new Vector3(0, 0, 0).add(
      this.rightDir.clone().multiplyScalar(-this.widthWithTurner / 2)
    );
    let rightOffset = 0;
    let leftOffset = 0;
    for (let i = 0; i < this.lanesInfo.length; i++) {
      let laneInfo = this.lanesInfo[i];
      if (laneInfo.signType === laneForward.turnerAway) {
        rightOffset += laneInfo.width || LANE_WIDTH;
      } else if (laneInfo.signType === laneForward.turnerRight) {
        leftOffset += laneInfo.width || LANE_WIDTH;
      }
    }
    this.rightTurnerOffset = this.rightDir.clone().multiplyScalar(rightOffset);
    this.leftTurnerOffset = this.rightDir.clone().multiplyScalar(-leftOffset);
    this.borderRight = this.withTurnerRight.clone().sub(this.rightTurnerOffset);
    this.borderLeft = this.withTurnerLeft.clone().sub(this.leftTurnerOffset);
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

    [
      this.borderRight,
      this.borderLeft,
      this.withTurnerRight,
      this.withTurnerLeft,
    ].forEach((p) =>
      p.add(this.direction.clone().multiplyScalar(this.crossDistance!))
    );
  }

  initLanes(wc_rad: number) {
    let rightStart = this.withTurnerRight
      .clone()
      .add(
        this.direction
          .clone()
          .multiplyScalar(
            wc_rad +
              (this.roadInfo.walkCrossWidth ||
                this.parentInfo.walkCrossWidth ||
                CROSS_WALK_DIS) +
              CROSS_LANE_DIS
          )
      );
    this.lanes = [];
    let offset = 0;
    this.lanesInfo.forEach((laneInfo, i) => {
      let width = laneInfo.width || LANE_WIDTH;
      let start = rightStart
        .clone()
        .sub(this.rightDir.clone().multiplyScalar(offset + width / 2));
      offset += width;
      this.lanes.push(
        new lane(
          this,
          laneInfo.width || LANE_WIDTH,
          start,
          i,
          laneInfo.signType,
          i === this.lanesInfo.length - 1 &&
            this.parentInfo.rightLaneType !== "normal",
          (this.roadInfo.walkCrossWidth! || this.parentInfo.walkCrossWidth!) +
            (this.roadInfo.startOffset ||
              this.parentInfo.roadStartOffset ||
              0) +
            this.parentInfo.turnerWidth!,
          laneInfo
        )
      );
    });
    // let lanearCount = this.lanes.filter(
    //   (v) => v.forward !== laneForward.away
    // ).length;
    // this.lanes.forEach((lane) =>
    //   lane.afterConstructor(this.lanes.length, lanearCount)
    // );
  }

  genRoadObj(roadTex: Texture, mapScale: number, roundRad: number) {
    let points = [this.withTurnerRight.clone(), this.withTurnerLeft.clone()];
    points.push(
      this.withTurnerLeft
        .clone()
        .add(this.direction.clone().multiplyScalar(ROAD_LENGTH))
    );
    points.push(
      this.withTurnerRight
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
      obj.add(v.genLinesObj(100, v.info.startOffset || 0));
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
            .multiplyScalar(
              roundRad + (this.parentInfo.walkCrossWidth || CROSS_WALK_DIS)
            )
        ),
      this.borderRight
        .clone()
        .add(
          this.direction
            .clone()
            .multiplyScalar(
              roundRad + (this.parentInfo.walkCrossWidth || CROSS_WALK_DIS)
            )
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
