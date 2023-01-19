import { laneInfo } from "./../threescript/threeMain";
import {
  RepeatWrapping,
  MirroredRepeatWrapping,
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
import RoadMat from "./threeobj/roadMaterial";

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
  away = 0b100000,
  zuozhuan = 0b000100,
  zhixing = 0b000010,
  zhixingzuozhuan = 0b000110,
  youzhuan = 0b000001,
  zhixingyouzhuan = 0b000011,
  huandao = 0b000111,
  gelidai = 0b110000,
  turnerAway = 0b111000,
  turnerRight = 0b111001,
}

const signMap: { [key in laneForward]?: (string | undefined)[] } = {
  [laneForward.zuozhuan]: [signIMG.zuozhuan],
  [laneForward.zhixing]: [signIMG.zhixing, signIMG.zhixingyouzhuan],
  [laneForward.zhixingzuozhuan]: [signIMG.zhixingzuozhuan],
  [laneForward.youzhuan]: [signIMG.youzhuan],
  [laneForward.zhixingyouzhuan]: [signIMG.zhixingyouzhuan],
  [laneForward.huandao]: [signIMG.huandao],
  [laneForward.turnerRight]: [undefined, signIMG.youzhuan],
};

export default class lane {
  parent: road;
  index: number;
  start: Vector3;
  direction: Vector3;
  rightDir: Vector3;
  width: number;
  forward?: laneForward;
  divided: boolean;
  secondSignOffset: number;
  info: laneInfo;
  constructor(
    parent: road,
    width: number,
    start: Vector3,
    index: number,
    forward: laneForward,
    divided = false,
    secondSignOffset = 0,
    info: laneInfo
  ) {
    this.parent = parent;
    this.width = width;
    this.direction = parent.direction;
    this.rightDir = parent.rightDir;
    this.forward = forward;
    this.index = index;
    this.start = start;
    this.divided = divided;
    this.secondSignOffset = secondSignOffset;
    this.info = info;
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

  genLinesObj(roadLength: number, roadStart: number = 0) {
    let pos = [
      this.start
        .clone()
        .add(this.rightDir.clone().multiplyScalar(this.width / 2))
        .add(this.direction.clone().multiplyScalar(roadStart)),
      this.start
        .clone()
        .add(this.rightDir.clone().multiplyScalar(-this.width / 2))
        .add(this.direction.clone().multiplyScalar(roadStart)),
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
      this.forward !== laneForward.gelidai &&
      (this.parent.lanes[this.index - 1]?.forward === laneForward.away ||
        this.parent.lanes[this.index - 1]?.forward === laneForward.gelidai);
    let mat: THREE.Material;
    if (this.forward! <= 32) {
      mat = new LaneMat(
        new Color(0xffffff),
        new Color("yellow"),
        LANE_LINE_WIDTH,
        this.direction,
        pos[0],
        pos[1],
        +lastAway,
        +firstAnear,
        +((this.forward! & 0b000111) > 0)
      );
    } else if (this.forward === laneForward.gelidai) {
      let grassTexture = new TextureLoader().load("./assets/grass.jpg");
      grassTexture.wrapS = grassTexture.wrapT = RepeatWrapping;
      mat = new RoadMat(grassTexture, 5);
    } else {
      mat = new MeshBasicMaterial({
        color: 0x000000,
        opacity: 0,
        transparent: true,
      });
    }
    let obj = new Mesh(geo, mat);

    obj.position.y += 0.002;
    obj.add(this.laneSign(pos[0].clone(), pos[1].clone()));
    if (this.divided)
      obj.add(
        this.laneSign(
          pos[0]
            .clone()
            .add(this.direction.clone().multiplyScalar(this.secondSignOffset)),
          pos[1]
            .clone()
            .add(this.direction.clone().multiplyScalar(this.secondSignOffset)),
          1
        )
      );
    else
      obj.add(
        this.laneSign(
          pos[0]
            .clone()
            .add(this.direction.clone().multiplyScalar(this.secondSignOffset)),
          pos[1]
            .clone()
            .add(this.direction.clone().multiplyScalar(this.secondSignOffset))
        )
      );
    return obj;
  }

  laneSign(rightStart: Vector3, leftStart: Vector3, usingIdx: number = 0) {
    if (this.forward === laneForward.away) return new Object3D();
    let signTextureUrl = this.forward
      ? signMap[this.forward]
        ? signMap[this.forward]![usingIdx] || ""
        : ""
      : "";
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
