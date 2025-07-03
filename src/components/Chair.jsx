import { useRef, useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

const assetPath = "https://aquaneon.github.io/chair-config/";

const Chair = (props) => {

  const groupRef = useRef()
  const { nodes, materials } = useGLTF(`${assetPath}geometry/chair.glb`)

  // TEXTURES
  // --- CORRECTED PATHS ---
  const leatherTextureProps = useTexture({
    map: `${assetPath}textures/leather/leather-color.jpg`,
    normalMap: `${assetPath}textures/leather/leather-normal.jpg`,
    roughnessMap: `${assetPath}textures/leather/leather-roughness-inverted.jpg`
  })

  // --- CORRECTED PATHS ---
  const fabricTextureProps = useTexture({
    map: `${assetPath}textures/fabric/Fabric036_1K-JPG_Color.jpg`,
    normalMap: `${assetPath}textures/fabric/Fabric036_1K-JPG_NormalGL.jpg`,
    aoMap: `${assetPath}textures/fabric/Fabric036_1K-JPG_AmbientOcclusion.jpg`,
    roughnessMap: `${assetPath}textures/fabric/Fabric036_1K-JPG_Roughness.jpg`,  
  })

fabricTextureProps.map.repeat.set(1,1);
fabricTextureProps.normalMap.repeat.set(1,1);
fabricTextureProps.aoMap.repeat.set(1,1);
fabricTextureProps.roughnessMap.repeat.set(1,1);

fabricTextureProps.map.wrapS = fabricTextureProps.map.wrapT =
fabricTextureProps.normalMap.wrapS = fabricTextureProps.normalMap.wrapT =
fabricTextureProps.aoMap.wrapS = fabricTextureProps.aoMap.wrapT =
fabricTextureProps.roughnessMap.wrapS = fabricTextureProps.roughnessMap.wrapT =
 THREE.RepeatWrapping;


    const woodTextureProps = useTexture({
    map: './textures/wood/Wood051_1K-JPG_Color.jpg',
    normalMap: './textures/wood/Wood051_1K-JPG_NormalGL.jpg',
    roughnessMap: './textures/wood/Wood051_1K-JPG_Roughness-inverted.jpg'
  })

woodTextureProps.map.repeat.set(1,1);
woodTextureProps.normalMap.repeat.set(1,1);
woodTextureProps.roughnessMap.repeat.set(1,1);
woodTextureProps.map.wrapS = woodTextureProps.map.wrapT =
woodTextureProps.normalMap.wrapS = woodTextureProps.normalMap.wrapT =
woodTextureProps.roughnessMap.wrapS = woodTextureProps.roughnessMap.wrapT =
 THREE.RepeatWrapping;

  useEffect(() => {
    groupRef.current.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, []) 

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh geometry={nodes.frame_1.geometry} material={materials.PALITO_WOOD} position={[0, 0, -0.015]}>
            <meshStandardMaterial {...woodTextureProps} />
      </mesh>
      <mesh geometry={nodes.cushion.geometry}>
        <meshStandardMaterial {...fabricTextureProps} />
      </mesh>
      <mesh geometry={nodes.frame_2.geometry} material={materials.PALITO_WOOD} position={[0, -0.008, 0.009]} visible={false} />
    </group>
  )
}

useGLTF.preload('./geometry/chair.glb')

export default Chair;