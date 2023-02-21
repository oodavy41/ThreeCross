import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
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
import { TilesRenderer } from "3d-tiles-renderer";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ecef2lla, lla2ecef } from "../utils/ECEConvert";

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
  // center: Vector3;
  // rotationY: number;
  // scale: number;
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
  tileUrl?: string;
  tileCenter?: number[];
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
  let {
    tileUrl,
    tileCenter,
    camProj = "orthographic",
    emulator = false,
    fps = false,
  } = config;

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
  let northPtrScale = camProj === "perspective" ? 0.001 : 0.02;
  northPtr.scale.set(northPtrScale, northPtrScale, northPtrScale);
  let ptrPos =
    camProj === "perspective"
      ? new Vector3(0, -0.1, -0.3)
      : new Vector3(0, -3, -3);

  function updateNorthPtr() {
    let newPos = ptrPos.clone().applyMatrix4(camera.matrixWorld);
    northPtr.position.copy(newPos);
  }

  let scene = new THREE.Scene();
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  scene.add(new THREE.AmbientLight("#fff", 0.5));
  let directLight = new THREE.DirectionalLight("#ffffaa", 1.0);
  directLight.lookAt(-1, -1, -1);
  scene.add(directLight);

  scene.add(northPtr);

  let tileRender: TilesRenderer | undefined;
  if (tileUrl && tileCenter) {
    let draco = new DRACOLoader();
    draco.setDecoderPath("/lib/draco/");
    const loader = new GLTFLoader();
    loader.setDRACOLoader(draco);

    tileRender = new TilesRenderer(tileUrl);
    tileRender.manager.addHandler(/\.gltf$/, loader);
    tileRender.setCamera(camera);
    tileRender.setResolutionFromRenderer(camera, renderer);
    tileRender.errorTarget = 0.01;
    tileRender.displayActiveTiles = true;
    let loading = true;

    let tileContainer = new THREE.Object3D();
    tileContainer.add(tileRender.group);
    scene.add(tileContainer);
    // tileContainer.scale.set(1 / 1000000, 1 / 1000000, 1 / 1000000);
    let lnglatCenter = tileCenter;
    let ECEFCenter = lla2ecef(
      lnglatCenter[1],
      lnglatCenter[0],
      lnglatCenter[2]
    );
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

        console.log(targetWorldPos);

        loading = false;
      }
    };
  }

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

  let crossComp: cross, carMgr: carManager<carDataType>;

  let onChangeRoadinfo = (info: crossInfo) => {
    if (crossComp) {
      scene.remove(crossComp.threeObj!);
    }
    const { roads } = info;
    crossComp = new cross(roads, info);
    scene.add(crossComp.genThreeObj(info));
    if (tileUrl) {
      crossComp.threeObj!.visible = false;
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

  onChangeRoadinfo({
    walkCrossWidth: 0.6,
    cameraPos: new Vector3(0, 10, 0),
    cameraLookAt: new Vector3(0, -9, 0),
    rightLaneType: "divided",
    turnerWidth: 0.75,
    turnerLaneWidth: 0.3,
    turnerOffset: 5,

    islandOffset: 0.5,
    roadStartOffset: -0.03,
    roads: [
      {
        direction: new Vector3(-0.9040036576791641, 0, 0.4275247208088586),
        lanes: [
          {
            signType: laneForward.turnerAway,
            width: 0.3,
          },
          {
            signType: laneForward.away,
            width: 0.31,
          },

          {
            signType: laneForward.away,
            width: 0.31,
          },
          {
            signType: laneForward.away,
            width: 0.31,
          },
          {
            signType: laneForward.gelidai,
            width: 0.27,
            startOffset: 1.3,
          },
          {
            signType: laneForward.zuozhuan,
            width: 0.31,
          },

          {
            signType: laneForward.zhixing,
            width: 0.31,
          },
          {
            signType: laneForward.zhixing,
            width: 0.31,
          },
          {
            signType: laneForward.turnerRight,
            width: 0.3,
          },
        ],
      },
      {
        direction: new Vector3(0.5299863272000847, 0, 0.8480061868765845),
        lanes: [
          {
            signType: laneForward.away,
            width: 0.3,
          },
          {
            signType: laneForward.away,
            width: 0.3,
          },
          {
            signType: laneForward.away,
            width: 0.3,
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
        ],
      },
      {
        direction: new Vector3(0.9040036576791641, 0, -0.4275247208088586),
        lanes: [
          {
            signType: laneForward.turnerAway,
            width: 0.3,
          },
          {
            signType: laneForward.away,
            width: 0.31,
          },
          {
            signType: laneForward.away,
            width: 0.31,
          },
          {
            signType: laneForward.away,
            width: 0.31,
          },
          {
            signType: laneForward.gelidai,
            width: 0.27,
            startOffset: 1.0,
          },
          {
            signType: laneForward.zuozhuan,
            width: 0.31,
          },
          {
            signType: laneForward.zhixing,
            width: 0.31,
          },
          {
            signType: laneForward.zhixing,
            width: 0.31,
          },
          {
            signType: laneForward.turnerRight,
            width: 0.3,
          },
        ],
      },
      {
        direction: new Vector3(-0.5299863272000847, 0, -0.8480061868765845),
        lanes: [
          {
            signType: laneForward.away,
            width: 0.3,
          },
          {
            signType: laneForward.away,
            width: 0.3,
          },
          {
            signType: laneForward.away,
            width: 0.3,
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
        ],
      },
    ],
  });

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

    updateNorthPtr();

    if (tileRender) {
      camera.updateMatrixWorld();
      tileRender.update();
    }

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
