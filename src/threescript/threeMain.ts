import * as THREE from "three";
import { Vector3 } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { TAARenderPass } from "three/examples/jsm/postprocessing/TAARenderPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";
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
  renderer.setPixelRatio(window.devicePixelRatio);
  scene.add(new THREE.AmbientLight("#fff", 0.5));
  let directLight = new THREE.DirectionalLight("#aaf", 0.6);
  directLight.lookAt(-1, -1, -1);
  scene.add(directLight);

  // helper
  scene.add(new THREE.AxesHelper(1000));

  //
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(cWidth, cHeight);
  renderer.setClearColor(0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  // postprocessing

  let composer = new EffectComposer(renderer);

  let renderPass = new RenderPass(scene, camera);
  // renderPass.enabled = false;
  composer.addPass(renderPass);

  let taaRenderPass = new TAARenderPass(scene, camera, 0, 1.0);
  taaRenderPass.unbiased = true;
  // taaRenderPass.accumulate = true;
  taaRenderPass.sampleLevel = 2;
  // composer.addPass(taaRenderPass);

  let FXAAShaderPass = new ShaderPass(FXAAShader);
  FXAAShaderPass.uniforms["resolution"].value.set(1 / cWidth, 1 / cHeight);
  FXAAShaderPass.renderToScreen = true;
  // composer.addPass(FXAAShaderPass)

  const smaa = new SMAAPass(
    cWidth * renderer.getPixelRatio(),
    cHeight * renderer.getPixelRatio()
  );
  composer.addPass(smaa);

  var effectCopy = new ShaderPass(CopyShader);
  composer.addPass(effectCopy);

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
      composer.setSize(cWidth, cHeight);
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

  let crossComp: cross, carManager: carPool;
  let onChangeRoadinfo = (info: { width: number; angle: number }[]) => {
    if (crossComp) {
      scene.remove(crossComp.threeObj!);
    }
    crossComp = new cross(
      info.map((value) => ({ roadWidth: value.width, roadAngle: value.angle }))
    );
    scene.add(crossComp.genThreeObj());
    carManager = new carPool(0.05, 100, crossComp);
    crossComp.threeObj?.add(carManager.selfObj);
  };

  onChangeRoadinfo([
    { width: 1.4, angle: 10 },
    { width: 1.4, angle: 110 },
    { width: 1.5, angle: 190 },
    { width: 1.5, angle: 290 },
  ]);

  function renderloop(T: number) {
    let delta = ticker.tick(T);
    onResize();
    CamFpsCtrl.update(delta);
    carManager.update(delta);
    // renderer.render(scene, camera);
    composer.render();
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
    haldlers: {
      onChangeRoadinfo,
    },
  };
}