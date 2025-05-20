import { useEffect, useState, } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const Model = ({ currentAnimation, setCurrentAnimation, defaultAnimation }) => {
  const { scene, animations } = useGLTF("/shin.glb");
  const { actions } = useAnimations(animations, scene);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  

  useEffect(() => {
    if (!actions) return;
    // console.log(Object.keys(actions));

    // Stop all animations
    Object.values(actions).forEach((action) => action.stop());

    // Play default animation on first load
    if (isFirstLoad && defaultAnimation && actions[defaultAnimation]) {
      actions[defaultAnimation].play();
      setIsFirstLoad(false);
    }

    // Play selected animation only once
    if (currentAnimation && actions[currentAnimation]) {
      const action = actions[currentAnimation];
      action.reset();
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();

      // When animation finishes, return to default animation
      action.getMixer().addEventListener("finished", () => {
        setCurrentAnimation(defaultAnimation);
      });
    }

    return () => {
      if (actions[currentAnimation]) {
        actions[currentAnimation].getMixer().removeEventListener("finished", () => {
          setCurrentAnimation(defaultAnimation);
        });
      }
    };
  }, [currentAnimation, actions]);

  return <primitive object={scene} scale={16} position={[-25, -20, 0]} rotation={[-0.5, 1, 0]} castShadow receiveShadow />;
};

const App = () => {
  const [currentAnimation, setCurrentAnimation] = useState(null);
  const defaultAnimation = "dvl_mdl_guts_idle_00";

  return (
    <div style={{ position: "absolute", height: "100vh", width: "100vw" }}>
      <div style={{ position: "absolute", bottom: 20, left: 350, zIndex: 10 }}>
        <button onClick={() => setCurrentAnimation("dvl_mdl_guts_attack")} style={buttonStyle}>Attack</button>
        <button onClick={() => setCurrentAnimation("dvl_mdl_guts_skill")} style={buttonStyle}>Flex</button>
      </div>

      <Canvas camera={{ position: [0, 10, 20] }}>
        <ambientLight intensity={3} />
        <directionalLight position={[2, 2, 2]} />
        <Model currentAnimation={currentAnimation} setCurrentAnimation={setCurrentAnimation} defaultAnimation={defaultAnimation} />
        <OrbitControls enableRotate={false} />
      </Canvas>
    </div>
  );
};

const buttonStyle = {
  margin: "5px",
  padding: "5px 20px",
  background: "#121414",
  color: "grey",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default App;
