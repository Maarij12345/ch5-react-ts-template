import { useState, useEffect } from 'react';
import Backbtn from '../components/backbtn';
import Redselectbtn from '../components/redselectbtn';  
import { useNavigate } from 'react-router-dom'; // allows page flipping to get proper feedback from control system


function Lights() {
  const [digitalState, setDigitalState] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Subscribe to Digital Join 1 (feedback)
    const d1Id = window.CrComLib.subscribeState(
      'b',
      '1',
      (value: boolean) => {
        console.log('Feedback digital 1 =', value);
        setDigitalState(value);
      }
    );

    // Cleanup on unmount
    return () => {
      window.CrComLib.unsubscribeState('b', '1', d1Id);
    };
  }, []);

  // Pulse Digital Join 1 (for SIMPL pulse logic)
  const pulseDigital = () => {
    console.log('PULSE digital 1');
    window.CrComLib.publishEvent('b', '1', true);
    setTimeout(() => {
      window.CrComLib.publishEvent('b', '1', false);
    }, 100);
  };

  return (
    <div className="page">
  <div className="header">
    <Backbtn />
    <h1 className="title">Lights</h1>
  </div>
   <div className="selection-container">
   <Redselectbtn
    label="ROOMS"
    targetPath="/pages/lights"
    onClick={() => navigate('/pages/lights')}
  />
  
  <Redselectbtn
    label="SCENES"
    targetPath="/pages/scenes"
    onClick={() => navigate('/pages/scenes')}
  />
</div>
</div>

  );
}

export default Lights;
