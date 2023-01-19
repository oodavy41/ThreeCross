export enum CategoryId {
  "CAR" = 0,
  "SUV" = 1,
  "VAN" = 2,
  "BUS" = 3,
  "TRUCK" = 4,
  "MOTORCYCLE" = 5,
  "BICYCLE" = 6,
  "TRICYCLE" = 7,
  "PEDESTRIAN" = 8,
  "TRAFFIC_CONE" = 9,
  "DONT_CARE" = 10,
  "LICENSE_PLATE" = 11,
  "TANKER" = 12,
  "CEMENT_MIXER" = 13,
  "TAXI" = 14,
  "HEAVY_TRUCK" = 15,
  "SANITATION_VEHICLE" = 16,
  "ENGINEERING_VEHICLE" = 17,
  "MUCK_TRUCK" = 18,
  "TRUCK_TRAILER" = 19,
}

export const CategoryName = [
  "CAR", // s
  "SUV", // s
  "VAN", // s
  "BUS", // l
  "TRUCK", // l
  "MOTORCYCLE", // nm
  "BICYCLE", // nm
  "TRICYCLE", // nm
  "PEDESTRIAN", // h
  "TRAFFIC_CONE", // o
  "DONT_CARE", // o
  "LICENSE_PLATE", // o
  "TANKER", // l
  "CEMENT_MIXER", // l
  "TAXI", //s
  "HEAVY_TRUCK", // l
  "SANITATION_VEHICLE", // l
  "ENGINEERING_VEHICLE", // l
  "MUCK_TRUCK", // l
  "TRUCK_TRAILER", // l
];

export const modelUrls = {
  lp_bigTrunk: "assets/models/lp_bigtruck.glb",
  lp_truck: "assets/models/lp_truck.glb",
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
    const typeMapper = [
      "s",
      "s",
      "s",
      "l",
      "l",
      "nm",
      "nm",
      "nm",
      "h",
      "o",
      "o",
      "o",
      "l",
      "l",
      "s",
      "l",
      "l",
      "l",
      "l",
      "l",
    ];
    switch (typeMapper[id]) {
      case "s":
        return types.smallcar;
      case "l":
        return types.bigcar;
      case "nm":
        return types["non-moto"];
      case "h":
        return types.human;
      case "o":
      default:
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
