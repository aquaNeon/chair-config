import './App.css'
import Experience from './components/Experience.jsx'
import { Canvas } from '@react-three/fiber'

function App() {

  return (
      <div className="App">
        <Canvas 
          shadows 
          camera={{ position: [-3, 5, 4],  fov: 80 }}
        >
          <color attach="background" args={['#fefefe']} />
          <Experience />
        </Canvas>
      </div>
  )
}

export default App;
