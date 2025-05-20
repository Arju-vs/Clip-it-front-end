import * as THREE from "three";
import {Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from "react";
import Music from './Song'
import HomeContent from "./HomeContent";

function Model() {
  const { scene, animations } = useGLTF("/space_station_scene_hd.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      actions[Object.keys(actions)[0]].play(); // Play the first animation
    }
  }, [actions]);

  return <primitive object={scene} scale={1} />;
}

export default function Scene() {


  return (
    <div style={{position:'relative',width: "100vw", height: "100vh"}}>
      <Canvas 
        camera={{ position: [0, 3, 11] }} 
        dpr={[1, 2]}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Environment preset="night" />
        <ambientLight intensity={-3} />
        <directionalLight position={[2, 2, 2]} />
        <Model />
        <OrbitControls minDistance={5} maxDistance={40} minPolarAngle={Math.PI / 8}  // Limits vertical rotation (up/down)
  maxPolarAngle={Math.PI / 2}  // Prevents looking directly above/below
  maxAzimuthAngle={Math.PI / 4} />
      </Canvas>
      <HomeContent />
      <Music/>
    </div>
    
  );
}
