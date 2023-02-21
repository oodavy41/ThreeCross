import {
  CatmullRomCurve3,
  Object3D,
  Mesh,
  SphereGeometry,
  MeshBasicMaterial,
  CurvePath,
  Curve,
  Vector3,
  LineCurve3,
  QuadraticBezierCurve3,
  CubicBezierCurve3,
} from "three";
import cross from "./cross";
import lane from "./lane";
import road from "./road";
import { intersectPoint } from "./utils";

const RADIUS = 20;

export default class trail {
  _trailLine!: CurvePath<Vector3>;
  _trailPoints!: Object3D[];

  _from: lane;
  _to: lane;
  _modifyed: boolean = true;

  constructor(from: lane, to: lane) {
    this._from = from;
    this._to = to;
    this.trailGenrate(from, to);
  }

  set from(value: lane) {
    if (value !== this.from) {
      this._from = value;
      this._modifyed = true;
    }
  }

  get from() {
    return this._from;
  }

  set to(value: lane) {
    if (value !== this.to) {
      this._to = value;
      this._modifyed = true;
    }
  }
  get to() {
    return this._to;
  }

  get trailLine() {
    if (this._modifyed) {
      this.trailGenrate(this.from, this.to);
      this._modifyed = false;
    }
    return this._trailLine;
  }

  get trailPoints() {
    if (this._modifyed) {
      this.trailGenrate(this.from, this.to);
      this._modifyed = false;
    }
    return this._trailPoints;
  }

  trailGenrate(from: lane, to: lane) {
    let midpoint = new Vector3();
    if (from.parent === to.parent) {
    } else if (
      Math.abs(from.direction.clone().dot(to.direction.clone())) - 1 <
      0.001
    ) {
      midpoint = from
        .getPoint(0)
        .clone()
        .add(to.getPoint(0))
        .multiplyScalar(0.5);
    } else {
      midpoint = intersectPoint(
        {
          start: from.getPoint(0),
          direction: from.direction.clone().multiplyScalar(-1),
        },
        {
          start: to.getPoint(0),
          direction: to.direction.clone().multiplyScalar(-1),
        }
      );
    }

    let ctrlPoints = [
      from.getPoint(RADIUS),
      from.getPoint(0),
      from.getPoint(-from.parent.crossDistance!),
      midpoint,
      to.getPoint(-to.parent.crossDistance!),
      to.getPoint(0),
      to.getPoint(RADIUS),
    ];
    let colorMap = [
      "white",
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "purple",
      "white",
    ];
    this._trailPoints = ctrlPoints.map((value, index) => {
      let point = new Mesh(
        new SphereGeometry(0.05),
        new MeshBasicMaterial({ color: colorMap[index] })
      );
      point.position.copy(value);
      return point;
    });

    let trail = [
      ...ctrlPoints.slice(0, 2),
      ...new CubicBezierCurve3(
        ctrlPoints[1],
        ctrlPoints[2],
        ctrlPoints[4],
        ctrlPoints[5]
      ).getPoints(20),
      ...ctrlPoints.slice(5),
    ];

    this._trailLine = new CurvePath();
    for (let i = 0; i < trail.length - 1; i++) {
      let curve = new LineCurve3(trail[i], trail[i + 1]);
      curve.arcLengthDivisions = 3;
      this._trailLine.add(curve);
    }
  }
}
