import { Group, Mesh, Object3D, BoxGeometry, MeshBasicMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { carModelType, targetTypes } from "./carModelTypes";
import { CategoryId } from "../../../../utils/configs";
// import * as Draco from "three/examples/js/libs/draco/gltf"

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("lib/draco/");

const modelMap = [
  carModelType.getUrl("lp_car"), // CAR = 0,
  carModelType.getUrl("lp_suv"), // CAR_SUV = 1,
  carModelType.getUrl("van"), // VAN = 2,
  carModelType.getUrl("lp_bus"), // BUS = 3,
  carModelType.getUrl("bigTrunk"), // TRUCK = 4,
  carModelType.getUrl("car3"), // CAR_SPECIAL = 5,
  carModelType.getUrl("lp_motorcycle"), // MOTORCYCLE = 6,
  carModelType.getUrl("lp_bicycle"), // BICYCLE = 7,
  { w: 0.2, h: 2, l: 0.4, color: "blue" }, // RIDER = 8,
  carModelType.getUrl("lp_tricycle"), // TRICYCLE = 9,
  { w: 0.2, h: 2, l: 0.2, color: "red" }, // PEDESTRIAN = 10,
  { w: 1, h: 1, l: 1, color: "red" }, // TRAFFIC_LIGHT = 11,
  { w: 1, h: 1, l: 1, color: "red" }, // TRAFFIC_CONE = 12,
  { w: 1, h: 1, l: 1, color: "red" }, // DONT_CARE = 13,
  { w: 0.1, h: 0.1, l: 0.1, color: "blue" }, // LICENSE_PLATE = 14,
  { w: 1, h: 1, l: 1, color: "red" }, // TANKER = 15,
  { w: 1, h: 1, l: 1, color: "red" }, // CEMENT_MIXER = 16,
  { w: 1, h: 1, l: 1, color: "red" }, // TAXI = 17,
  { w: 1, h: 1, l: 1, color: "red" }, // HEAVY_TRUCK = 18,
  { w: 1, h: 1, l: 1, color: "red" }, // SANITATION_VEHICLE = 19,
  { w: 1, h: 1, l: 1, color: "red" }, // ENGINEERING_VEHICLE_TRUCK = 20,
  { w: 1, h: 1, l: 1, color: "red" }, // MUCK_TRUCK = 21,
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
          console.log(gltf);
        });
      } else {
        carModel.modelPool[this.modelType] = new Mesh(
          new BoxGeometry(source.w, source.h, source.l),
          new MeshBasicMaterial({ color: source.color })
        );
      }
    }
    this.model = carModel.modelPool[this.modelType]
      ? carModel.modelPool[this.modelType].clone()
      : new Mesh();
    this.model.traverse((c) => c.layers.set(targetTypes.get(type)));
    this.add(this.model);
    this.scale.set(0.06, 0.06, 0.06);
  }
}
