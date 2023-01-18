import * as THREE from "three";
import { Vector3 } from "three";

import road from "./road";
import RoadMat from "./threeobj/roadMaterial";
import WalkCrossMat from "./threeobj/walkCrossMaterial";

const OUTTER_SEGMENT = 20;

export default function crossCorner(
  rightRoad: road,
  leftRoad: road,
  raodTex: THREE.Texture,
  groundTex: THREE.Texture,
  walkCrossWidth: number,
  walkCrossOffset: number,
  turnerDistance: number,
  turnerOffset: number
) {
  let OBJ = new THREE.Object3D();

  let rightDir = rightRoad.direction.clone().normalize();
  let leftDir = leftRoad.direction.clone().normalize();
  let rightStart = rightRoad.borderLeft.clone();
  let leftStart = leftRoad.borderRight.clone();
  let islandCurve: THREE.Curve<Vector3> = new THREE.Curve();
  let islandMid = new THREE.Vector3();
  let walkCrossNormal = new THREE.Vector3();
  let walkCrossDir = new THREE.Vector3();

  function genObj(
    geo: THREE.BufferGeometry,
    tex: THREE.Texture,
    mapScale: number
  ) {
    let obj = new THREE.Mesh(geo, new RoadMat(tex, mapScale));
    return obj;
  }

  function rightRoadGeo() {
    let geo = new THREE.BufferGeometry();
    let points: Vector3[] = [],
      indices: number[] = [];
    let offset = points.length;

    let curveMid = islandMid
      .clone()
      .add(walkCrossDir.clone().multiplyScalar(turnerDistance));
    let start = rightStart
      .clone()
      .add(rightDir.clone().multiplyScalar(turnerOffset));
    let end = leftStart
      .clone()
      .add(leftDir.clone().multiplyScalar(turnerOffset));

    islandCurve = new THREE.CatmullRomCurve3([start, curveMid, end]);
    let curveArr = [
      0, 0.2, 0.3, 0.35, 0.4, 0.45, 0.475, 0.5, 0.525, 0.55, 0.6, 0.65, 0.7,
      0.8, 1,
    ].map((pos) => islandCurve.getPoint(pos));

    points.push(rightRoad.intersectLeft!);
    points.push(...curveArr);
    curveArr.forEach((v, i, a) => {
      if (i < a.length - 1)
        indices.push(offset, offset + i + 1, offset + i + 2);
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

  function islandGeo(distance: number) {
    let geo = new THREE.BufferGeometry();
    let points: Vector3[] = [],
      indices: number[] = [];
    let offset = points.length;
    let mid = rightRoad.intersectLeft!.clone();
    let rightPoint = rightStart
      .clone()
      .add(rightDir.clone().multiplyScalar(distance));
    let leftPoint = leftStart
      .clone()
      .add(leftDir.clone().multiplyScalar(distance));

    islandMid = rightPoint.clone().add(leftPoint).multiplyScalar(0.5);
    walkCrossNormal = rightPoint.clone().sub(leftPoint).normalize();
    walkCrossDir = new Vector3(0, 1, 0).cross(walkCrossNormal).normalize();

    points.push(mid, rightPoint, leftPoint);
    indices.push(offset, offset + 1, offset + 2);
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

  function rightWalkCrossObj(walkCrossWidth: number) {
    let geo = new THREE.BufferGeometry();
    let curveMid = islandCurve.getPoint(0.5);
    let walkCrossLength = islandMid.clone().sub(curveMid).dot(walkCrossDir);
    let points = [
      islandMid
        .clone()
        .add(walkCrossNormal.clone().multiplyScalar(walkCrossWidth / 2)),
      islandMid
        .clone()
        .add(walkCrossNormal.clone().multiplyScalar(walkCrossWidth / 2))
        .add(walkCrossDir.clone().multiplyScalar(-walkCrossLength)),

      islandMid
        .clone()
        .add(walkCrossNormal.clone().multiplyScalar(-walkCrossWidth / 2))
        .add(walkCrossDir.clone().multiplyScalar(-walkCrossLength)),
      islandMid
        .clone()
        .add(walkCrossNormal.clone().multiplyScalar(-walkCrossWidth / 2)),
    ].reduce((retArr: number[], v) => {
      retArr.push(...v.toArray());
      return retArr;
    }, []);
    let indices: number[] = [0, 1, 2, 0, 2, 3];
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(points), 3)
    );
    geo.setIndex(indices);
    geo.setAttribute(
      "crossDir",
      new THREE.BufferAttribute(
        new Float32Array(
          new Array(points.length)
            .fill(walkCrossDir)
            .reduce((retArr, value) => {
              retArr.push(...value.toArray());
              return retArr;
            }, [])
        ),
        3
      )
    );

    let obj = new THREE.Mesh(
      geo,
      new WalkCrossMat(new THREE.Color(0xffffff), 0.1)
    );
    return obj;
  }

  let islandObj = genObj(
    islandGeo(walkCrossWidth + walkCrossOffset),
    groundTex,
    10
  );
  let rightRoadObj = genObj(rightRoadGeo(), raodTex, 5);
  let wcOBJ = rightWalkCrossObj(walkCrossWidth);
  islandObj.position.y += 0.003;
  rightRoadObj.position.y -= 0.001;

  OBJ.add(rightRoadObj, islandObj, wcOBJ);
  return OBJ;
}
