import { borderRay } from "./types";

export function intersectPoint(line1: borderRay, line2: borderRay) {
  let deltaDir = line2.start.clone().sub(line1.start.clone());
  let addition =
    deltaDir.cross(line2.direction).length() /
    line1.direction.clone().cross(line2.direction).length();
  return line1.start
    .clone()
    .add(line1.direction.clone().multiplyScalar(addition));
}
