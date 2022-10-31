import Stats from "stats.js";
import * as THREE from "three";
import { Vector3 } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { TAARenderPass } from "three/examples/jsm/postprocessing/TAARenderPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";
import { carManager, carMap, carPool } from "../crossGen/car";
import cross from "../crossGen/cross";
import FPSControl from "./FPSctrl";
import skyCube from "./skybox";
import { laneForward } from "../crossGen/lane";
import { carModelType } from "../crossGen/carModelTypes";

export interface laneInfo {
  signType: laneForward;
  width?: number;
}

export interface roadInfo {
  lanes: laneInfo[];
  direction: Vector3;
  walkCrossWidth?: number;
}

export interface crossInfo {
  roads: roadInfo[];
  center: Vector3;
  rotationY: number;
  scale: number;
}

const NEW_CAR_CHANCE = 0.05;

export default function tInit(
  container: HTMLDivElement,
  emulator: boolean = true
) {
  let [cWidth, cHeight] = [container.clientWidth, container.clientHeight];

  let camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.25,
    100
  );

  let scene = new THREE.Scene();
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  scene.add(new THREE.AmbientLight("#fff", 0.5));
  let directLight = new THREE.DirectionalLight("#ffffaa", 1.0);
  directLight.lookAt(-1, -1, -1);
  scene.add(directLight);

  //skybox
  scene.background = new THREE.Color("black");
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
  let stats: Stats | undefined;
  if (process.env.NODE_ENV === "development") {
    stats = new Stats();
    stats.showPanel(0);
    container.appendChild(stats.dom);
    stats.dom.style.position = "absolute";
    stats.dom.style.inset = "0px 0px auto auto";
  }

  // postprocessing

  let composer = new EffectComposer(renderer);

  let renderPass = new RenderPass(scene, camera);
  // renderPass.enabled = false;
  composer.addPass(renderPass);

  // let taaRenderPass = new TAARenderPass(scene, camera, 0, 0);
  // taaRenderPass.unbiased = true;
  // // taaRenderPass.accumulate = true;
  // taaRenderPass.sampleLevel = 2;
  // composer.addPass(taaRenderPass);

  // let FXAAShaderPass = new ShaderPass(FXAAShader);
  // FXAAShaderPass.uniforms["resolution"].value.set(1 / cWidth, 1 / cHeight);
  // FXAAShaderPass.renderToScreen = true;
  // composer.addPass(FXAAShaderPass);

  const smaa = new SMAAPass(
    cWidth * renderer.getPixelRatio(),
    cHeight * renderer.getPixelRatio()
  );
  composer.addPass(smaa);

  var effectCopy = new ShaderPass(CopyShader);
  composer.addPass(effectCopy);

  camera.position.set(0, 5, 10);
  camera.lookAt(0, -5, -10);
  const CamFpsCtrl = new FPSControl(
    camera,
    renderer.domElement,
    new Vector3(0, -5, -10)
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

  let crossComp: cross, carMgr: carManager;

  let onChangeRoadinfo = (info: crossInfo) => {
    if (crossComp) {
      scene.remove(crossComp.threeObj!);
    }
    const { roads, rotationY, scale, center } = info;
    crossComp = new cross(roads);
    scene.add(crossComp.genThreeObj());
    if (emulator) {
      carMgr = new carPool(NEW_CAR_CHANCE, 100, crossComp);
    } else {
      carMgr = new carMap(crossComp);
    }
    crossComp.threeObj?.add(carMgr.selfObj);
  };

  onChangeRoadinfo({
    center: new Vector3(0, 0, 0),
    rotationY: 0,
    scale: 1,
    roads: [
      {
        direction: new Vector3(1, 0, 0),
        lanes: [
          {
            signType: laneForward.away,
            width: 0.4,
          },
          {
            signType: laneForward.away,
            width: 0.4,
          },
          {
            signType: laneForward.away,
            width: 0.4,
          },
          {
            signType: laneForward.zuozhuan,
            width: 0.3,
          },
          {
            signType: laneForward.zhixing,
            width: 0.3,
          },
          {
            signType: laneForward.zhixing,
            width: 0.3,
          },
          {
            signType: laneForward.zhixing,
            width: 0.3,
          },
          {
            signType: laneForward.youzhuan,
            width: 0.3,
          },
        ],
      },
      {
        direction: new Vector3(0, 0, -1),
        lanes: [
          {
            signType: laneForward.away,
            width: 0.4,
          },
          {
            signType: laneForward.away,
            width: 0.4,
          },
          {
            signType: laneForward.away,
            width: 0.4,
          },
          {
            signType: laneForward.zuozhuan,
            width: 0.3,
          },
          {
            signType: laneForward.zhixing,
            width: 0.3,
          },
          {
            signType: laneForward.zhixing,
            width: 0.3,
          },
          {
            signType: laneForward.zhixing,
            width: 0.3,
          },
          {
            signType: laneForward.youzhuan,
            width: 0.3,
          },
        ],
      },
      {
        direction: new Vector3(-1, 0, 0.1),
        lanes: [
          {
            signType: laneForward.away,
            width: 0.4,
          },
          {
            signType: laneForward.away,
            width: 0.4,
          },
          {
            signType: laneForward.away,
            width: 0.4,
          },
          {
            signType: laneForward.zuozhuan,
            width: 0.3,
          },
          {
            signType: laneForward.zhixing,
            width: 0.3,
          },
          {
            signType: laneForward.zhixing,
            width: 0.3,
          },
          {
            signType: laneForward.zhixing,
            width: 0.3,
          },
          {
            signType: laneForward.youzhuan,
            width: 0.3,
          },
        ],
      },
      {
        direction: new Vector3(0, 0, 1),
        lanes: [
          {
            signType: laneForward.away,
            width: 0.4,
          },
          {
            signType: laneForward.away,
            width: 0.4,
          },
          {
            signType: laneForward.away,
            width: 0.4,
          },
          {
            signType: laneForward.zuozhuan,
            width: 0.3,
          },
          {
            signType: laneForward.zhixing,
            width: 0.3,
          },
          {
            signType: laneForward.zhixing,
            width: 0.3,
          },
          {
            signType: laneForward.zhixing,
            width: 0.3,
          },
          {
            signType: laneForward.youzhuan,
            width: 0.3,
          },
        ],
      },
    ],
  });

  function renderloop(T: number) {
    stats && stats.begin();
    let delta = ticker.tick(T);
    onResize();
    CamFpsCtrl.update(delta);
    carMgr.update(delta);
    // renderer.render(scene, camera);
    composer.render();
    // scene.traverse((obj) => {});
    stats && stats.end();
    return requestAnimationFrame(renderloop);
  }
  let animation = renderloop(0);

  function onDispatch() {
    renderer.forceContextLoss();
    container.removeChild(renderer.domElement);
    cancelAnimationFrame(animation);
  }

  function onPullFitData<
    T extends {
      position: Vector3;
      direction: Vector3;
      speed: Vector3;
      type?: carModelType;
    }
  >(data: { [key: string]: T }) {
    if (!emulator) {
      (carMgr as carMap<T>).pushData(data);
    }
  }

  return {
    scene,
    camera,
    renderer,
    ticker,
    animation,
    handlers: {
      onChangeRoadinfo,
      onDispatch,
      onPullFitData,
    },
  };
}
