import road from "./road";
import * as THREE from "three";
import trail from "./trail";

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
    this.roads.forEach((road) => road.caculateJunction());
  }

  randomRoads(num: number) {
    let ret = new Array(num).fill(0).map((value) => {
      return this.roads[Math.floor(Math.random() * this.roads.length)];
    });
    return ret;
  }

  genThreeObj() {
    this.threeObj = new THREE.Object3D();
    let juctionGeo = new THREE.BufferGeometry();
    let juctionPos = new Float32Array([
      0,
      0,
      0,
      ...this.roads.reduce((retArr: number[], value) => {
        retArr.push(
          ...value.borderRight.toArray(),
          ...value.borderLeft.toArray()
        );
        return retArr;
      }, []),
    ]);
    juctionGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(juctionPos, 3)
    );
    let juctionIndex = this.roads.reduce((indices: number[], value, index) => {
      indices.push(0, index * 2 + 1, index * 2 + 2);
      indices.push(0, index * 2 + 2, (index * 2 + 3) % (this.roads.length * 2));
      return indices;
    }, []);
    juctionGeo.setIndex(juctionIndex);
    let juctionObj = new THREE.Mesh(
      juctionGeo,
      new THREE.MeshBasicMaterial({ wireframe: true })
    );
    this.threeObj.add(juctionObj);

    this.roads.forEach((road) => {
      let pc = new THREE.Color(Math.random() * 0xffffff);
      let points = [road.borderRight.clone(), road.borderLeft.clone()];
      points.push(
        road.borderLeft
          .clone()
          .add(road.direction.clone().multiplyScalar(road.crossWalkDistance)),
        road.borderLeft.clone().add(road.direction.clone().multiplyScalar(100))
      );
      points.push(
        road.borderRight
          .clone()
          .add(road.direction.clone().multiplyScalar(100)),
        road.borderRight
          .clone()
          .add(road.direction.clone().multiplyScalar(road.crossWalkDistance))
      );
      let position = points.reduce((retArr: number[], point) => {
        retArr.push(...point.toArray());
        return retArr;
      }, []);
      let geo = new THREE.BufferGeometry();
      geo.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(position), 3)
      );
      geo.setIndex([0, 1, 2, 0, 2, 5, 5, 2, 3, 5, 3, 4]);
      this.threeObj?.add(
        new THREE.Mesh(
          geo,
          new THREE.MeshBasicMaterial({ wireframe: true, color: pc })
        )
      );
    });

    return this.threeObj;
  }
}
