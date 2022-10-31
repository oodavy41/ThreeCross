import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  LinearFilter,
  LinearMipMapLinearFilter,
  LinearMipMapNearestFilter,
  Mesh,
  MeshBasicMaterial,
  NearestFilter,
  NearestMipMapLinearFilter,
  Object3D,
  TextureLoader,
  Vector3,
} from "three";
import road from "./road";
import LaneMat from "./threeobj/laneMaterial";

const LANE_LINE_WIDTH = 0.01;
const SOLID_LENGTH = 1;
const SIGN_CROSS_DIS = 0.2;

const signIMG = {
  huandao: "./assets/huandao.png",
  zhixing: "./assets/zhihang.png",
  youzhuan: "./assets/youzhuan.png",
  zhixingyouzhuan: "./assets/zhihangyouzhuan.png",
  zhixingzuozhuan: "./assets/zhihangzuozhuan.png",
  zuozhuan: "./assets/zuozhuan.png",
};

export enum laneForward {
  away = 0,
  zuozhuan = 0b001,
  zhixing = 0b010,
  zhixingzuozhuan = 0b011,
  youzhuan = 0b100,
  zhixingyouzhuan = 0b110,
  huandao = 0b111,
}

export default class lane {
  parent: road;
  index: number;
  start: Vector3;
  direction: Vector3;
  rightDir: Vector3;
  width: number;
  forward?: laneForward;
  constructor(
    parent: road,
    width: number,
    start: Vector3,
    index: number,
    forward: laneForward
  ) {
    this.parent = parent;
    this.width = width;
    this.direction = parent.direction;
    this.rightDir = parent.rightDir;
    this.forward = forward;
    this.index = index;
    this.start = start;
  }

  afterConstructor(totalLength: number, totalForward: number) {
    let index = totalLength - 1 - this.index;
    if (totalForward < 6) {
      let signTab = [
        [laneForward.huandao],
        [laneForward.zhixingyouzhuan, laneForward.zhixingzuozhuan],
        [
          laneForward.youzhuan,
          laneForward.zhixing,
          laneForward.zhixingzuozhuan,
        ],
        [
          laneForward.youzhuan,
          laneForward.zhixing,
          laneForward.zhixing,
          laneForward.zuozhuan,
        ],
        [
          laneForward.youzhuan,
          laneForward.zhixing,
          laneForward.zhixing,
          laneForward.zhixing,
          laneForward.zuozhuan,
        ],
      ];
      this.forward = signTab[totalForward - 1][index];
    } else {
      if (index === 0) {
        this.forward = laneForward.youzhuan;
      } else if (index >= (totalForward * 2) / 3) {
        if (index === totalForward - 1) {
          this.forward = laneForward.zuozhuan;
        } else {
          this.forward = laneForward.zhixingzuozhuan;
        }
      } else if (index < totalForward) {
        this.forward = laneForward.zhixing;
      } else {
        this.forward = laneForward.away;
      }
    }
  }

  genLinesObj(roadLength: number) {
    let pos = [
      this.start
        .clone()
        .add(this.rightDir.clone().multiplyScalar(this.width / 2)),
      this.start
        .clone()
        .add(this.rightDir.clone().multiplyScalar(-this.width / 2)),
      this.start
        .clone()
        .add(this.rightDir.clone().multiplyScalar(-this.width / 2))
        .add(this.direction.clone().multiplyScalar(roadLength)),
      this.start
        .clone()
        .add(this.rightDir.clone().multiplyScalar(this.width / 2))
        .add(this.direction.clone().multiplyScalar(roadLength)),
    ];
    let lanePosition: number[] = [];
    pos.forEach((v) => lanePosition.push(v.x, v.y, v.z));

    let geo = new BufferGeometry()
      .setAttribute(
        "position",
        new BufferAttribute(new Float32Array(lanePosition), 3)
      )
      .setIndex([0, 2, 1, 0, 3, 2]);

    let lastAway =
      this.forward === laneForward.away &&
      this.parent.lanes[this.index + 1]?.forward !== laneForward.away;
    let firstAnear =
      this.forward !== laneForward.away &&
      this.parent.lanes[this.index - 1]?.forward === laneForward.away;

    let obj = new Mesh(
      // new SphereBufferGeometry(1),
      geo,

      new LaneMat(
        new Color(0xffffff),
        new Color("yellow"),
        LANE_LINE_WIDTH,
        this.direction,
        pos[0],
        pos[1],
        +lastAway,
        +firstAnear,
        +(this.forward !== laneForward.away)
      )
    );

    obj.position.y += 0.003;
    obj.add(this.laneSign(pos[0].clone(), pos[1].clone()));
    return obj;
  }

  laneSign(rightStart: Vector3, leftStart: Vector3) {
    if (this.forward === laneForward.away) return new Object3D();
    let signTextureUrl = [
      "",
      signIMG.zuozhuan,
      signIMG.zhixing,
      signIMG.zhixingzuozhuan,
      signIMG.youzhuan,
      "",
      signIMG.zhixingyouzhuan,
      signIMG.huandao,
    ][this.forward!];
    let signTex = new TextureLoader().load(signTextureUrl);
    signTex.magFilter = LinearMipMapNearestFilter;
    signTex.minFilter = NearestFilter;
    let points = [
      rightStart
        .clone()
        .add(this.direction.clone().multiplyScalar(SIGN_CROSS_DIS)),
      leftStart
        .clone()
        .add(this.direction.clone().multiplyScalar(SIGN_CROSS_DIS)),
      leftStart
        .clone()
        .add(
          this.direction.clone().multiplyScalar(SIGN_CROSS_DIS + this.width)
        ),
      rightStart
        .clone()
        .add(
          this.direction.clone().multiplyScalar(SIGN_CROSS_DIS + this.width)
        ),
    ];
    let uvs = [0, 1, 1, 1, 1, 0, 0, 0];
    let indices = [0, 2, 1, 0, 3, 2];
    let positions = points.reduce((arr: number[], v) => {
      arr.push(...v.toArray());
      return arr;
    }, []);
    let geo = new BufferGeometry()
      .setAttribute(
        "position",
        new BufferAttribute(new Float32Array(positions), 3)
      )
      .setAttribute("uv", new BufferAttribute(new Float32Array(uvs), 2))
      .setIndex(indices);
    let signObj = new Mesh(
      geo,
      new MeshBasicMaterial({
        map: signTex,
        transparent: true,
        depthWrite: false,
      })
    );
    return signObj;
  }

  getPoint(distance: number) {
    return this.start
      .clone()
      .add(this.direction.clone().multiplyScalar(distance));
    // .add(this.rightDir.clone().multiplyScalar(this.width / 2));
  }
}
