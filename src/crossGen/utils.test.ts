import { intersectPoint } from "./utils";
import { Vector3 } from "three";

test("test THREE Math", () => {
  expect(
    new Vector3(3, 0, -1).clone().sub(new Vector3(1, 2, -1))
  ).toStrictEqual(new Vector3(2, -2, 0));
});

test("intersection test", () => {
  expect(
    intersectPoint(
      { start: new Vector3(0, 0, 0), direction: new Vector3(1, 0, -1) },
      { start: new Vector3(2, 0, 0), direction: new Vector3(-1, 0, -1) }
    )
  ).toStrictEqual(new Vector3(1, 0, -1));
});
