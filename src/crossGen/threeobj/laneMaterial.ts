import { Color, DoubleSide, ShaderMaterial, Texture, Vector3 } from "three";

const vert = `
  uniform vec3 rightBorder;
  uniform vec3 leftBorder;
  uniform vec3 direction;
  varying float rightDistance;
  varying float leftDistance;
  varying float startDistance;

  void main(){
    rightDistance=abs(length(cross(position-rightBorder,direction)));
    leftDistance=abs(length(cross(position-leftBorder,direction)));
    startDistance=dot(direction,position-rightBorder);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;

const frag = `
  uniform vec3 color;
  uniform vec3 midColor;
  uniform float lineWidth;
  uniform float lastAway;
  uniform float firstAnear;
  uniform float Anear;
  varying float rightDistance;
  varying float leftDistance;
  varying float startDistance;


  void main() {
    vec3 leftColor = step(leftDistance,lineWidth/2.0)*(step(0.5,lastAway)*midColor+step(lastAway,0.5)*color);
    vec3 rightColor = step(rightDistance,lineWidth/2.0)*(step(0.5,firstAnear)*midColor+step(firstAnear,0.5)*color);
    vec3 headColor = step(startDistance, lineWidth)*color;
    float finalOpacity = step(rightDistance, lineWidth / 2.0) + step(leftDistance, lineWidth / 2.0)+step(0.5,Anear)*step(startDistance, lineWidth);
    gl_FragColor = vec4(leftColor+rightColor+headColor, finalOpacity);
    // gl_FragColor=vec4(vec3(headColor),1.0);
  }

`;

export default class LaneMat extends ShaderMaterial {
  constructor(
    color: Color,
    midColor: Color,
    lineWidth: number,
    direction: Vector3,
    rightBorder: Vector3,
    leftBorder: Vector3,
    lastAway: number,
    firstAnear: number,
    Anear: number
  ) {
    super({
      uniforms: {
        color: { value: color },
        midColor: { value: midColor },
        lineWidth: { value: lineWidth },
        direction: { value: direction },
        rightBorder: { value: rightBorder },
        leftBorder: { value: leftBorder },
        lastAway: { value: lastAway },
        firstAnear: { value: firstAnear },
        Anear: { value: Anear },
      },
      vertexShader: vert,
      fragmentShader: frag,
      // wireframe:true,
      transparent: true,
      depthWrite: false,
    });
  }
}
