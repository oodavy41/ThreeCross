import * as THREE from "three";
import { Vector3 } from "three";

export function northPtr(
  camera: THREE.Camera,
  scene: THREE.Scene,
  camProj: "perspective" | "orthographic"
) {
  let northPtr = new THREE.Object3D();
  let ptr = new THREE.Mesh(
    new THREE.CylinderGeometry(0, 3, 10, 4),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );
  ptr.position.z -= 5;
  northPtr.add(ptr);
  let ptr2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0, 3, 10, 4),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
  );
  northPtr.add(ptr2);
  ptr2.position.z += 5;

  ptr.rotateX(-Math.PI / 2);
  ptr2.rotateX(Math.PI / 2);
  let scale = camProj === "perspective" ? 0.001 : 0.02;
  northPtr.scale.set(scale, scale, scale);
  let ptrPos =
    camProj === "perspective"
      ? new Vector3(0, -0.1, -0.3)
      : new Vector3(0, -3, -3);

  scene.add(northPtr);
  return {
    updateNorthPtr: () => {
      let newPos = ptrPos.clone().applyMatrix4(camera.matrixWorld);
      northPtr.position.copy(newPos);
    },
  };
}
