import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TilesRenderer } from "3d-tiles-renderer";

import { ecef2lla, lla2ecef } from "../utils/ECEConvert";

export default function tileLoader(
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
  parent: THREE.Object3D,
  tileUrl: string,
  tileCenter: number[]
) {
  let draco = new DRACOLoader();
  draco.setDecoderPath("/lib/draco/");
  const loader = new GLTFLoader();
  loader.setDRACOLoader(draco);

  let tileRender = new TilesRenderer(tileUrl);
  tileRender.manager.addHandler(/\.gltf$/, loader);
  tileRender.setCamera(camera);
  tileRender.setResolutionFromRenderer(camera, renderer);
  tileRender.errorTarget = 0.01;
  tileRender.displayActiveTiles = true;
  let loading = true;

  let tileContainer = new THREE.Object3D();
  tileContainer.add(tileRender.group);
  parent.add(tileContainer);
  // tileContainer.scale.set(1 / 1000000, 1 / 1000000, 1 / 1000000);
  let lnglatCenter = tileCenter;
  let ECEFCenter = lla2ecef(lnglatCenter[1], lnglatCenter[0], lnglatCenter[2]);
  let center = new THREE.Vector3(...ECEFCenter);

  tileRender.onLoadTileSet = (tile) => {
    if (loading) {
      let lnglat = ecef2lla(center.x, center.y, center.z);
      console.log(lnglat);

      let targetHelper = new THREE.Object3D();
      targetHelper.position.set(center.x, center.y, center.z);
      tileRender?.group.add(targetHelper);

      tileContainer.rotateOnWorldAxis(
        new THREE.Vector3(0, 0, 1),
        (-(lnglat[1] - 90) / 180) * Math.PI
      );
      tileContainer.rotateOnWorldAxis(
        new THREE.Vector3(1, 0, 0),
        (-lnglat[0] / 180) * Math.PI
      );
      tileContainer.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI);
      let scale = 0.1;
      tileContainer.scale.set(scale, scale, scale);

      tileContainer.updateMatrixWorld();

      let targetWorldPos = targetHelper.getWorldPosition(new THREE.Vector3());
      tileContainer.position.set(
        -targetWorldPos.x,
        -targetWorldPos.y,
        -targetWorldPos.z
      );
      tileContainer.updateMatrixWorld();

      loading = false;
    }
  };

  return {
    update: () => tileRender.update(),
    dispose: () => {
      parent.remove(tileContainer);
      tileRender.dispose();
    },
  };
}
