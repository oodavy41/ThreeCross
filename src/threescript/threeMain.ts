import * as THREE from "three";
import { Vector3 } from "three";
import { carPool } from "../crossGen/car";
import cross from "../crossGen/cross";
import FPSControl from "./FPSctrl";

export default function tInit(container: HTMLDivElement) {
  let [cWidth, cHeight] = [container.clientWidth, container.clientHeight];

  let camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.25,
    100
  );
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);

  let scene = new THREE.Scene();
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  scene.add(new THREE.AmbientLight("#fff", 0.5));
  let directLight = new THREE.DirectionalLight("#aaf", 0.6);
  directLight.lookAt(-1, -1, -1);
  scene.add(directLight);

  // helper
  scene.add(new THREE.AxesHelper(1000));

  //
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(cWidth, cHeight);
  renderer.setClearColor("#003");
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  const CamFpsCtrl = new FPSControl(
    camera,
    renderer.domElement,
    new Vector3(0, 0, -1)
  );
  function onResize() {
    if (
      cWidth !== container.clientWidth ||
      cHeight !== container.clientHeight
    ) {
      cWidth = container.clientWidth;
      cHeight = container.clientHeight;
      camera.aspect = cWidth / cHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(cWidth, cHeight);
    }
  }
  let ticker = (() => {
    let last = 0,
      start = 0,
      delta = 0;
    return {
      tick: function (now: number) {
        if (start === 0) {
          start = now;
        }
        let d = now - last;
        last = now;
        delta = d;

        return delta;
      },
      during: () => last - start,
    };
  })();

  let crossGen = new cross(
    [
      [0.5, 10],
      [0.5, 100],
      [0.5, 190],
      [0.5, 280],
    ].map((value) => ({ roadWidth: value[0], roadAngle: value[1] }))
  );
  scene.add(crossGen.genThreeObj());
  let carManager = new carPool(0.01, 100, crossGen);
  crossGen.threeObj?.add(carManager.selfObj);

  function renderloop(T: number) {
    let delta = ticker.tick(T);
    onResize();
    CamFpsCtrl.update(delta);
    carManager.update(delta);
    renderer.render(scene, camera);
    scene.traverse((obj) => {});
    return requestAnimationFrame(renderloop);
  }
  let animation = renderloop(0);

  return {
    scene,
    camera,
    renderer,
    ticker,
    animation,
  };
}
