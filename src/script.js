import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import testVertexShader from "./shaders/tests/vertex.glsl";
import testfragmentShader from "./shaders/tests/fragment.glsl";
import Stats from "three/examples/jsm/libs/stats.module.js";

let stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom)

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
let texture = textureLoader.load("textures/indianFlag.jpg")

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

let count = geometry.attributes.position.count;
let randomA = new Float32Array(count);

for (let i = 0; i < count; i++) {
  randomA[i] = Math.random();
}

geometry.setAttribute("aRandom", new THREE.BufferAttribute(randomA , 1))

console.log(geometry)
// Material
const material = new THREE.ShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testfragmentShader,
  uniforms:{
    uFrequency:{value: new THREE.Vector2(10,5)},
    uTime:{value: 0},
    uColor:{value:new THREE.Color("yellow")},
    uTexture:{value:texture}
  }
});

gui.add(material.uniforms.uFrequency.value,'x').min(1).max(20).step(0.01).name("xFrequency")
gui.add(material.uniforms.uFrequency.value,'y').min(1).max(20).step(0.01).name("yFrequency")

// Mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.scale.y = 2/3;
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0.25, -0.25, 1);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  stats.begin();

  const elapsedTime = clock.getElapsedTime();

  mesh.material.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);

  stats.end();
};

tick();
