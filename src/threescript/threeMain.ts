import Stats from "stats.js";
import * as THREE from "three";
import { Vector2, Vector3 } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { TAARenderPass } from "three/examples/jsm/postprocessing/TAARenderPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";
import { car, carManager, carMap, carPool } from "../crossGen/car";
import cross from "../crossGen/cross";
import FPSControl from "./FPSctrl";
import skyCube from "./skybox";
import { laneForward } from "../crossGen/lane";
import {
  CategoryId,
  carModelType,
  targetTypes,
} from "../crossGen/carModelTypes";
import { northPtr } from "./objects";
import tileLoader from "./tileLoader";

export interface laneInfo {
  signType: laneForward;
  width?: number;
  startOffset?: number;
}

export interface roadInfo {
  lanes: laneInfo[];
  startOffset?: number;
  direction: Vector3;
  walkCrossWidth?: number;
}

export interface crossInfo {
  tileUrl?: string;
  tileCenter?: number[];

  roads: roadInfo[];
  cameraPos: Vector3;
  cameraLookAt: Vector3;
  walkCrossWidth?: number;
  rightLaneType?: "alone" | "divided" | "normal";

  turnerWidth?: number;
  turnerLaneWidth?: number;
  turnerOffset?: number;
  roadStartOffset?: number;
  islandOffset?: number;
}

interface CarLicenseNode {
  pos: Vector3;
  coord?: Vector3;
  license?: string;
}

type carRawType<UserDataType> = {
  position: Vector3;
  direction: Vector3;
  speed: Vector3;
  type?: CategoryId;
  userdata: UserDataType;
};

const NEW_CAR_CHANCE = 0.05;
const ORTH_CAM_DHEIGHT = 7;

export interface mainConfig {
  camProj?: "perspective" | "orthographic";
  emulator?: boolean;
  fps?: boolean;
}

