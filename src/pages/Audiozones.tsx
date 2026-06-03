import { useEffect, useState } from 'react';
import Redselectbtn from '../components/redselectbtn';
import { useNavigate } from 'react-router-dom'; // allows page flipping to get proper feedback from control system
import HomeBtn from '../components/homebtn';
import Audiozones from '../components/audiozonestiles';
import {zonetiledata} from '../data/zonetiledata'
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

 // <button onClick={pulseDigital} className={`light-btn ${digitalState ? 'light-on' : 'light-off'}`}>
     //   power
   //   </button>


  return (
    <div className="page">
      <div className="header">
              <HomeBtn />
              <h1 className="title">Audio</h1>
            </div>
      
    
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
          <Redselectbtn
          label="SEARCH"
          targetPath="/pages/search"
          onClick={() => navigate('/pages/search')}
        />
      </div>
      <div className='zone-grid'>
      {zonetiledata.map(btn => ( //iterating through homeButtons array
             <Audiozones //parent component
               key={btn.id} // unique key prop for each button    
               label={btn.label}
               analogValue={btn.analogValue}
               mutejoin={btn.mutejoin}
               songName={btn.songName}
               imageurl={btn.imageurl} // bracket is being refrenced in the .ts file  the imageurl on the left side is the props
               pausejoin={btn.pausejoin}
               powerjoin={btn.powerjoin}
               arrowjoin={btn.arrowjoin}
               playera={btn.playera}
               playerb={btn.playerb}
               Tvrmtv={btn.Tvrmtv}
               basementtv={btn.basementtv}
               masterbedtv={btn.masterbedtv}
               gymrmtv={btn.gymrmtv}
             />
           ))}
     
     </div>
     
     

    </div>
  );
}

export default Audio;
