import { useMemo, useEffect } from 'react'; // Import useMemo for optimization
import { useGLTF, useTexture } from '@react-three/drei';
import { useCustomization } from '../context/customization'; // <-- Step 1: Import the context hook
import * as THREE from 'three';

// Define the public URL where your assets are actually hosted.
const assetPath = "https://aquaneon.github.io/chair-config/";

const Chair = (props) => {
  // --- Step 2: Get the current material state from the context ---
  const { material } = useCustomization();

  // Load the GLB model. This will be caught by the <Suspense> boundary.
  const { nodes } = useGLTF(`${assetPath}geometry/chair.glb`);

  // --- Step 3: Optimize and clean up texture loading ---
  // We wrap texture loading in useMemo so it only runs once per set, not on every render.
  
  const leatherTextures = useMemo(() => {
    const textures = useTexture({
      map: `${assetPath}textures/leather/leather-color.jpg`,
      normalMap: `${assetPath}textures/leather/leather-normal.jpg`,
      roughnessMap: `${assetPath}textures/leather/leather-roughness-inverted.jpg`
    });
    // This is a cleaner way to apply settings to all textures in the set.
    for (const texture of Object.values(textures)) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }
    return textures;
  }, []);

  const fabricTextures = useMemo(() => {
    const textures = useTexture({
      map: `${assetPath}textures/fabric/Fabric036_1K-JPG_Color.jpg`,
      normalMap: `${assetPath}textures/fabric/Fabric036_1K-JPG_NormalGL.jpg`,
      aoMap: `${assetPath}textures/fabric/Fabric036_1K-JPG_AmbientOcclusion.jpg`,
      roughnessMap: `${assetPath}textures/fabric/Fabric036_1K-JPG_Roughness.jpg`,  
    });
    for (const texture of Object.values(textures)) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2); // Let's tile this fabric a bit more for detail
      }
    return textures;
  }, []);

  const woodTextures = useMemo(() => {
    const textures = useTexture({
      // --- FIX: Corrected path to use the assetPath variable ---
      map: `${assetPath}textures/wood/Wood051_1K-JPG_Color.jpg`,
      normalMap: `${assetPath}textures/wood/Wood051_1K-JPG_NormalGL.jpg`,
      roughnessMap: `${assetPath}textures/wood/Wood051_1K-JPG_Roughness-inverted.jpg`
    });
    for (const texture of Object.values(textures)) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    return textures;
  }, []);

  // This side effect is still needed to enable the AO map on the fabric
  useEffect(() => {
    if (nodes.cushion.geometry) {
      nodes.cushion.geometry.setAttribute('uv2', new THREE.BufferAttribute(nodes.cushion.geometry.attributes.uv.array, 2));
    }
  }, [nodes.cushion.geometry]);

  // --- Step 4: Use declarative rendering for shadows and materials ---
  // We remove the old groupRef and useEffect for shadows.
  return (
    <group {...props} dispose={null}>
      <mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.frame_1.geometry} 
        position={[0, 0, -0.015]}
      >
        <meshStandardMaterial {...woodTextures} />
      </mesh>
      
      <mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.cushion.geometry}
      >
        {/* --- This is the core logic for the configurator --- */}
        {/* It conditionally renders the correct material based on the context state. */}
        {material === 'leather' && <meshStandardMaterial {...leatherTextures} />}
        {material === 'fabric' && <meshStandardMaterial {...fabricTextures} aoMapIntensity={1} />}
      </mesh>
      
      <mesh 
        geometry={nodes.frame_2.geometry} 
        material={nodes.frame_2.material} // Assuming a default material
        position={[0, -0.008, 0.009]} 
        visible={false} 
      />
    </group>
  );
};

// --- Step 5: VERY IMPORTANT - Remove all preload calls ---
// The preload call below was a likely source of the crash.
// useGLTF.preload(`${assetPath}geometry/chair.glb`); <-- DELETED

export default Chair;