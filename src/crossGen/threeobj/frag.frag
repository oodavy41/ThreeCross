uniform vec3 color;
uniform vec3 midColor;
uniform float lineWidth;
uniform float lastAway;
uniform float firstAnear;
varying float rightDistance;
varying float leftDistance;
varying float startDistance;

void main() {
  vec3 finalColor = (step(0.5, lastAway) * midColor + step(lastAway, 0.5) * color) + (step(0.5, firstAnear) * midColor + step(firtAnear, 0.5) * color) + step(startDistance, lineWidth) * color;
  float finalOpacity = step(rightDistance, lineWidth / 2) + step(leftDistance, lineWidth / 2);
  gl_FragColor = vec4(finalColor, finalOpacity);
}
