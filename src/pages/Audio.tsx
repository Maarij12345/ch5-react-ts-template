import { useEffect, useState } from 'react';

import Backbtn from '../components/backbtn';
function Audio() {
    const [digitalState, setDigitalState] = useState(false);

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
     
     
    </div>
  );
}

export default Audio;
