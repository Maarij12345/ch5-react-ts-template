import { useState, useEffect } from 'react';
import HomeBtn from '../components/homebtn';
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




  const room = [
    { id: 'livingroom', name: 'Living Room' },
    { id: 'kitchen', name: 'Kitchen' },
    { id: 'bedroom', name: 'Bedroom' },
  ];


  return (
    <div className="page">
      <div className="header">
        <HomeBtn />
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
          onClick={() => navigate('/pages/scenes')} />
      </div>



      <h2>First Floor</h2>
      {room.map(room => (
        <button
          key={room.id}
          onClick={() => navigate(`/pages/LightTile/${room.id}`)}
        >
          {room.name}
        </button>
      ))}
    </div>
  );
}

export default Lights;
