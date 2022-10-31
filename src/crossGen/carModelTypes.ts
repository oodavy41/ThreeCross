export const modelUrls = {
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

type carModelType = keyof typeof modelUrls;

namespace carModelType {
  export function random() {
    let keys = Object.keys(modelUrls) as carModelType[];
    return keys[Math.floor(Math.random() * keys.length)];
  }
  export function getUrl(type: carModelType) {
    return modelUrls[type];
  }
}
export { carModelType };
