import road from "./road";
import * as THREE from "three";
import trail from "./trail";
import { Vector3 } from "three";
import RoadMat from "./threeobj/roadMaterial";

const CROSS_ROUND_RAD=0.3;

export default class cross {
  roads: road[];
  length: number;
  modify: boolean = true;
  threeObj?: THREE.Object3D;
  constructor(roadsArray: { roadWidth: number; roadAngle: number }[]) {
    let legalRoadsArr = roadsArray;
    this.roads = legalRoadsArr
      .sort((a, b) => a.roadAngle - b.roadAngle)
      .map(
        (value, index) =>
          new road(value.roadAngle, value.roadWidth, this, index)
      );
    this.length = legalRoadsArr.length;
    this.roads.forEach((road) => {road.caculateSides();road.initLanes(CROSS_ROUND_RAD)});
  }

  randomRoads(num: number) {
    let ret = new Array(num).fill(0).map((value) => {
      return this.roads[Math.floor(Math.random() * this.roads.length)];
    });
    return ret;
  }

  genJuction() {
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
    this.roads.forEach((v, i, a) => {
      let offset = points.length;
      let intersect = i * 3 + 3;
      let mid = v.intersectLeft!.clone();
      let rightPoint = a[i]
        .intersectLeft!.clone()
        .add(a[i].direction.clone().multiplyScalar(CROSS_ROUND_RAD));
      let leftPoint = a[(i + 1) % a.length]
        .intersectRight!.clone()
        .add(a[(i + 1) % a.length].direction.clone().multiplyScalar(CROSS_ROUND_RAD));
      let curveArr = new THREE.QuadraticBezierCurve3(
        rightPoint,
        mid,
        leftPoint
      ).getPoints(5);

      points.push(...curveArr);
      curveArr.forEach((v, i, a) => {
        if (i < a.length - 1)
          indices.push(intersect, offset + i, offset + i + 1);
      });
    });
    return {
      positions: points.reduce((retArr: number[], v) => {
        retArr.push(...v.toArray());
        return retArr;
      }, []),
      indices,
    };
  }

  genThreeObj() {
    let roadTex = new THREE.TextureLoader().load("./assets/roadTex2.jpg");
    roadTex.wrapS=roadTex.wrapT=THREE.MirroredRepeatWrapping
    let mapScale=5
    this.threeObj = new THREE.Object3D();
    let juctionGeo = new THREE.BufferGeometry();
    let juctionInfo = this.genJuction();
    let juctionPos = new Float32Array(juctionInfo.positions);
    juctionGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(juctionPos, 3)
    );
    let juctionIndex = juctionInfo.indices;
    juctionGeo.setIndex(juctionIndex);
    let juctionObj = new THREE.Mesh(
      juctionGeo,
      new RoadMat( roadTex ,mapScale)
    );
    this.threeObj.add(juctionObj);

    this.roads.forEach((road) => {
      this.threeObj?.add(
        road.genRoadObj( roadTex ,mapScale,CROSS_ROUND_RAD)
      );
    });

    return this.threeObj;
  }
}
