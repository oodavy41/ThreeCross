import road from "./road";
import * as THREE from "three";
import trail from "./trail";
import { Vector3 } from "three";
import RoadMat from "./threeobj/roadMaterial";
import lane, { laneForward } from "./lane";
import { crossInfo, roadInfo } from "../threescript/threeMain";
import crossCorner from "./crossCorner";

const CROSS_ROUND_RAD = 0.3;

export default class cross {
  roads: road[];
  roadsInfo: roadInfo[];
  length: number;
  modify: boolean = true;
  threeObj?: THREE.Object3D;
  constructor(roadsArray: roadInfo[], info: crossInfo) {
    let legalRoadsArr = roadsArray.map((r) => ({
      ...r,
      roadAngle: (Math.atan2(-r.direction.x, -r.direction.z) / Math.PI) * 180,
    }));
    this.roadsInfo = legalRoadsArr;
    this.roads = legalRoadsArr
      .sort((a, b) => a.roadAngle - b.roadAngle)
      .map(
        (value, index) =>
          new road(value.direction, value.lanes, this, index, info)
      );
    this.length = legalRoadsArr.length;
    this.roads.forEach((road) => {
      road.caculateSides();
      road.initLanes(info.roadStartOffset || CROSS_ROUND_RAD, info);
    });
  }

  randomLanes() {
    let roads = [
      this.roads[Math.floor(Math.random() * this.roads.length)],
      this.roads[Math.floor(Math.random() * this.roads.length)],
    ];
    let lanes = [
      (l: lane) => l.forward !== laneForward.away,
      (l: lane) => l.forward === laneForward.away,
    ].map((v, i) => roads[i].lanes.filter(v));
    let result = lanes.map(
      (lanes) => lanes[Math.floor(Math.random() * lanes.length)]
    );
    return result;
  }

  genJuctionGroundGeo() {
    let geo = new THREE.BufferGeometry();
    let points = [new Vector3()],
      indices: number[] = [];
    this.roads.forEach((v, i, a) => {
      points.push(
        v.borderRight.clone(),
        v.borderLeft.clone(),
        v.intersectLeft!.clone()
      );
      indices.push(
        0,
        i * 3 + 1,
        i * 3 + 2,
        0,
        i * 3 + 2,
        i * 3 + 3,
        0,
        i * 3 + 3,
        (i * 3 + 4) % (a.length * 3)
      );
    });
    let positions = points.reduce((retArr: number[], v) => {
      retArr.push(...v.toArray());
      return retArr;
    }, []);
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    );
    geo.setIndex(indices);

    return geo;
  }

  genJectionGroundObj(roadTex: THREE.Texture, mapScale: number) {
    let juctionObj = new THREE.Mesh(
      this.genJuctionGroundGeo(),
      new RoadMat(roadTex, mapScale)
    );
    return juctionObj;
  }

  genJectionCornerGeo(width: number, segments: number) {
    let geo = new THREE.BufferGeometry();
    let points: Vector3[] = [],
      indices: number[] = [];
    this.roads.forEach((v, i, a) => {
      let offset = points.length;
      let mid = v.intersectLeft!.clone();
      let rightPoint = a[i].borderLeft
        .clone()
        .add(a[i].direction.clone().multiplyScalar(width));
      let leftPoint = a[(i + 1) % a.length].borderRight
        .clone()
        .add(a[(i + 1) % a.length].direction.clone().multiplyScalar(width));
      let curveArr = new THREE.QuadraticBezierCurve3(
        rightPoint,
        mid,
        leftPoint
      ).getPoints(segments);

      points.push(mid);
      points.push(...curveArr);
      curveArr.forEach((v, i, a) => {
        if (i < a.length - 1)
          indices.push(offset, offset + i + 1, offset + i + 2);
      });
    });
    let positions = points.reduce((retArr: number[], v) => {
      retArr.push(...v.toArray());
      return retArr;
    }, []);
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    );
    geo.setIndex(indices);

    return geo;
  }

  genJectionCornerObj(
    rad: number,
    roadTex: THREE.Texture,
    mapScale: number,
    segments = 5
  ) {
    let juctionObj = new THREE.Mesh(
      this.genJectionCornerGeo(rad, segments),
      new RoadMat(roadTex, mapScale)
    );
    return juctionObj;
  }

  genThreeObj(info: crossInfo) {
    let roadTex = new THREE.TextureLoader().load("./assets/roadTex2.jpg");
    roadTex.wrapS = roadTex.wrapT = THREE.MirroredRepeatWrapping;
    let mapScale = 5;
    this.threeObj = new THREE.Object3D();
    this.threeObj.add(
      this.genJectionCornerObj(
        Math.max(info.roadStartOffset || CROSS_ROUND_RAD),
        roadTex,
        mapScale,
        10
      )
    );
    this.threeObj.add(this.genJectionGroundObj(roadTex, mapScale));

    this.roads.forEach((road, index, roads) => {
      this.threeObj?.add(
        road.genRoadObj(
          roadTex,
          mapScale,
          info.roadStartOffset || CROSS_ROUND_RAD
        )
      );

      if (
        info.rightLaneType === "divided" &&
        info.walkCrossWidth &&
        info.jectionRadOutter
      ) {
        let groundTex = new THREE.TextureLoader().load(
          "./assets/groundTex.jpg"
        );
        groundTex.wrapS = groundTex.wrapT = THREE.RepeatWrapping;

        this.threeObj?.add(
          crossCorner(
            road,
            roads[(index + 1) % roads.length],
            roadTex,
            groundTex,
            info.walkCrossWidth,
            info.roadStartOffset || CROSS_ROUND_RAD + 0.5,
            info.jectionRadOutter
          )
        );
      }
    });

    return this.threeObj;
  }
}
