import { Group, Mesh, Object3D, BoxGeometry, MeshBasicMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { carModelType, CategoryId, targetTypes } from "./carModelTypes";
// import * as Draco from "three/examples/js/libs/draco/gltf"

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("lib/draco/");

const modelMap: (
  | string
  | {
      w: number;
      h: number;
      l: number;
      color: string;
      opacity?: number;
    }
)[] = [
  carModelType.getUrl("lp_car"), // CAR = 0,
  carModelType.getUrl("lp_suv"), // CAR_SUV = 1,
  carModelType.getUrl("van"), // VAN = 2,
  carModelType.getUrl("lp_bus"), // BUS = 3,
  carModelType.getUrl("lp_truck"), // TRUCK = 4,
  carModelType.getUrl("lp_car"), // CAR_SPECIAL = 5,
  carModelType.getUrl("lp_motorcycle"), // MOTORCYCLE = 6,
  carModelType.getUrl("lp_bicycle"), // BICYCLE = 7,
  { w: 0.2, h: 2, l: 0.4, color: "blue" }, // RIDER = 8,
  carModelType.getUrl("lp_tricycle"), // TRICYCLE = 9,
  { w: 0.2, h: 2, l: 0.2, color: "white" }, // PEDESTRIAN = 10,
  { w: 1, h: 1, l: 1, color: "yellow" }, // TRAFFIC_LIGHT = 11,
  { w: 1, h: 1, l: 1, color: "green" }, // TRAFFIC_CONE = 12,
  { w: 1, h: 1, l: 1, color: "red" }, // DONT_CARE = 13,
  { w: 0.1, h: 0.1, l: 0.1, color: "blue" }, // LICENSE_PLATE = 14,
  carModelType.getUrl("lp_truck"), // TANKER = 15,
  carModelType.getUrl("lp_truck"), // CEMENT_MIXER = 16,
  carModelType.getUrl("lp_car"), // TAXI = 17,
  carModelType.getUrl("lp_truck"), // HEAVY_TRUCK = 18,
  carModelType.getUrl("lp_truck"), // SANITATION_VEHICLE = 19,
  carModelType.getUrl("lp_truck"), // ENGINEERING_VEHICLE_TRUCK = 20,
  carModelType.getUrl("lp_truck"), // MUCK_TRUCK = 21,
  carModelType.getUrl("lp_truck"), // TRUCK_TRAILER = 22,
];

modelMap[1000] = { w: 2, h: 1.5, l: 4, color: "white", opacity: 0.2 };
modelMap[1001] = { w: 0.75, h: 0.75, l: 0.75, color: "#00bbcc" };
modelMap[1002] = { w: 0.75, h: 0.75, l: 0.75, color: "#abfa00" };
modelMap[1003] = { w: 0.75, h: 0.75, l: 0.75, color: "#ff00ff" };
modelMap[1004] = { w: 0.75, h: 0.75, l: 0.75, color: "#0088ff" };

class carModelPool {
  meshRaw: Mesh[] = [];
  modelLoading: boolean[] = new Array(modelMap.length).fill(false);
  modelPool: Object3D[][] = [];
  modelQueue: Object3D[][] = [];

  modelOnLoad(type: CategoryId, model: Mesh) {
    console.log("modelOnLoad", type, this.modelQueue[type].length);
    model.traverse((c) => {
      c.layers.disableAll();
      c.layers.set(targetTypes.get(type));
    });
    this.meshRaw[type] = model;
    this.modelLoading[type] = false;
    this.modelQueue[type].forEach((container) => {
      container.visible = true;
      container.add(this.meshRaw[type].clone());
      container.layers.set(targetTypes.get(type));
    });
    this.modelQueue[type] = [];
  }

  getModel(type: CategoryId): Object3D {
    if (type >= Object.keys(CategoryId).length / 2)
      type === CategoryId.DONT_CARE;
    let container = new Object3D();
    let rawModel = this.meshRaw[type];
    if (!rawModel) {
      if (!this.modelPool[type]) this.modelPool[type] = [];
      let source = modelMap[type];
      if (typeof source === "string") {
        if (this.modelLoading[type]) {
          this.modelQueue[type].push(container);
        } else {
          if (!this.modelQueue[type]) this.modelQueue[type] = [];
          this.modelQueue[type].push(container);
          let loader = new GLTFLoader();
          loader.setDRACOLoader(dracoLoader);
          loader.load(source, (gltf) => {
            this.modelOnLoad(type, gltf.scene.children[0] as Mesh);
          });
          this.modelLoading[type] = true;
        }
      } else {
        let model = new Mesh(
          new BoxGeometry(source.w, source.h, source.l),
          new MeshBasicMaterial({
            color: source.color,
            opacity: source.opacity,
            transparent: source.opacity !== 0,
            depthWrite: false,
          })
        );
        model.layers.set(targetTypes.get(type));
        this.meshRaw[type] = model;
        container.add(model.clone());
      }
    } else {
      if (this.modelPool[type].length > 0) {
        container = this.modelPool[type].pop() as Object3D;
        container.visible = true;
      } else {
        container.add(rawModel.clone());
      }
    }
    return container;
  }

  recycle(type: CategoryId, model: Object3D) {
    this.modelPool[type].push(model);
    model.visible = false;
  }
}

export default class carModel extends Object3D {
  modelType: CategoryId;
  model: Object3D;
  static pool: carModelPool;

  constructor(type: CategoryId) {
    super();
    if (!carModel.pool) {
      carModel.pool = new carModelPool();
    }
    this.modelType = type;
    this.model = carModel.pool.getModel(type);
    this.add(this.model);
    this.layers.set(targetTypes.get(type));
    this.scale.set(0.06, 0.06, 0.06);
  }

  change(newModel: Object3D) {
    this.remove(this.model);
    this.model = newModel;
    this.add(this.model);
  }

  dispatch() {
    carModel.pool.recycle(this.modelType, this.model);
    this.model.visible = false;
    this.remove(this.model);
  }
}
