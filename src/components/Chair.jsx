import { useEffect } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useCustomization } from '../context/customization';
import * as THREE from 'three';

const assetPath = "https://aquaneon.github.io/chair-config/";

const Chair = (props) => {
  // --- STEP 1: Call ALL hooks at the top level, in the same order, every time. ---
  const { material } = useCustomization();
  const { nodes } = useGLTF(`${assetPath}geometry/chair.glb`);

  // Load all texture sets directly. They will be handled by Suspense.
  const leatherTextures = useTexture({
    map: `${assetPath}textures/leather/leather-color.jpg`,
    normalMap: `${assetPath}textures/leather/leather-normal.jpg`,
    roughnessMap: `${assetPath}textures/leather/leather-roughness-inverted.jpg`
  });

  const fabricTextures = useTexture({
    map: `${assetPath}textures/fabric/Fabric036_1K-JPG_Color.jpg`,
    normalMap: `${assetPath}textures/fabric/Fabric036_1K-JPG_NormalGL.jpg`,
    aoMap: `${assetPath}textures/fabric/Fabric036_1K-JPG_AmbientOcclusion.jpg`,
    roughnessMap: `${assetPath}textures/fabric/Fabric036_1K-JPG_Roughness.jpg`,  
  });

  const woodTextures = useTexture({
    map: `${assetPath}textures/wood/Wood051_1K-JPG_Color.jpg`,
    normalMap: `${assetPath}textures/wood/Wood051_1K-JPG_NormalGL.jpg`,
    roughnessMap: `${assetPath}textures/wood/Wood051_1K-JPG_Roughness-inverted.jpg`
  });

  // --- STEP 2: Perform all side effects (modifications) inside useEffect hooks. ---
  
  // This effect runs AFTER the fabric and wood textures have loaded.
  useEffect(() => {
    // Safely modify the fabric textures
    for (const texture of Object.values(fabricTextures)) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2);
      texture.needsUpdate = true; // Tell Three.js the texture has been modified
    }
    // Safely modify the wood textures
    for (const texture of Object.values(woodTextures)) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.needsUpdate = true;
    }
  }, [fabricTextures, woodTextures]); // This effect depends on the loaded textures.

  // This effect safely adds the 'uv2' attribute for the AO map.
  useEffect(() => {
    if (nodes.cushion.geometry) {
      nodes.cushion.geometry.setAttribute('uv2', new THREE.BufferAttribute(nodes.cushion.geometry.attributes.uv.array, 2));
    }
  }, [nodes.cushion.geometry]);


  // --- STEP 3: The render function is now clean and declarative. ---
  return (
    <group {...props} dispose={null}>
      <mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.frame_1.geometry} 
      >
        <meshStandardMaterial {...woodTextures} />
      </mesh>
      
      <mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.cushion.geometry}
      >
        {material === 'leather' && <meshStandardMaterial {...leatherTextures} />}
        {material === 'fabric' && <meshStandardMaterial {...fabricTextures} aoMapIntensity={1} />}
      </mesh>
      
      <mesh 
        geometry={nodes.frame_2.geometry}
        material={nodes.frame_2.material}
        visible={false} 
      />
    </group>
  );
};

export default Chair;