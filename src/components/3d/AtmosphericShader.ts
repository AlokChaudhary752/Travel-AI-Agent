import * as THREE from "three";

export const AtmosphereShader = {
  uniforms: {
    color: { value: new THREE.Color(0xc9a24b) },
    glowColor: { value: new THREE.Color(0x3a7bd5) },
  },
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    uniform vec3 glowColor;
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
      vec3 finalColor = mix(glowColor, color, intensity * 0.7);
      gl_FragColor = vec4(finalColor, intensity * 0.75);
    }
  `,
};
