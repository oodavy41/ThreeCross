import { Group, Mesh, Object3D, BoxGeometry, MeshBasicMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { carModelType, targetTypes } from "./carModelTypes";
import { CategoryId } from "../../../../utils/configs";
// import * as Draco from "three/examples/js/libs/draco/gltf"

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("lib/draco/");

const modelMap = [
  carModelType.getUrl("lp_car"), // CAR = 0
  carModelType.getUrl("car2"), // CAR_SUV = 1
  carModelType.getUrl("van"), // VAN = 2
  { w: 2.5, h: 3, l: 9, color: "white" }, // BUS = 3
  carModelType.getUrl("bigTrunk"), // TRUCK = 4
  carModelType.getUrl("car3"), // CAR_SPECIAL = 5
  carModelType.getUrl("lp_motorcycle"), // MOTORCYCLE = 6
  carModelType.getUrl("lp_bicycle"), // BICYCLE = 7
  { w: 0.2, h: 2, l: 0.4, color: "blue" }, // RIDER = 8
  { w: 0.3, h: 1, l: 2, color: "yellow" }, // TRICYCLE = 9
  { w: 0.2, h: 2, l: 0.2, color: "red" }, // PEDESTRIAN = 10
  { w: 1, h: 1, l: 1, color: "red" }, // TRAFFIC_SIGNS = 11
  { w: 1, h: 1, l: 1, color: "red" }, // TRAFFIC_CONE = 12
  { w: 1, h: 1, l: 1, color: "red" }, // UNKNOWN = 13
  { w: 1, h: 1, l: 1, color: "red" }, // PLATE = 14
  { w: 1, h: 1, l: 1, color: "red" }, // FIRE = 15
  { w: 1, h: 1, l: 1, color: "red" }, // SMOKE = 16
];

export default class carModel extends Object3D {
  static modelPool: Mesh[] = [];
  modelType: number;
  model: Mesh;

  constructor(type: number) {
    super();
    this.modelType = type;
    let rawModel = carModel.modelPool[this.modelType];
    if (!rawModel) {
      let source = modelMap[this.modelType];
      if (typeof source === "string") {
        let loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);
        loader.load(source, (gltf) => {
          carModel.modelPool[this.modelType] = gltf.scene.children[0] as Mesh;
          carModel.modelPool[this.modelType].traverse((c) =>
            c.layers.set(targetTypes.get(type))
          );
          this.model = carModel.modelPool[this.modelType].clone();
        });
      } else {
        carModel.modelPool[this.modelType] = new Mesh(
          new BoxGeometry(source.w, source.h, source.l),
          new MeshBasicMaterial({ color: source.color })
        );
      }
    }
    this.model = carModel.modelPool[this.modelType]?.clone() || new Mesh();
    this.model.traverse((c) => c.layers.set(targetTypes.get(type)));
    this.add(this.model);
    this.scale.set(0.08, 0.08, 0.08);
  }
}
