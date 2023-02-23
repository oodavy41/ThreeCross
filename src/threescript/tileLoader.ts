import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TilesRenderer } from "3d-tiles-renderer";

import { ecef2lla, lla2ecef } from "../utils/ECEConvert";

export default function tileLoader(
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
  parent: THREE.Object3D,
  tileUrl: string
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

  tileRender.onLoadTileSet = (tile) => {
    if (loading) {
      if (!tile.root.boundingVolume.box) {
        console.log("Tile Not Sete Center", "require tileset.json box");
        return;
      }
      let tileCenter = tile.root.boundingVolume.box.slice(0, 3);
      let tileHeight = ecef2lla(tileCenter[0], tileCenter[1], tileCenter[2])[2];
      if (!(tile.extras?.center || tile.extras?.scale)) {
        console.log("Tile Not have Center | Scale", "in tileset.json extras");
        return;
      }
      let { center: lnglatCenter, scale } = tile.extras!;
      let ECEFCenter = lla2ecef(lnglatCenter[0], lnglatCenter[1], tileHeight);
      let center = new THREE.Vector3(
        ECEFCenter[0],
        ECEFCenter[1],
        ECEFCenter[2]
      );
      let lnglat = ecef2lla(center.x, center.y, center.z);
      console.log(lnglat);

      let targetHelper = new THREE.Object3D();
      targetHelper.position.set(center.x, center.y, center.z);
      tileRender?.group.add(targetHelper);

      tileRender?.group.rotateOnWorldAxis(
        new THREE.Vector3(0, 0, 1),
        (-(lnglat[1] - 90) / 180) * Math.PI
      );
      tileRender?.group.rotateOnWorldAxis(
        new THREE.Vector3(1, 0, 0),
        (-lnglat[0] / 180) * Math.PI
      );
      tileRender?.group.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI);

      tileContainer.scale.set(scale[0], 1, scale[1]);

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
