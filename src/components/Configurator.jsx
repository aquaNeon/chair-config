import { useEffect } from 'react';
import { useCustomization } from "../context/customization";

const Configurator = () => {
    const {material, setMaterial} = useCustomization();
    
    // Listen for Webflow button clicks
    useEffect(() => {
        const handleMaterialChange = (event) => {
            console.log('Received material change:', event.detail.material);
            setMaterial(event.detail.material);
        };
        
        // Listen for the custom event from Webflow
        document.addEventListener('change_material', handleMaterialChange);
        
        // Cleanup
        return () => {
            document.removeEventListener('change_material', handleMaterialChange);
        };
    }, [setMaterial]);
    
    console.log('current material:', material);
    
    return (
        <>
            {/* Keep your existing React buttons for local testing */}
            <button onClick={() => setMaterial('leather')}>
                Leather
            </button>
            <button onClick={() => setMaterial('fabric')}>
                Fabric
            </button>
        </>
    );
};

export default Configurator;


// import { useCustomization } from "../context/customization";

// const Configurator = () => {
    
//     const {material, setMaterial} = useCustomization();
//     console.log('matreial:', material);
    
//     return (
//     <div className="configurator">
       
//         <div className="item" onClick={() => setMaterial('leather')}>
//             <div className="item_label">Leather</div>
//         </div>
//         <div className="item" onClick={() => setMaterial('fabric')}>
//             <div className="item_label">Fabric</div>
//         </div>
//     </div>
        
        
// )}

// export default Configurator; 