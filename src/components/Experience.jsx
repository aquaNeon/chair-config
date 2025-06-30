import { OrbitControls, Environment, AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import { Suspense } from 'react';
import Chair from './Chair';


const Experience = () => {

    return (
        <>
            <OrbitControls 
                makeDefault 
                target={[0, 0, 0]} 
                minPolarAngle={0} 
                maxPolarAngle={Math.PI / 2}
                minDistance={1}
                maxDistance={1.2}
            />

        
            <Environment preset="city" intensity={0.8} />

            <directionalLight
                position={[3, 3, 2]} 
                intensity={2.5}     
            />

            <ambientLight intensity={0.5} />

            <Suspense fallback={null} >
                <Chair position={[0, -0.5, 0]} />
            </Suspense>

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
                    radius={2} 
                    ambient={0.8} 
                    position={[5, 5, 5]} 
                    bias={0.0001} 
                />
            </AccumulativeShadows>
        </>
    );
};

export default Experience;