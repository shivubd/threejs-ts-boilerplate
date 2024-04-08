import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js' //we can replace /examples/jsm (folder) with /addons which is alias defined in ts
import Stats from 'three/addons/libs/stats.module.js'
// import { GUI } from 'dat.gui' IN COURSE THIS IS USED
import GUI from 'lil-gui'; //I HAVE USED lil-gui WHICH IS RECOMMENDED BY THREE.JS

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 1.5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
new OrbitControls(camera, renderer.domElement) //OrbitControls will control x,y,z axis of camera in renderer when we click and drag
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: true })

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const gui = new GUI()
const cubeFolder = gui.addFolder('Cube controls')
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2)//cube.rotation is object, x is its property, 0 is min, 2Pi = 360 is max value
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2)
cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2)

const cameraFolder = gui.addFolder('Camera controls')
cameraFolder.add(camera.position, "x", -20, 20)
cameraFolder.add(camera.position, "y", -20, 20)
cameraFolder.add(camera.position, "z", -20, 20)


const stats = new Stats()
document.body.appendChild(stats.dom)
function animate() {
  requestAnimationFrame(animate)

  // stats.begin()//This can be used to check the performance of code written between begin() and end() methods
  cube.rotation.x += 0.005
  cube.rotation.y += 0.005
  cube.rotation.z += 0.005
  // stats.end()

  renderer.render(scene, camera)
  stats.update() //This will update when screen is rendered by browser after a change
}

animate()