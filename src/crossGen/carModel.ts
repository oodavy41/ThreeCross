import { Group, Mesh, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
// import * as Draco from "three/examples/js/libs/draco/gltf"

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("lib/draco/");

const modelUrls = {
  bigTrunk: "assets/models/bigTrunk.glb",
  car: "assets/models/car.glb",
  car2: "assets/models/car2.glb",
  car3: "assets/models/car3.glb",
  linken: "assets/models/linken.glb",
  scar: "assets/models/scar.glb",
  taxi: "assets/models/taxi.glb",
  taxi2: "assets/models/taxi2.glb",
  trunk: "assets/models/trunk.glb",
  van: "assets/models/van.glb",
};
const modelKeys = Object.keys(modelUrls) as (keyof typeof modelUrls)[];

export default class carModel extends Object3D {
  static modelPool: { [key: string]: Mesh } = {};
  modelType: keyof typeof modelUrls;
  model: Mesh;

  constructor() {
    super();
    this.modelType = modelKeys[Math.floor(Math.random() * modelKeys.length)];
    let rawModel = carModel.modelPool[this.modelType];
    if (!rawModel) {
      let loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);
      loader.load(modelUrls[this.modelType], (gltf) => {
        carModel.modelPool[this.modelType] = gltf.scene.children[0] as Mesh;
        this.model = carModel.modelPool[this.modelType].clone();
      });
    }

    this.model = carModel.modelPool[this.modelType]?.clone() || new Mesh();
    this.add(this.model);
    this.scale.set(0.08, 0.08, 0.08);
  }
}
