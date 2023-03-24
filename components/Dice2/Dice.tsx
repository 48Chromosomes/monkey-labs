// @ts-nocheck

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon';
import { DiceManager, DiceD20 } from 'threejs-dice/lib/dice';

export default function Dice() {
  const rendererRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const worldRef = useRef(null);
  const diceRef = useRef({});

  const rollDice = () => {
    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // CAMERA
    const SCREEN_WIDTH = 500;
    const SCREEN_HEIGHT = 500;
    const VIEW_ANGLE = 20;
    const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
    const NEAR = 1;
    const FAR = SCREEN_HEIGHT * 1.3;
    const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    sceneRef.current.add(camera);
    camera.position.set(0, 100, 0);
    cameraRef.current = camera;

    // RENDERER
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    rendererRef.current.shadowMap.enabled = true;
    rendererRef.current.shadowMap.type = THREE.PCFSoftShadowMap;

    canvasRef.current.appendChild(rendererRef.current.domElement);

    let ambient = new THREE.AmbientLight('#ffffff', 0.3);
    sceneRef.current.add(ambient);

    let directionalLight = new THREE.DirectionalLight('#ffffff', 0.5);
    directionalLight.position.x = -1000;
    directionalLight.position.y = 1000;
    directionalLight.position.z = 1000;
    sceneRef.current.add(directionalLight);

    let light = new THREE.SpotLight(0xefdfd5, 1.3);
    light.position.y = 100;
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.camera.near = 50;
    light.shadow.camera.far = 110;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    sceneRef.current.add(light);

    // FLOOR
    var floorMaterial = new THREE.MeshPhongMaterial({
      color: '#00aa00',
      side: THREE.DoubleSide,
      flatShading: true,
    });
    var floorGeometry = new THREE.PlaneGeometry(30, 30, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    floor.rotation.x = Math.PI / 2;
    sceneRef.current.add(floor);

    // CANNON world
    worldRef.current = new CANNON.World();
    worldRef.current.gravity.set(0, -9.82 * 20, 0);
    worldRef.current.broadphase = new CANNON.NaiveBroadphase();
    worldRef.current.solver.iterations = 16;

    DiceManager.setWorld(worldRef.current);

    //Floor
    let floorBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      material: DiceManager.floorBodyMaterial,
    });
    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    worldRef.current.addBody(floorBody);

    // Dice
    diceRef.current = new DiceD20({
      size: 1.5,
      backColor: '#000',
      fontColor: '#fff',
    });
    sceneRef.current.add(diceRef.current.getObject());

    let yRand = Math.random() * 20;
    diceRef.current.getObject().position.x = -15 - (0 % 3) * 1.5;
    diceRef.current.getObject().position.y = 2 + Math.floor(0 / 3) * 1.5;
    diceRef.current.getObject().position.z = -15 + (0 % 3) * 1.5;
    diceRef.current.getObject().quaternion.x = ((Math.random() * 90 - 45) * Math.PI) / 180;
    diceRef.current.getObject().quaternion.z = ((Math.random() * 90 - 45) * Math.PI) / 180;
    diceRef.current.updateBodyFromMesh();
    let rand = Math.random() * 5;
    diceRef.current.getObject().body.velocity.set(25 + rand, 40 + yRand, 15 + rand);
    diceRef.current
      .getObject()
      .body.angularVelocity.set(20 * Math.random() - 10, 20 * Math.random() - 10, 20 * Math.random() - 10);

    DiceManager.prepareValues({ dice: diceRef.current, value: 13 });

    requestAnimationFrame(animate);
  };

  function animate() {
    updatePhysics();
    render();

    requestAnimationFrame(animate);
  }

  function updatePhysics() {
    worldRef.current.step(1.0 / 60.0);
    diceRef.current.updateMeshFromBody();
  }

  function render() {
    console.log(rendererRef.current);
    console.log(sceneRef.current);
    console.log(cameraRef.current);
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }

  return (
    <>
      <button onClick={rollDice} style={{ marginTop: '-4em' }}>
        Click
      </button>
      <div ref={canvasRef} style={{ position: 'absolute', left: 0, top: 0 }} />
    </>
  );
}
