import './App.css'
import Configurator from './components/Configurator.jsx';
import Experience from './components/Experience.jsx'
import { Canvas } from '@react-three/fiber'
import { CustomizationProvider } from './context/customization.jsx';
import { Suspense } from 'react';

function App() {

  return (
      <div className="App">
        <CustomizationProvider>
           <Suspense fallback={null}> 
            <Canvas 
              shadows 
            >
              <color attach="background" args={['#fefefe']} />
              <Experience />
            </Canvas>
            <Configurator />
          </Suspense>
        </CustomizationProvider>
      </div>
  )
}

export default App;
