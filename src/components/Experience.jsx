import { OrbitControls, Environment, AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react';
import Chair from './Chair';
import { useCustomization } from '../context/customization';

const Experience = () => {
    const {material, frame} = useCustomization();
    const shadowsRef = useRef();
    const [isRecalculating, setIsRecalculating] = useState(false);

    useEffect(() => {
        console.log("Frame changed, resetting shadows!");
        setIsRecalculating(true);
        shadowsRef.current?.reset();
        
        // Stop recalculation after shadows are done
        const timer = setTimeout(() => {
            setIsRecalculating(false);
        }, 100 * 16); 
        
        return () => clearTimeout(timer);
    }, [frame]); 

    return (
        <>
            <OrbitControls 
                makeDefault 
                target={[0, 0, 0]} 
                minPolarAngle={0} 
                maxPolarAngle={Math.PI / 2}
                minDistance={1.0}
                maxDistance={1.2}
                enablePan={false}
            />

            <Environment preset="city" intensity={0.8} />

            <directionalLight
                position={[3, 3, 2]} 
                intensity={2.5}     
            />

            <ambientLight intensity={0.5} />

            <Suspense fallback={null} >
                <Chair position={[0, -0.5, 0]} />

                <AccumulativeShadows
                    ref={shadowsRef} 
                    position={[0, -0.5, 0]} 
                    scale={10}
                    color="#8d8d8d"
                    alphaTest={0.85}
                    frames={100}
                    temporal={isRecalculating}
                    toneMapped={false} // Prevent tone mapping from affecting shadows
                >
                    <RandomizedLight 
                        amount={8} 
                        radius={2} 
                        ambient={0.8} 
                        position={[5, 5, 5]} 
                        bias={0.0001}
                        castShadow
                    />
                </AccumulativeShadows>

            </Suspense>
        </>
    );
};

export default Experience;