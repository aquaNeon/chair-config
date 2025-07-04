// import { useEffect } from 'react';
// import { useCustomization } from "../context/customization";

// const Configurator = () => {
//     const {material, setMaterial} = useCustomization();
    
//     // Listen for Webflow button clicks
//     useEffect(() => {
//         const handleMaterialChange = (event) => {
//             console.log('Received material change:', event.detail.material);
//             setMaterial(event.detail.material);
//         };
        
//         // Listen for the custom event from Webflow
//         document.addEventListener('change_material', handleMaterialChange);
        
//         // Cleanup
//         return () => {
//             document.removeEventListener('change_material', handleMaterialChange);
//         };
//     }, [setMaterial]);
    
//     console.log('current material:', material);
    
//     return (
//         <>
//             <button onClick={() => setMaterial('leather')}>
//                 Leather
//             </button>
//             <button onClick={() => setMaterial('fabric')}>
//                 Fabric
//             </button>
//         </>
//     );
// };

// export default Configurator;





import { useCustomization } from "../context/customization";

const Configurator = () => {
    
    const {material, setMaterial, frame, setFrame} = useCustomization();
    console.log('matreial:', material);
    
    return (
    <div className="configurator">
       <div className="UI-container">
            <div className="UI-content">
                <div className="item-header">Material</div>
                <div className="item-wrapper">
                    <div className="item" onClick={() => setMaterial('leather')}>
                        <div className="item_label">Leather</div>
                    </div>
                    <div className="item" onClick={() => setMaterial('fabric')}>
                        <div className="item_label">Fabric</div>
                    </div>
                </div>
            </div>
        </div>

        <div className="UI-container">
            <div className="UI-content">
                <div className="item-header">Frame</div>
                <div className="item-wrapper">
                    <div className="item" onClick={() => setFrame(1)}>
                        <div className="item_label">Timeless</div>
                    </div>
                    <div className="item" onClick={() => setFrame(2)}>
                        <div className="item_label">Modern</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
        
        
)}

export default Configurator; 