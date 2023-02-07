import { Color, ShaderMaterial, Texture } from "three";

const vert = `
  attribute vec3 crossDir;
  varying float shadowDistance;  

    void main(){
      vec4 mPosition = modelMatrix * vec4( position, 1.0 );
      shadowDistance=dot(crossDir,mPosition.xyz);
      gl_Position=projectionMatrix *viewMatrix* mPosition;
    }
`;

const frag = `
  uniform vec3 color;
  uniform float crossWidth;
  varying float shadowDistance;

  void main(){
    float modValue=mod(shadowDistance,crossWidth);
    float opacity=step(0.5,modValue/crossWidth);

    gl_FragColor=vec4(color,opacity);
  }

`;

export default class WalkCrossMat extends ShaderMaterial {
  constructor(color: Color, crossWidth: number) {
    super({
      uniforms: {
        color: { value: color },
        crossWidth: { value: crossWidth },
      },
      vertexShader: vert,
      fragmentShader: frag,
      // wireframe:true,
      transparent: true,
      depthWrite: false,
    });
  }
}
