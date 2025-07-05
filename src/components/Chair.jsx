import { useEffect, useMemo } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useCustomization } from '../context/customization';
import * as THREE from 'three';

const assetPath = "https://aquaneon.github.io/chair-config/";

const Chair = (props) => {
  const { material, frame, frameColor, cushionColor } = useCustomization();
  const { nodes } = useGLTF(`${assetPath}geometry/chair.glb`);

  // const leatherTextures = useTexture({
  //   map: `${assetPath}textures/leather/leather-color.jpg`,
  //   normalMap: `${assetPath}textures/leather/leather-normal.jpg`,
  //   roughnessMap: `${assetPath}textures/leather/leather-roughness-inverted.jpg`
  // });

    const leatherTextures = useTexture({
    map: './textures/leather/leather_al.jpg',
    normalMap: './textures/leather/leather_n.jpg',
    roughnessMap: './textures/leather/leather_r2.jpg'
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

  // Create materials with useMemo to avoid recreating them on every render
  const metalMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: frameColor.color,
      roughness: 0.1,
      metalness: 1,
      envMapIntensity: 1.5,
      clearcoat: 0.3,
      clearcoatRoughness: 0.1,
    });
  }, [frameColor.color]);

  const woodMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      map: woodTextures.map,
      normalMap: woodTextures.normalMap,
      roughnessMap: woodTextures.roughnessMap,
      roughness: 0.8,
      metalness: 0,
    });
    
    // Create a more subtle color blend - this acts like a wood stain
    const stainColor = new THREE.Color(frameColor.color);
    // Make the stain less intense so wood grain shows through
    stainColor.multiplyScalar(2); 
    material.color.copy(stainColor);
    
    return material;
  }, [frameColor.color, woodTextures]);

  const leatherMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      ...leatherTextures,
      roughness: 0.8,
      metalness: 0,
    });
    
    // Mix the leather texture with the selected color
    material.color.copy(new THREE.Color(cushionColor.color));
    
    return material;
  }, [cushionColor.color, leatherTextures]);

  const fabricMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      ...fabricTextures,
      roughness: 0.9,
      metalness: 0,
      aoMapIntensity: 1,
    });
    
    // Mix the fabric texture with the selected color
    material.color.copy(new THREE.Color(cushionColor.color));
    
    return material;
  }, [cushionColor.color, fabricTextures]);

  useEffect(() => {
    for (const texture of Object.values(fabricTextures)) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(0.3, 0.3);
      texture.needsUpdate = true;
    }
    for (const texture of Object.values(woodTextures)) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.needsUpdate = true;
    }
    for (const texture of Object.values(leatherTextures)) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(0.35, 0.35);
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
        material={woodMaterial}
        visible={frame === 1} 
      />
      
      <mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.cushion.geometry}
        material={material === 'leather' ? leatherMaterial : fabricMaterial}
      />
      
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