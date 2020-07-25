// import {GLTFLoader} from 'js/GLTFLoader.js';


//Scene, camera, renderer is what is required for all threejs
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xdddddd);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
)

//Nothing will show up unless camera is set
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  
  camera.updateProjectionMatrix();
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

//Radius, vertex x count, vertex y count
// const geometry = new THREE.SphereGeometry(1, 10, 10);

const geometry = new THREE.BoxGeometry(1,1,1);

//When moving stuff, move the mesh, not the obj
//By default, (0,0,0)

for(var i = 0; i < 15; i++){
  const material = new THREE.MeshLambertMaterial({color: 0xFFCC00})
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = (Math.random() - 0.5)*10;
  mesh.position.y = (Math.random() - 0.5)*10;
  mesh.position.z = (Math.random() - 0.5)*10;
  scene.add(mesh)

}

// mesh.position.set(0,0,2);
// mesh.rotation.set(45,0,0);
// mesh.scale.set(2,1,1);

//color, intensity, distance
const light = new THREE.PointLight(0xFFFFFF, 1, 500);
light.position.set(10,0,25);
scene.add(light);


// let loader = new THREE.GLTFLoader();
// loader.load('scene.gltf', gltf => {
//     scene.add(gltf.scene);
// })



const render = () => {
  requestAnimationFrame(render);
  // mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}

render();

const onMouseMove = event => {
  event.preventDefault();

  mouse.x = (event.clientX/window.innerWidth) * 2 -1;
  mouse.y = -(event.clientY/window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);
  for(var i = 0; i < intersects.length; i++){
    intersects[i].object.material.color.set(0xff0000);
    this.tl = new TimelineMax();
    this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut})
    this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut})
    this.tl.to(intersects[i].object.position, .5, {x: 2, ease: Expo.easeOut})
    this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}, "=-1.5");
    intersects[i].object.material.color.set(0x00aa00);
  }


}

window.addEventListener('mousemove', onMouseMove);