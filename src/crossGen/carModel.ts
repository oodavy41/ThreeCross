import { Group, Mesh, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { carModelType } from "./carModelTypes";
// import * as Draco from "three/examples/js/libs/draco/gltf"

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("lib/draco/");

export default class carModel extends Object3D {
  static modelPool: { [key: string]: Mesh } = {};
  modelType: carModelType;
  model: Mesh;

  constructor(type: carModelType) {
    super();
    this.modelType = type;
    let rawModel = carModel.modelPool[this.modelType];
    if (!rawModel) {
      let loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);
      loader.load(carModelType.getUrl(this.modelType), (gltf) => {
        carModel.modelPool[this.modelType] = gltf.scene.children[0] as Mesh;
        this.model = carModel.modelPool[this.modelType].clone();
      });
    }

    this.model = carModel.modelPool[this.modelType]?.clone() || new Mesh();
    this.add(this.model);
    this.scale.set(0.08, 0.08, 0.08);
  }
}
