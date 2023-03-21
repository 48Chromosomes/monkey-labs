import * as THREE from 'three';
import CANNON from 'cannon';
import { DiceManager, DiceD20 } from 'threejs-dice/lib/dice';

export const init = ({ container }: { container: HTMLCanvasElement | null }) => {
  // SCENE
  const scene = new THREE.Scene();

  // CAMERA
  const SCREEN_WIDTH = 1000;
  const SCREEN_HEIGHT = 1000;
  const VIEW_ANGLE = 20;
  const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
  const NEAR = 1;
  const FAR = SCREEN_HEIGHT * 1.3;

  const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(0, 100, 0);

  // RENDERER
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container?.appendChild(renderer.domElement);

  let ambient = new THREE.AmbientLight('#ffffff', 0.3);
  scene.add(ambient);

  let directionalLight = new THREE.DirectionalLight('#ffffff', 0.5);
  directionalLight.position.x = -1000;
  directionalLight.position.y = 1000;
  directionalLight.position.z = 1000;
  scene.add(directionalLight);

  let light = new THREE.SpotLight(0xefdfd5, 0.8);
  light.position.y = 100;
  light.target.position.set(50, 0, 50);
  light.castShadow = true;
  light.shadow.camera.near = 50;
  light.shadow.camera.far = 110;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  scene.add(light);

  ////////////
  // CUSTOM //
  ////////////
  const world = new CANNON.World();

  world.gravity.set(0, -9.82 * 20, 0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 16;

  //Floor
  let floorBody = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Plane(),
    material: DiceManager.floorBodyMaterial,
  });
  floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
  world.addBody(floorBody);

  //Walls
  const wallLBody = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Plane(),
    material: DiceManager.floorBodyMaterial,
  });
  wallLBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2);
  wallLBody.position.set(17, 0, 0);
  world.addBody(wallLBody);

  let wallBBody = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Plane(),
    material: DiceManager.floorBodyMaterial,
  });
  wallBBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI);
  wallBBody.position.set(0, 0, 10);
  world.addBody(wallBBody);

  DiceManager.setWorld(world);

  const die = new DiceD20({
    size: 1.5,
    backColor: '#000',
    fontColor: '#ffd582',
  });

  scene.add(die.getObject());

  const roll = () => {
    let yRand = Math.random() * 20;
    die.getObject().position.x = -15 - 3 * 1.5;
    die.getObject().position.y = 2 + Math.floor(3) * 1.5;
    die.getObject().position.z = -15 + 3 * 1.5;
    die.getObject().quaternion.x = ((Math.random() * 90 - 45) * Math.PI) / 180;
    die.getObject().quaternion.z = ((Math.random() * 90 - 45) * Math.PI) / 180;
    die.updateBodyFromMesh();
    let rand = Math.random() * 5;
    die.getObject().body.velocity.set(25 + rand, 40 + yRand, 15 + rand);
    die.getObject().body.angularVelocity.set(20 * Math.random() - 10, 20 * Math.random() - 10, 20 * Math.random() - 10);

    DiceManager.prepareValues([{ dice: die, value: 3 }]);
  };

  const animate = () => {
    updatePhysics();
    render();

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);

  const updatePhysics = () => {
    world.step(1.0 / 60.0);
    die.updateMeshFromBody();
  };

  const render = () => {
    renderer.render(scene, camera);
  };

  return roll;
};
