import { useEffect, useState } from 'react';
import Redselectbtn from '../components/redselectbtn';  
import { useNavigate } from 'react-router-dom'; // allows page flipping to get proper feedback from control system
import Backbtn from '../components/backbtn';

function Audio() {
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
    <Backbtn />
      <h1>Audio Page</h1>
 <button onClick={pulseDigital} className={`light-btn ${digitalState ? 'light-on' : 'light-off'}`}>
        power
      </button>
      <div className="selection-container">
   <Redselectbtn
  label="ZONES"
  targetPath="/pages/audio"
  onClick={() => navigate('/pages/audio')}
/>

<Redselectbtn
  label="GROUPS"
  targetPath="/pages/zones"
  onClick={() => navigate('/pages/zones')}
/>
</div>
    </div>
  );
}

export default Audio;
