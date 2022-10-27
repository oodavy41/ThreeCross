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
    let midpoint =
      from.parent === to.parent
        ? new Vector3()
        : intersectPoint(
            {
              start: from.getPoint(1),
              direction: from.direction.clone().multiplyScalar(-1),
            },
            {
              start: to.getPoint(1),
              direction: to.direction.clone().multiplyScalar(-1),
            }
          );
    let ctrlPoints = [
      from.getPoint(RADIUS),
      from.getPoint(from.parent.crossDistance! + from.parent.crossWalkDistance),
      from.getPoint(from.parent.crossDistance! - 1),
      midpoint,
      to.getPoint(to.parent.crossDistance! - 1),
      to.getPoint(to.parent.crossDistance! + to.parent.crossWalkDistance),
      to.getPoint(RADIUS),
    ];
    this._trailPoints = ctrlPoints.map((value) => {
      let point = new Mesh(new SphereGeometry(0.01), new MeshBasicMaterial());
      point.position.copy(value);
      return point;
    });

    let trail = [
      ...ctrlPoints.slice(0, 3),
      ...new QuadraticBezierCurve3(
        ctrlPoints[2],
        ctrlPoints[3],
        ctrlPoints[4]
      ).getPoints(50),
      ...ctrlPoints.slice(4),
    ];

    this._trailLine = new CurvePath();
    for (let i = 0; i < trail.length - 1; i++) {
      let curve = new LineCurve3(trail[i], trail[i + 1]);
      curve.arcLengthDivisions = 3;
      this._trailLine.add(curve);
    }
  }
}