export default function tInit<carDataType extends { license: string }>(
  container: HTMLDivElement,
  config: mainConfig,
  carsHandler?: (data: CarLicenseNode[]) => void,
  carPicked?: (data: carDataType | undefined) => void
) {
  let { camProj = "orthographic", emulator = false, fps = false } = config;

  let [cWidth, cHeight] = [container.clientWidth, container.clientHeight];

  let camera: THREE.Camera;
  if (camProj === "perspective") {
    camera = new THREE.PerspectiveCamera(45, cWidth / cHeight, 0.25, 1000);
  } else {
    camera = new THREE.OrthographicCamera(
      -((ORTH_CAM_DHEIGHT / cHeight) * cWidth) / 2,
      ((ORTH_CAM_DHEIGHT / cHeight) * cWidth) / 2,
      ORTH_CAM_DHEIGHT / 2,
      -ORTH_CAM_DHEIGHT / 2,
      0.25,
      100
    );
  }

  let scene = new THREE.Scene();
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  scene.add(new THREE.AmbientLight("#fff", 0.5));
  let directLight = new THREE.DirectionalLight("#ffffaa", 1.0);
  directLight.lookAt(-1, -1, -1);
  scene.add(directLight);

  let northPtrObj = northPtr(camera, scene, camProj);

  // let gasStation = new THREE.Mesh(
  // //   new THREE.BoxGeometry(1, 1, 1),
  // //   new THREE.MeshLambertMaterial({ color: 0xff0000 })
  // // );
  // // gasStation.position.set(5, 0, 1);
  // // scene.add(gasStation);

  //skybox
  scene.background = new THREE.Color("black");
  // helper
  if (process.env.NODE_ENV === "development")
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

  const lookAt = new THREE.Vector3(0, -3.5, 0);
  camera.position.set(0, 3.5, 0);
  camera.lookAt(lookAt);
  const CamFpsCtrl = fps && new FPSControl(camera, renderer.domElement, lookAt);

  function onResize() {
    if (
      cWidth !== container.clientWidth ||
      cHeight !== container.clientHeight
    ) {
      cWidth = container.clientWidth;
      cHeight = container.clientHeight;
      if (camProj === "perspective")
        (camera as THREE.PerspectiveCamera).aspect = cWidth / cHeight;
      else {
        (camera as THREE.OrthographicCamera).left =
          -((ORTH_CAM_DHEIGHT / cHeight) * cWidth) / 2;
        (camera as THREE.OrthographicCamera).right =
          ((ORTH_CAM_DHEIGHT / cHeight) * cWidth) / 2;
        (camera as THREE.OrthographicCamera).top = ORTH_CAM_DHEIGHT / 2;
        (camera as THREE.OrthographicCamera).bottom = -ORTH_CAM_DHEIGHT / 2;
      }

      (
        camera as THREE.PerspectiveCamera | THREE.OrthographicCamera
      ).updateProjectionMatrix();
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

  let crossComp: cross,
    carMgr: carManager<carDataType>,
    tileObj: ReturnType<typeof tileLoader> | undefined;

  let onChangeRoadinfo = (info: crossInfo) => {
    if (crossComp) {
      scene.remove(crossComp.threeObj!);
    }
    const { roads } = info;
    crossComp = new cross(roads, info);
    scene.add(crossComp.genThreeObj(info));
    if (info.tileUrl && info.tileCenter) {
      crossComp.threeObj!.visible = false;
      if (tileObj) {
        tileObj.dispose();
      }
      tileObj = tileLoader(
        camera,
        renderer,
        scene,
        info.tileUrl,
        info.tileCenter
      );
    }
    if (emulator) {
      carMgr = new carPool(NEW_CAR_CHANCE, 100, crossComp);
    } else {
      carMgr = new carMap<carDataType, carRawType<carDataType>>(crossComp);
    }
    scene.add(carMgr.selfObj);
    camera.position.copy(info.cameraPos);
    camera.lookAt(info.cameraLookAt);
  };

  // onChangeRoadinfo({
  //   walkCrossWidth: 0.6,
  //   cameraPos: new Vector3(0, 10, 0),
  //   cameraLookAt: new Vector3(0, -9, 0),
  //   rightLaneType: "divided",
  //   turnerWidth: 0.75,
  //   turnerLaneWidth: 0.3,
  //   turnerOffset: 5,

  //   islandOffset: 0.5,
  //   roadStartOffset: -0.03,
  //   roads: [],
  // });

  const carpickRaycaster = new THREE.Raycaster();
  if (!(fps || emulator) && carPicked) {
    renderer.domElement.addEventListener("click", (e) => {
      let x = (e.offsetX / cWidth) * 2 - 1;
      let y = -(e.offsetY / cHeight) * 2 + 1;
      carpickRaycaster.setFromCamera(new Vector2(x, y), camera);
      const intersects = carpickRaycaster.intersectObjects(
        carMgr.selfObj.children,
        false
      );
      if (intersects.length > 0) {
        let uuid = intersects[0].object.uuid;
        let car = carMgr.getCar(uuid);
        if (car) {
          let userdata = (car as car<carDataType>).userData!;
          userdata && carPicked(userdata);
          return;
        }
      }
      carPicked(undefined);
    });
  }

  let covertToScreenPos = (pos: Vector3) => {
    let p = pos.clone();
    p.project(camera);
    return new Vector3(
      ((p.x + 1) / 2) * cWidth,
      ((1 - p.y) / 2) * cHeight,
      p.z
    );
  };
  let setCamLayer = (all: number[], layers: number[]) => {
    all.forEach((l) => {
      camera.layers.disable(l);
      carpickRaycaster.layers.disable(l);
    });
    layers.forEach((l) => {
      camera.layers.enable(l);
      carpickRaycaster.layers.enable(l);
    });
  };
  if (emulator) {
    setCamLayer(targetTypes.getAll(), targetTypes.getAll());
  }

  function renderloop(T: number) {
    stats && stats.begin();
    let delta = ticker.tick(T);
    onResize();

    CamFpsCtrl && CamFpsCtrl.update(delta);

    if (carMgr) {
      let cars = carMgr.update(delta);
      if (carsHandler) {
        let carList: CarLicenseNode[] = cars
          .filter((c) => {
            return camera.layers.test(c.layers);
          })
          .map((c) => {
            return {
              pos: c.pos,
              coord: covertToScreenPos(c.pos),
              license: c.userdata?.license,
            };
          })
          .filter((c) =>
            camProj === "perspective" ? c.coord.z > 0 && c.coord.z < 1 : true
          );
        carsHandler(carList);
      }
    }

    northPtrObj && northPtrObj.updateNorthPtr();

    tileObj && tileObj.update();

    composer.render();
    stats && stats.end();
    return requestAnimationFrame(renderloop);
  }
  let animation = renderloop(0);

  function onDispatch() {
    renderer.forceContextLoss();
    container.removeChild(renderer.domElement);
    cancelAnimationFrame(animation);
  }

  function onPullFitData<T extends carRawType<carDataType>>(data: {
    [key: string]: T;
  }) {
    if (!emulator) {
      return (carMgr as carMap<carDataType, T>).pushData(data);
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
      covertToScreenPos,
      setCamLayer,
    },
  };
}
