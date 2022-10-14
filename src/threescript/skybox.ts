import * as THREE from "three";
import { CubeTexture, ImageLoader, Object3D } from "three";

const crossArrayRight = [
  [3, 1],
  [1, 1],
  [2, 0],
  [2, 2],
  [2, 1],
  [0, 1],
];

const crossArrayLeft = [
  [2, 1],
  [0, 1],
  [1, 0],
  [1, 2],
  [1, 1],
  [3, 1],
];

export default function setSkyCube(url: string, left: boolean=true) {
  let loader = new THREE.ImageLoader();
  let crossArray = left ? crossArrayLeft : crossArrayRight;
  let cubeLoader = new THREE.CubeTextureLoader();
  let cubeTex = new CubeTexture();
  loader.load(url, (image) => {
    const size = image.naturalWidth / 4;
    let images = [];
    for (let i = 0; i < 6; i++) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = size;
      canvas.height = size;
      context!.drawImage(
        image,
        crossArray[i][0] * size,
        crossArray[i][1] * size,
        size,
        size,
        0,
        0,
        size,
        size
      );
      images.push(canvas.toDataURL("image/png"));
      // document.body.appendChild(canvas);
    }
    cubeTex.images = images.map((url) => new ImageLoader().load(url));
    cubeTex.needsUpdate = true;
    cubeTex.magFilter=THREE.LinearMipMapNearestFilter;
    cubeTex.minFilter=THREE.LinearFilter;
  });
  return cubeTex;
}
