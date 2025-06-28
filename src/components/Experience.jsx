// src/components/Experience.jsx

import { OrbitControls, Environment, AccumulativeShadows, RandomizedLight } from '@react-three/drei'

const Experience = () => {
    return (
        <>
            <OrbitControls 
                makeDefault 
                target={[0, 0.5, 0]} 
                minPolarAngle={0} 
                maxPolarAngle={Math.PI / 2}
                minDistance={4}
                maxDistance={6}
            />
            <Environment preset="city" />

            {/* The Chair */}
            <mesh castShadow position={[0, 0, 0]}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>

            <AccumulativeShadows
                position={[0, -0.5, 0]} 
                scale={10}
                color="#8d8d8d"
                alphaTest={0.85}
                frames={100}
                temporal
            >
                <RandomizedLight 
                    amount={8} 
                    radius={5} 
                    ambient={0.5} 
                    position={[5, 5, -5]} 
                    bias={0.001} 
                />
            </AccumulativeShadows>
        </>
    );
};

export default Experience;