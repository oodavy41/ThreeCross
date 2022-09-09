import { ShaderMaterial, Texture } from "three";

const vert = `
  varying vec2 vuv;

    void main(){
      vec4 mPosition = modelMatrix * vec4( position, 1.0 );
      vuv=mPosition.xz;
      gl_Position=projectionMatrix *viewMatrix* mPosition;
    }
`;

const frag = `
    uniform sampler2D map;
    uniform float mapScale;
    varying vec2 vuv;

    void main(){
      vec4 sampledDiffuseColor=texture2D(map,vuv*mapScale);
      gl_FragColor=sampledDiffuseColor;
    }

`;

export default class RoadMat extends ShaderMaterial {
  constructor(map: Texture, mapScale: number) {
    super({
      uniforms: {
        map: { value: map },
        mapScale: { value: mapScale },
      },
      vertexShader: vert,
      fragmentShader: frag,
      // wireframe: true,
    });
  }
}
