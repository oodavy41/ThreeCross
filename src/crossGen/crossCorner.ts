import * as THREE from "three";
import { Vector3 } from "three";

import road from "./road";
import RoadMat from "./threeobj/roadMaterial";
import WalkCrossMat from "./threeobj/walkCrossMaterial";

const OUTTER_SEGMENT = 10;

export default function crossCorner(
  rightRoad: road,
  leftRoad: road,
  raodTex: THREE.Texture,
  groundTex: THREE.Texture,
  walkCrossWidth: number,
  offset: number,
  distance: number
) {
  let OBJ = new THREE.Object3D();

  let rightDir = rightRoad.direction.clone().normalize();
  let leftDir = leftRoad.direction.clone().normalize();
  let rightStart = rightRoad.borderLeft.clone();
  let leftStart = leftRoad.borderRight.clone();
  let islandCurve: THREE.Curve<Vector3> = new THREE.Curve();
  let islandMid: THREE.Vector3 = new THREE.Vector3();
  let walkCrossNormal: THREE.Vector3 = new THREE.Vector3();

  function genObj(
    geo: THREE.BufferGeometry,
    tex: THREE.Texture,
    mapScale: number
  ) {
    let obj = new THREE.Mesh(geo, new RoadMat(tex, mapScale));
    return obj;
  }

  function rightRoadGeo(width: number) {
    let geo = new THREE.BufferGeometry();
    let points: Vector3[] = [],
      indices: number[] = [];
    let offset = points.length;
    let rightPoint = rightStart
      .clone()
      .add(rightDir.clone().multiplyScalar(width));
    let leftPoint = leftStart
      .clone()
      .add(leftDir.clone().multiplyScalar(width));
    islandMid = rightPoint.clone().add(leftPoint).multiplyScalar(0.5);
    rightPoint = rightPoint
      .clone()
      .add(rightDir.clone().multiplyScalar(distance));
    leftPoint = leftPoint.clone().add(leftDir.clone().multiplyScalar(distance));

    islandCurve = new THREE.QuadraticBezierCurve3(
      rightPoint,
      islandMid,
      leftPoint
    );
    let curveArr = islandCurve.getPoints(OUTTER_SEGMENT);

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

    walkCrossNormal = rightPoint.clone().sub(leftPoint).normalize();

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
    let walkCrossDir = new Vector3(0, 1, 0).cross(walkCrossNormal).normalize();
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

  let rightRoadObj = genObj(rightRoadGeo(walkCrossWidth + offset), raodTex, 5);
  let islandObj = genObj(islandGeo(walkCrossWidth + offset), groundTex, 10);
  let wcOBJ = rightWalkCrossObj(walkCrossWidth);
  islandObj.position.y -= 0.001;
  rightRoadObj.position.y -= 0.002;

  OBJ.add(rightRoadObj, islandObj, wcOBJ);
  return OBJ;
}
