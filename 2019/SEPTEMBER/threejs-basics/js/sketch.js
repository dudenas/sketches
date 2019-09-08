const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// orbit control
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// set camera position
camera.position.z = 5;

// resize window
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix()
})

// lights
const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);

var light = new THREE.DirectionalLight(0x404040, 2, 100);
light.position.set(0, 1, 1); //default; light shining from top
light.castShadow = true; // default false
scene.add(light);

//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default

// Create geometry
const geometry = new THREE.SphereBufferGeometry(1, 32, 32);
const material = new THREE.MeshLambertMaterial({
  color: 0x00FF00,
  wireframe: true
});
// const material = new THREE.MeshDepthMaterial({
//   wireframe: true
// });

const sphere = new THREE.Mesh(geometry, material);
sphere.castShadow = true; //default is false
sphere.receiveShadow = true; //default
scene.add(sphere);

//Create a plane that receives shadows (but does not cast them)
var planeGeometry = new THREE.PlaneBufferGeometry(9, 9, 1, 1);
var planeMaterial = new THREE.MeshLambertMaterial({
  color: 0x3232E1
})
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.position.z = -1.5
scene.add(plane);

//Create a helper for the shadow camera (optional)
var helper = new THREE.CameraHelper(light.shadow.camera);
scene.add(helper);

// MOUSE
var dir = {
  x: 0,
  y: 0
}

// EFFECTS
effect = new THREE.StereoEffect(renderer);
// const effect = new THREE.AsciiEffect(renderer, ' .:-+*=%@#', {
//   invert: true
// })
effect.setSize(window.innerWidth, window.innerHeight)
// effect.domElement.style.color = 'white';
// effect.domElement.style.backgroundColor = 'black';
// Special case: append effect.domElement, instead of renderer.domElement.
// AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.
// document.body.appendChild(effect.domElement);

// logic
const update = function () {
  sphere.rotation.y += 0.05 * dir.x;
}

// draw
const render = function () {
  controls.update();
  // renderer.render(scene, camera);
  effect.render(scene, camera);
}

// update render repeat
const gameLoop = function () {
  requestAnimationFrame(gameLoop);

  update();
  render();
}

gameLoop();

onmousemove = function (e) {
  // console.log("mouse location:", e.clientX, e.clientY)
  dir.x = map(e.clientX, 0, window.innerWidth, -1, 1);
  dir.y = map(e.clientY, 0, window.innerHeight, -1, 1);
}

function map(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}