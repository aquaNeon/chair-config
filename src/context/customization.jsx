import { createContext, useContext, useState } from 'react';

const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
    const [material, setMaterial] = useState('leather');
    const [frame, setFrame] = useState(1);
    return <CustomizationContext.Provider 
        value=
            {{
            material,
            setMaterial,
            frame,
            setFrame
            }}>
        
        {props.children}</CustomizationContext.Provider>;
};

export const useCustomization = () => {
    const context = useContext(CustomizationContext);
    return context;
};