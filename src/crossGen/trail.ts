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
} from "three";
import cross from "./cross";
import road from "./road";

const RADIUS = 10;

export default class trail {
  _trailLine!: CurvePath<Vector3>;
  _trailPoints!: Object3D[];

  _from: road;
  _to: road;
  _modifyed: boolean = true;

  constructor(from: road, to: road) {
    this._from = from;
    this._to = to;
    this.trailGenrate(from, to);
  }

  set from(value: road) {
    if (value !== this.from) {
      this._from = value;
      this._modifyed = true;
    }
  }

  get from() {
    return this._from;
  }

  set to(value: road) {
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

  trailGenrate(from: road, to: road) {
    let fromOffset = -(Math.random() * 0.5 + 0.25) * from.width,
      toOffset = (Math.random() * 0.5 + 0.25) * to.width;
    let ctrlPoints = [
      from.getPoint(RADIUS, fromOffset),
      from.getPoint(from.crossDistance! + from.crossWalkDistance, fromOffset),
      from.getPoint(from.crossDistance!, fromOffset),
      to.getPoint(to.crossDistance!, toOffset),
      to.getPoint(to.crossDistance! + to.crossWalkDistance, toOffset),
      to.getPoint(RADIUS, toOffset),
    ];
    this._trailPoints = ctrlPoints.map((value) => {
      let point = new Mesh(new SphereGeometry(0.01), new MeshBasicMaterial());
      point.position.copy(value);
      return point;
    });
    this._trailLine = new CurvePath();
    new CatmullRomCurve3(ctrlPoints)
      .getSpacedPoints(200)
      .forEach((value, index, array) => {
        if (index < 200) {
          this._trailLine.add(new LineCurve3(value, array[index + 1]));
        }
      });
  }
}
