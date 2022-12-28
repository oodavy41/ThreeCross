export enum CategoryId {
  CAR = 0,
  CAR_SUV = 1,
  VAN = 2,
  BUS = 3,
  TRUCK = 4,
  CAR_SPECIAL = 5,
  MOTORCYCLE = 6,
  BICYCLE = 7,
  RIDER = 8,
  TRICYCLE = 9,
  PEDESTRIAN = 10,
  TRAFFIC_LIGHT = 11,
  TRAFFIC_CONE = 12,
  DONT_CARE = 13,
  LICENSE_PLATE = 14,
  TANKER = 15,
  CEMENT_MIXER = 16,
  TAXI = 17,
  HEAVY_TRUCK = 18,
  SANITATION_VEHICLE = 19,
  ENGINEERING_VEHICLE_TRUCK = 20,
  MUCK_TRUCK = 21,
  TRUNK_TRAILER = 22,
}
export const modelUrls = {
  bigTrunk: "assets/models/lp_trunk.glb",
  car: "assets/models/car.glb",
  car2: "assets/models/car2.glb",
  car3: "assets/models/car3.glb",
  linken: "assets/models/linken.glb",
  scar: "assets/models/scar.glb",
  taxi: "assets/models/taxi.glb",
  taxi2: "assets/models/taxi2.glb",
  trunk: "assets/models/trunk.glb",
  van: "assets/models/van.glb",
  lp_car: "assets/models/lp_car.glb",
  lp_bicycle: "assets/models/lp_bicycle.glb",
  lp_motorcycle: "assets/models/lp_motocycle.glb",
  lp_bus: "assets/models/lp_bus.glb",
  lp_suv: "assets/models/lp_suv.glb",
  lp_tricycle: "assets/models/lp_tricycle.glb",
};

namespace targetTypes {
  export enum types {
    smallcar = 10,
    bigcar = 11,
    "non-moto" = 12,
    human = 13,
    others = 14,
  }
  export function get(id: CategoryId) {
    if (id === CategoryId.RIDER || id === CategoryId.PEDESTRIAN) {
      return types.human;
    } else if (
      id === CategoryId.CAR ||
      id === CategoryId.CAR_SUV ||
      id === CategoryId.CAR_SPECIAL
    ) {
      return types.smallcar;
    } else if (
      id === CategoryId.BUS ||
      id === CategoryId.TRUCK ||
      id === CategoryId.VAN
    ) {
      return types.bigcar;
    } else if (
      id === CategoryId.MOTORCYCLE ||
      id === CategoryId.BICYCLE ||
      id === CategoryId.TRICYCLE
    ) {
      return types["non-moto"];
    } else {
      return types.others;
    }
  }
  export function getAll() {
    return [
      types.smallcar,
      types.bigcar,
      types["non-moto"],
      types.human,
      types.others,
    ];
  }
  export function getString(type: types) {
    switch (type) {
      case types.smallcar:
        return "smallcar";
      case types.bigcar:
        return "bigcar";
      case types["non-moto"]:
        return "non-moto";
      case types.human:
        return "human";
      case types.others:
        return "others";
    }
  }
}

namespace carModelType {
  export type keys = keyof typeof modelUrls;
  export function random() {
    let keys = Object.keys(modelUrls) as keys[];
    return keys[Math.floor(Math.random() * keys.length)];
  }
  export function getUrl(type: keys) {
    return modelUrls[type];
  }
}
export { carModelType, targetTypes };
