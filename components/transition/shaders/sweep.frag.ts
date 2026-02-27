// Subtle / refined red energy sweep
// uProgress: 0.0 → 1.0 = sweep in  |  1.0 → 0.0 = sweep out
// Desktop uniforms: uNoiseAmp=0.02, uGlowWidth=0.04, uEdgeSoftness=0.03
// Mobile uniforms:  uNoiseAmp=0.005, uGlowWidth=0.02, uEdgeSoftness=0.05

export const fragmentShader = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  uniform float uNoiseAmp;
  uniform float uGlowWidth;
  uniform float uEdgeSoftness;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    // Subtle organic edge displacement
    float n = noise(vec2(vUv.y * 6.0, uTime * 1.2)) * uNoiseAmp;
    float edge = uProgress + n;

    // Smooth mask — smoothstep for controlled energy feel, never a hard step()
    float mask = smoothstep(edge + uEdgeSoftness, edge - uEdgeSoftness, vUv.x);

    // Narrow leading-edge glow band
    float dist = abs(vUv.x - edge);
    float glow = smoothstep(uGlowWidth, 0.0, dist) * mask;

    vec3 redBase = vec3(0.50, 0.0, 0.0);    // #800000 deep red core
    vec3 redEdge = vec3(0.75, 0.06, 0.06);  // subtle brighter leading edge
    vec3 color = mix(redBase, redEdge, glow);

    gl_FragColor = vec4(color, mask);
  }
`
