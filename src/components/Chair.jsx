import { useEffect, useMemo } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useCustomization } from '../context/customization';
import * as THREE from 'three';

const assetPath = "https://aquaneon.github.io/chair-config/";

const Chair = (props) => {
  const { material, frame, frameColor, cushionColor } = useCustomization();
  const { nodes } = useGLTF(`${assetPath}geometry/chair2.glb`);

  // Load all texture sets directly. They will be handled by Suspense.
  const leatherTextures = useTexture({
    normalMap: `${assetPath}textures/leather/leather-normal.jpg`,
    roughnessMap: `${assetPath}textures/leather/leather-roughness-inverted.jpg`
  });

  const fabricTextures = useTexture({
    normalMap: `${assetPath}textures/fabric/Fabric036_1K-JPG_NormalGL.jpg`,
    aoMap: `${assetPath}textures/fabric/Fabric036_1K-JPG_AmbientOcclusion.jpg`,
    roughnessMap: `${assetPath}textures/fabric/Fabric036_1K-JPG_Roughness.jpg`,
  });

  const woodTextures = useTexture({
    normalMap: `${assetPath}textures/wood/Wood051_1K-JPG_NormalGL.jpg`,
    roughnessMap: `${assetPath}textures/wood/Wood051_1K-JPG_Roughness-inverted.jpg`
  });

  // Create materials with useMemo to avoid recreating them on every render
  const metalMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: frameColor.color,
      roughness: 0.1,
      metalness: 1,
      envMapIntensity: 1.5,
      clearcoat: 0.3,
      clearcoatRoughness: 0.5,
    });
  }, [frameColor.color]);

  const woodMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: frameColor.color,
      ...woodTextures,
      roughness: 0.8,
      metalness: 0,
    });
  }, [frameColor.color, woodTextures]);

  const leatherMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: cushionColor.color,
      ...leatherTextures,
      roughness: 0.8,
      metalness: 0,
    });
  }, [cushionColor.color, leatherTextures]);

  const fabricMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: cushionColor.color,
      ...fabricTextures,
      metalness: 0,
      aoMapIntensity: 1,
    });
  }, [cushionColor.color, fabricTextures]);

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
      {/* Frame 1 - Metal */}
      <mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.frame_1.geometry}
        material={woodMaterial}
        visible={frame === 1} 
      />
      
      {/* Cushion */}
      <mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.cushion.geometry}
        material={material === 'leather' ? leatherMaterial : fabricMaterial}
      />
      
      {/* Frame 2 - Wood */}
      <mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.frame_2.geometry}
        material={metalMaterial}
        visible={frame === 2} 
      />
    </group>
  );
};

export default Chair;