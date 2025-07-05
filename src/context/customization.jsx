import { createContext, useContext, useState } from 'react';


const frameColorOptions = [
  {
    color: "#1C1C1C",
    name: "midnight",
  },
  {
    color: "#2F1B14",
    name: "espresso",
  },
  {
    color: "#41424C",
    name: "graphite",
  },
  {
    color: "#F7E7CE",
    name: "champange",
  },
  {
    color: "#fefefe",
    name: "white",
  },
  {
    color: "#E8B4B8",
    name: "rose gold",
  },
  {
    color: "#8B4513",
    name: "cherry",
  },
];

const cushionColorOptions = [
    {
    color: "#f3f3f3",
    name: "white",
  },
    {
    color: "#F3CCCF",
    name: "powder",
  },
  {
    color: "#4E352C",
    name: "mocha",
  },
  {
    color: "#F5F5DC",
    name: "cream",
  },
  {
    color: "#C19A6B",
    name: "camel",
  },
  {
    color: "#41424C",
    name: "graphite",
  },

];

const CustomizationContext = createContext({});

export const CustomizationProvider = (props) => {
    const [material, setMaterial] = useState('leather');
    const [frame, setFrame] = useState(1);
    const [frameColor, setFrameColor] = useState(frameColorOptions[0]);
    const [cushionColor, setCushionColor] = useState(cushionColorOptions[0]);

    return <CustomizationContext.Provider 
        value=
            {{
            material,
            setMaterial,
            frame,
            setFrame,
            frameColor,
            frameColorOptions,
            setFrameColor,
            cushionColorOptions,
            cushionColor,
            setCushionColor
            }}>
        
        {props.children}</CustomizationContext.Provider>;
};

export const useCustomization = () => {
    const context = useContext(CustomizationContext);
    return context;
};