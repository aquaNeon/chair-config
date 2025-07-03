import { useCustomization } from "../context/customization";

const Configurator = () => {
    
    const {material, setMaterial} = useCustomization();
    console.log('matreial:', material);
    
    return (
    <div className="configurator">
       
        <div className="item" onClick={() => setMaterial('leather')}>
            <div className="item_label">Leather</div>
        </div>
        <div className="item" onClick={() => setMaterial('fabric')}>
            <div className="item_label">Fabric</div>
        </div>
    </div>
        
        
)}

export default Configurator; 