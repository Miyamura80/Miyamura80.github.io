

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xdddddd);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
// renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  
  camera.updateProjectionMatrix();
});


const light = new THREE.PointLight(0xFFFFFF, 1, 1000);
light.position.set(0,0,0);
scene.add(light);


camera.position.z = 20;


let loader = new THREE.GLTFLoader();




loader.load('/models/sword.gltf', gltf => {
    // const sword = gltf.scene.children[0];
    // sword.rotation.z = Math.PI*.5;
    // sword.rotation.y = Math.PI*.5;
    // sword.scale.set(2,1,1);
    const sword = gltf.scene.children[0];
    sword.rotation.z = Math.PI*.5;
    sword.rotation.y = Math.PI*.5;
    scene.add(gltf.scene);
    gltf.animations; // Array&lt;THREE.AnimationClip&gt;
    gltf.scene; // THREE.Group
    gltf.scenes; // Array&lt;THREE.Group&gt;
    gltf.cameras; // Array&lt;THREE.Camera&gt;
    gltf.asset; // Object

    renderer.render(scene, camera);
},
// called while loading is progressing
function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
function ( error ) {

	console.error( error );

});

renderer.render(scene, camera);