import { useEffect } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useCustomization } from '../context/customization';
import * as THREE from 'three';

const assetPath = "https://aquaneon.github.io/chair-config/";

const Chair = (props) => {
  const { material, frame } = useCustomization();
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

  

  useEffect(() => {
    // Safely modify the fabric textures
    for (const texture of Object.values(fabricTextures)) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2);
      texture.needsUpdate = true; 
    }
    // Safely modify the wood textures
    for (const texture of Object.values(woodTextures)) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.needsUpdate = true;
    }
  }, [fabricTextures, woodTextures]);

  useEffect(() => {
    if (nodes.cushion.geometry) {
      nodes.cushion.geometry.setAttribute('uv2', new THREE.BufferAttribute(nodes.cushion.geometry.attributes.uv.array, 2));
    }
  }, [nodes.cushion.geometry]);


  return (
    <group {...props} dispose={null}>
      <mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.frame_1.geometry}
        visible={frame === 1} 
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
        castShadow 
        receiveShadow 
        geometry={nodes.frame_2.geometry}
        material={nodes.frame_2.material}
        visible={frame === 2} 
      />
    </group>
  );
};

export default Chair;