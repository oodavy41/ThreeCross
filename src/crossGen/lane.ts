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
  SphereBufferGeometry,
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

export default class lane {
  parent: road;
  index: number;
  start: Vector3;
  direction: Vector3;
  rightDir: Vector3;
  width: number;
  front: "anear" | "away";
  constructor(
    parent: road,
    width: number,
    start: Vector3,
    index: number,
    front: "anear" | "away"
  ) {
    this.parent = parent;
    this.width = width;
    this.direction = parent.direction;
    this.rightDir = parent.rightDir;
    this.front = front;
    this.index = index;
    this.start = start;
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
      this.front === "away" &&
      this.parent.lanes[this.index + 1].front !== this.front;
    let firstAnear =
      this.front === "anear" &&
      this.parent.lanes[this.index - 1].front !== this.front;

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
        +(this.front === "anear")
      )
    );

    obj.position.y += 0.003;
    obj.add(
      this.laneSign(
        pos[0].clone(),
        pos[1].clone(),
        this.parent.lanes.length - 1 - this.index,
        this.parent.lanes.filter((v) => v.front === "anear").length
      )
    );
    return obj;
  }

  laneSign(
    rightStart: Vector3,
    leftStart: Vector3,
    index: number,
    total: number
  ) {
    if (this.front === "away") return new Object3D();
    let signTextureUrl: string;
    if (total < 6) {
      let signTab = [
        [signIMG.huandao],
        [signIMG.zhixingyouzhuan, signIMG.zhixingzuozhuan],
        [signIMG.youzhuan, signIMG.zhixing, signIMG.zhixingzuozhuan],
        [signIMG.youzhuan, signIMG.zhixing, signIMG.zhixing, signIMG.zuozhuan],
        [
          signIMG.youzhuan,
          signIMG.zhixing,
          signIMG.zhixing,
          signIMG.zhixing,
          signIMG.zuozhuan,
        ],
      ];
      signTextureUrl = signTab[total - 1][index];
    } else {
      if (index === 0) {
        signTextureUrl = signIMG.youzhuan;
      } else if (index >= (total * 2) / 3 ) {
        if (index === total - 1) {
          signTextureUrl = signIMG.zuozhuan;
        } else {
          signTextureUrl = signIMG.zhixingzuozhuan;
        }
      } else if (index < total) {
        signTextureUrl = signIMG.zhixing;
      } else {
        signTextureUrl = "";
      }
    }
    let signTex = new TextureLoader().load(signTextureUrl);
    signTex.magFilter=LinearMipMapNearestFilter;
    signTex.minFilter=NearestFilter;
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
    let uvs = [0,1,1,1,1,0,0,0];
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
}
