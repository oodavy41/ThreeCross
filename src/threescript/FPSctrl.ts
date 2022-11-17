import * as THREE from "three";
import { Vector3 } from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

const CAM_ROT_RADIUS = 100;
const VEC_UP = new THREE.Vector3(0, 1, 0);

interface FPSctrlSettings {
  moveSpeed?: number;
  rotateSpeed?: number;
}
export default class FPSControl {
  moveSpeed: number = 0.005;
  rotateSpeed: number = 0.02;
  focus: boolean = false;
  camera: THREE.Camera;
  dom: HTMLElement;

  lastXY: number[] = [0, 0];
  nowXY: number[] = [0, 0];
  forward: THREE.Vector3 = new Vector3();
  right: THREE.Vector3 = new Vector3();
  wasd: boolean[] = [false, false, false, false];
  private _rotateX: number = 0;
  private _rotateY: number = 0;

  set rotateX(value: number) {
    this._rotateX = Math.max(
      Math.min(Math.PI / 2 - 0.001, value),
      -Math.PI / 2 + 0.001
    );
  }
  get rotateX() {
    return this._rotateX;
  }

  set rotateY(value: number) {
    this._rotateY = (value + 2 * Math.PI) % (2 * Math.PI);
  }
  get rotateY() {
    return this._rotateY;
  }

  constructor(
    camera: THREE.Camera,
    dom: HTMLElement,
    forward: THREE.Vector3,
    settings?: FPSctrlSettings
  ) {
    this.moveSpeed = settings?.moveSpeed || this.moveSpeed;
    this.rotateSpeed = settings?.rotateSpeed || this.rotateSpeed;
    this.camera = camera;
    this.dom = dom;
    // this.rotateY = this.camera.rotation.y;
    this.rotateY = this.camera.rotation.y + Math.PI / 2;
    this.rotateX = this.camera.rotation.x;
    // camera.lookAt(this.camera.position.clone().add(forward));
    camera.up = VEC_UP;
    this.forward = forward;
    this.right = this.forward.clone().cross(VEC_UP);
    // this.keyEventBind();
    // this.mouseEventBind();
  }

  update(time: number) {
    if (this.focus) {
      this.movement(time);
      this.rotation(time);
    }
  }

  movement(time: number) {
    let helper = [1, -1, -1, 1],
      movement = [0, 0];
    this.wasd.forEach((value, index) => {
      if (value) {
        movement[index % 2] += helper[index];
      }
    });
    this.camera.position.add(
      this.forward.clone().multiplyScalar(movement[0] * this.moveSpeed * time)
    );
    this.camera.position.add(
      this.right.clone().multiplyScalar(movement[1] * this.moveSpeed * time)
    );
  }
  rotation(time: number) {
    let delta = this.nowXY.map((value, index) => value - this.lastXY[index]);
    this.lastXY = [...this.nowXY];

    this.rotateY += -Math.tan(
      (delta[0] * this.rotateSpeed * time) / CAM_ROT_RADIUS
    );

    this.rotateX += -Math.tan(
      (delta[1] * this.rotateSpeed * time) / CAM_ROT_RADIUS
    );
    this.forward = new THREE.Vector3(
      +Math.cos(this.rotateY) * Math.cos(this.rotateX),
      +Math.sin(this.rotateX),
      -Math.sin(this.rotateY) * Math.cos(this.rotateX)
    ).normalize();
    this.right = this.forward.clone().cross(VEC_UP);
    this.camera.lookAt(this.camera.position.clone().add(this.forward));
    // this.camera.rotation.set(this.rotateX, this.rotateY, 0);
    // console.log(this.camera.rotation);
    this.camera.updateMatrixWorld();
  }

  keyEventBind() {
    document.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          this.wasd[0] = true;
          break;
        case "ArrowLeft":
        case "KeyA":
          this.wasd[1] = true;
          break;

        case "ArrowDown":
        case "KeyS":
          this.wasd[2] = true;
          break;

        case "ArrowRight":
        case "KeyD":
          this.wasd[3] = true;
          break;
      }
    });
    document.addEventListener("keyup", (event) => {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          this.wasd[0] = false;
          break;
        case "ArrowLeft":
        case "KeyA":
          this.wasd[1] = false;
          break;

        case "ArrowDown":
        case "KeyS":
          this.wasd[2] = false;
          break;

        case "ArrowRight":
        case "KeyD":
          this.wasd[3] = false;
          break;
      }
    });
  }
  mouseEventBind() {
    this.dom.addEventListener("click", (event) => {
      this.switchLock(event);
    });
    this.dom.addEventListener("mousemove", (event) => {
      if (this.focus) {
        this.nowXY = [event.clientX, event.clientY];
      }
    });
  }

  lock() {
    this.focus = false;
  }
  unlock(x: number, y: number) {
    this.focus = true;
    this.lastXY = [x, y];
    this.nowXY = [x, y];
  }
  switchLock(event: MouseEvent) {
    if (this.focus) this.lock();
    else this.unlock(event.clientX, event.clientY);
  }
}
