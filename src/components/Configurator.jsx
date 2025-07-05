
import { useEffect } from 'react';
import { useCustomization } from "../context/customization";

// Bridge
const Configurator = () => {
    const {
        setMaterial,
        setFrame,
        setFrameColor,
        frameColorOptions,
        setCushionColor,
        cushionColorOptions
    } = useCustomization();
    
    useEffect(() => {
        // --- 1. Handler and Listener for MATERIAL change ---
        const handleMaterialChange = (event) => {
            console.log('Received material change:', event.detail.material);
            setMaterial(event.detail.material);
        };
        document.addEventListener('change_material', handleMaterialChange);

        // --- 2. Handler and Listener for FRAME change ---
        const handleFrameChange = (event) => {
            // We expect the value to be a number (1 or 2)
            const frameValue = parseInt(event.detail.frame, 10);
            console.log('Received frame change:', frameValue);
            setFrame(frameValue);
        };
        document.addEventListener('change_frame', handleFrameChange);

        // --- 3. Handler and Listener for FRAME COLOR change ---
        const handleFrameColorChange = (event) => {
            const colorName = event.detail.frameColorName;
            console.log('Received frame color change:', colorName);
            const selectedColor = frameColorOptions.find(opt => opt.name === colorName);
            if (selectedColor) {
                setFrameColor(selectedColor);
            } else {
                console.warn(`Frame color named '${colorName}' was not found.`);
            }
        };
        document.addEventListener('change_frame_color', handleFrameColorChange);
        
        // --- 4. Handler and Listener for CUSHION COLOR change ---
        const handleCushionColorChange = (event) => {
            const colorName = event.detail.cushionColorName;
            console.log('Received cushion color change:', colorName);
            const selectedColor = cushionColorOptions.find(opt => opt.name === colorName);
            if (selectedColor) {
                setCushionColor(selectedColor);
            } else {
                console.warn(`Cushion color named '${colorName}' was not found.`);
            }
        };
        document.addEventListener('change_cushion_color', handleCushionColorChange);

        // Cleanup
        return () => {
            document.removeEventListener('change_material', handleMaterialChange);
            document.removeEventListener('change_frame', handleFrameChange);
            document.removeEventListener('change_frame_color', handleFrameColorChange);
            document.removeEventListener('change_cushion_color', handleCushionColorChange);
        };
    }, [setMaterial, setFrame, setFrameColor, frameColorOptions, setCushionColor, cushionColorOptions]);
    
    return null;
};

export default Configurator;


// FIRST WEBFLOW VERSION
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




// WOKRING LOCALLY 
// import { useCustomization } from "../context/customization";

// const Configurator = () => {
    
//     const {
//         material, 
//         setMaterial, 
//         frame, 
//         setFrame, 
//         frameColor, 
//         setFrameColor, 
//         frameColorOptions,  
//         cushionColor, 
//         cushionColorOptions, 
//         setCushionColor
//     } = useCustomization();
    
//     console.log('matreial:', material);
    
//     return (
//     <div className="configurator">
//        <div className="UI-container">
//             <div className="UI-content">
//                 <div className="item-header">Material</div>
//                 <div className="item-wrapper">
//                     <div className="item" onClick={() => setMaterial('leather')}>
//                         <div className="item_label">Leather</div>
//                     </div>
//                     <div className="item" onClick={() => setMaterial('fabric')}>
//                         <div className="item_label">Fabric</div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <div className="UI-container">
//             <div className="UI-content">
//                 <div className="item-header">Frame</div>
//                 <div className="item-wrapper">
//                     <div className="item" onClick={() => setFrame(1)}>
//                         <div className="item_label">Timeless</div>
//                     </div>
//                     <div className="item" onClick={() => setFrame(2)}>
//                         <div className="item_label">Modern</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//             <div className="UI-container">
//                 <div className="UI-content">
//                     <div className="item-header">Frame Colors</div>
//                     <div className="item-wrapper">
//                         {frameColorOptions.map((item, index) => (
//                         <div key={index} className="item" onClick={() => setFrameColor(item)}>
//                             <div className="item_view" style={{
//                                 backgroundColor: item.color,
//                                 height: '24px',
//                                 width: '24px',
//                             }}></div>
//                             <div className="item_label">{item.name}</div>
//                         </div>
//                         ))
//                         }
//                     </div>
//                 </div>
//             </div>

//             <div className="UI-container">
//                 <div className="UI-content">
//                     <div className="item-header">Cushion Colors</div>
//                     <div className="item-wrapper">
//                         {cushionColorOptions.map((item, index) => (
//                         <div key={index} className="item" onClick={() => setCushionColor(item)}>
//                             <div className="item_view" style={{
//                                 backgroundColor: item.color,
//                                 height: '24px',
//                                 width: '24px',
//                             }}></div>
//                             <div className="item_label">{item.name}</div>
//                         </div>
//                         ))
//                         }
//                     </div>
//                 </div>
//             </div>

//     </div>
        
        
// )}

// export default Configurator; 