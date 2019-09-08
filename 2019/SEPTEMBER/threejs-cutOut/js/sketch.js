const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// basic params
var params = {
  exposure: 1,
  bloomStrength: 1.2,
  bloomThreshold: 0,
  bloomRadius: 0
};

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

// pointlight
const pointLight = new THREE.AmbientLight(0xFAEBD7, 0.4);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);
// ambient lights
const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);
// dir light
var light = new THREE.DirectionalLight(0x404040, 2, 100);
light.position.set(0, 1, 1); //default; light shining from top
light.castShadow = true; // default false
scene.add(light);

//Set up shadow properties for the light

light.shadow.mapSize.width = 4096 // default
light.shadow.mapSize.height = 4096 // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default

// post processing
var renderScene = new THREE.RenderPass(scene, camera);

var bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;
var composer = new THREE.EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// instantiate a loader
var loader = new THREE.OBJLoader();
let obj;
// load a resource
loader.load(
  // resource URL
  'model/test.obj',
  // called when resource is loaded
  function (object) {
    obj = object
    scene.add(obj);
    console.log(obj)
    // set the scale to match the scene
    // obj.scale.set(0.01, 0.01, 0.01)
    // set some things for materials
    obj.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        const material = new THREE.MeshLambertMaterial({
          color: 0x939393,
          // wireframe: true

        });
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = material;
        child.material.depthWrite = false;
      }
    });
  },
  // called when loading is in progresses
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  // called when loading has errors
  function (error) {
    console.log('An error happened');
  }
);

//Create a helper for the shadow camera (optional)
var helper = new THREE.CameraHelper(light.shadow.camera);
scene.add(helper);

// logic
let t = 0
const update = function () {
  // sphere.rotation.y += 0.001
  t += 2
  if (obj) {
    // const temp = Math.random() * 400 - 200
    // obj.children[2].position.x = Math.lerp(obj.position.x, temp, 0.01)
    for (let i = 0; i < obj.children.length; i++) {
      const dist = 0.5 / ((obj.children.length - i) + 1)
      obj.children[i].position.x = map(Math.cos(t / 100 + i), -1, 1, -dist, dist)
      obj.children[i].position.z = map(Math.sin(t / 100 + i), -1, 1, -dist, dist)
      // obj.children[i].position.y = map(Math.sin(t / 100 + i), -1, 1, -dist / 2, dist / 2) - i * 0.1
      obj.children[i].rotation.x = map(Math.sin(t / 100 + i), -1, 1, -dist * 2, dist * 2)
      // const temp = map(Math.sin(t / 100 + i), -1, 1, 0.5, 1)
      const temp = map(i, 0, obj.children.length, 1, 1.5)
      obj.children[i].scale.set(temp, temp, temp)
    }
  }
}

// draw
const render = function () {
  controls.update();
  // renderer.render(scene, camera);
  composer.render();

}

// update render repeat
const gameLoop = function () {
  requestAnimationFrame(gameLoop);

  update();
  render();
}

gameLoop();

function map(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

Math.lerp = function (start, stop, amt) {
  return start + (stop - start) * amt;
}