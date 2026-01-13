// Uncomment the below line if you are using CH5 components.
// import '@crestron/ch5-theme/output/themes/light-theme.css' // Crestron CSS. @crestron/ch5-theme/output/themes shows the other themes that can be used.
import { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import useWebXPanel from './hooks/useWebXPanel';
import './pages/css/lightsubpage.css' // Your CSS
import './pages/css/App.css' // Your CSS
import './pages/css/Lights.css'
import Lights from './pages/Lights';
import Audio from './pages/Audio';
import Home from './pages/Home';
import Zones from './pages/zones';
import Scenes from './pages/Scenes';
import RoomTile from './components/LightPopup';
import RoomTile2 from './components/LightPopup2'
import RoomTile3 from './components/LightPopup3'


// Initialize eruda for panel/app debugging capabilities (in dev mode only)
if (import.meta.env.VITE_APP_ENV === 'development') {
  import('eruda').then(({ default: eruda }) => {
    eruda.init();
  });
}

function App() {


  const webXPanelConfig = useMemo(() => ({
    ipId: '0x03',
    host: '0.0.0.0',
    roomId: '',
    authToken: ''
  }), []);

  useWebXPanel(webXPanelConfig);

  return (
    <>
      {/* NAVIGATION BUTTONS (Crestron-style page flips) */}


      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/lights" element={<Lights />} />
        <Route path="/pages/audio" element={<Audio />} />
        <Route path="/pages/zones" element={<Zones />} />
        <Route path="/pages/scenes" element={<Scenes />} />
        <Route path="/pages/LightTile/:roomId" element={<RoomTile />} />
         <Route path="/pages/test/:roomId" element={<RoomTile2 />} />
         <Route path="/pages/lightrow3/:roomId" element={<RoomTile3 />} />
   

      </Routes>
    </>
  );
}

export default App;
