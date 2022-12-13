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
import { car, carManager, carMap, carPool } from "../crossGen/car";
import cross from "../crossGen/cross";
import FPSControl from "./FPSctrl";
import skyCube from "./skybox";
import { laneForward } from "../crossGen/lane";
import { carModelType } from "../crossGen/carModelTypes";
import { CategoryId } from "../../../../utils/configs";
import { CarLicenseNode } from "../../../../component/licensePanel";

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
  cameraPos: Vector3;
  cameraLookAt: Vector3;
  walkCrossWidth?: number;
  rightLaneType?: "alone" | "divided" | "normal";

  jectionRadInner?: number;
  jectionRadOutter?: number;
  roadStartOffset?: number;
  islandOffset?: number;
  // center: Vector3;
  // rotationY: number;
  // scale: number;
}

const NEW_CAR_CHANCE = 0.05;
const ORTH_CAM_DHEIGHT = 10;

export default function tInit(
  container: HTMLDivElement,
  emulator: boolean = true,
  camProj: "perspective" | "orthographic" = "perspective",
  carsHandler?: (data: CarLicenseNode[]) => void
) {
  let [cWidth, cHeight] = [container.clientWidth, container.clientHeight];

  let camera: THREE.Camera;
  if (camProj === "perspective") {
    camera = new THREE.PerspectiveCamera(45, cWidth / cHeight, 0.25, 100);
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
  northPtr.scale.set(0.001, 0.001, 0.001);
  let ptrPos = new Vector3(0, -0.1, -0.3);

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
  let gasStation = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshLambertMaterial({ color: 0xff0000 })
  );
  gasStation.position.set(5, 0, 1);
  scene.add(gasStation);

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

  camera.position.set(0, 3.5, 4);
  camera.lookAt(-0.7, -11, -10);
  const CamFpsCtrl = new FPSControl(
    camera,
    renderer.domElement,
    new Vector3(0, -8, -10)
  );

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

  let crossComp: cross, carMgr: carManager;

  let onChangeRoadinfo = (info: crossInfo) => {
    if (crossComp) {
      scene.remove(crossComp.threeObj!);
    }
    const { roads } = info;
    crossComp = new cross(roads, info);
    scene.add(crossComp.genThreeObj(info));
    if (emulator) {
      carMgr = new carPool(NEW_CAR_CHANCE, 100, crossComp);
    } else {
      carMgr = new carMap(crossComp);
    }
    crossComp.threeObj?.add(carMgr.selfObj);
    camera.position.copy(info.cameraPos);
    camera.lookAt(info.cameraLookAt);
  };

  onChangeRoadinfo({
    walkCrossWidth: 0.5,
    cameraLookAt: new Vector3(0, 3.5, 4),
    cameraPos: new Vector3(-0.7, -11, -10),
    rightLaneType: "divided",
    jectionRadOutter: 1.5,
    roadStartOffset: 0.3,
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
          // {
          //   signType: laneForward.youzhuan,
          //   width: 0.3,
          // },
        ],
      },
    ],
  });

  let covertToScreenPos = (pos: Vector3) => {
    let p = pos.clone();
    p.project(camera);
    return {
      x: ((p.x + 1) / 2) * cWidth,
      y: ((1 - p.y) / 2) * cHeight,
      z: p.z,
    };
  };
  let setCamLayer = (all: number[], layers: number[]) => {
    all.forEach((l) => camera.layers.disable(l));
    layers.forEach((l) => camera.layers.enable(l));
  };

  function renderloop(T: number) {
    stats && stats.begin();
    let delta = ticker.tick(T);
    onResize();
    CamFpsCtrl.update(delta);
    let cars = carMgr.update(delta);
    if (carsHandler) {
      let carList: CarLicenseNode[] = cars
        .filter((car) => car.carObj)
        .filter((car) => camera.layers.test(car.carObj!.layers))
        .map((c, index) => {
          return {
            id: index,
            pos: c.carObj.position,
            coord: covertToScreenPos(c.carObj.position),
            type: c.type || 16,
            license: c instanceof car ? c.license : "",
          };
        })
        .filter((c) => c.coord.z > 0 && c.coord.z < 1);
      carsHandler(carList);
    }
    // renderer.render(scene, camera);
    updateNorthPtr();
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
      type?: CategoryId;
      license?: string;
    }
  >(data: { [key: string]: T }) {
    if (!emulator) {
      return (carMgr as carMap<T>).pushData(data);
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
