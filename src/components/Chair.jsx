import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

const Chair = (props) => {

  const groupRef = useRef()
  const { nodes, materials } = useGLTF('./geometry/chair.glb')


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
      <mesh geometry={nodes.frame_1.geometry} material={materials.PALITO_WOOD} position={[0, 0, -0.015]} />
      <mesh geometry={nodes.cushion.geometry} material={materials['CH20_COUROl.001']} />
      <mesh geometry={nodes.frame_2.geometry} material={materials.PALITO_WOOD} position={[0, -0.008, 0.009]} />
    </group>
  )
}

useGLTF.preload('./geometry/chair.glb')

export default Chair;