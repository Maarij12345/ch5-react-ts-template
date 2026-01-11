import { useState, useEffect } from 'react';
import HomeBtn from '../components/homebtn';
import Redselectbtn from '../components/redselectbtn';
import { lightPopup, RoomConfig } from '../data/lightpopup';
import { useNavigate } from 'react-router-dom'; // allows page flipping to get proper feedback from control system


function Lights() {



  const navigate = useNavigate();
function RoomTile({ roomId, room }: { roomId: string; room: RoomConfig }) {
  const [digitalState, setDigitalState] = useState(false);

  useEffect(() => {
    const d1Id = window.CrComLib.subscribeState(
      'b',
      room.tilebtnon,
      (value: boolean) => {
        setDigitalState(value);
      }
    );

    return () => {
      window.CrComLib.unsubscribeState('b', room.tilebtnon, d1Id);
    };
  }, [room.tilebtnon]);
}
  // Pulse Digital Join 1 (for SIMPL pulse logic)
  const pulseDigital = (join: string) => {
    
    window.CrComLib.publishEvent('b', join, true);
    console.log("pulse join" + join);
    setTimeout(() => {
      window.CrComLib.publishEvent('b', join, false);
      
    }, 100);
  };




  

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
      <div className='button-row'>
     {Object.entries(lightPopup).map(([roomId, room]) => ( // room lets us access each room config in lightPopup
  <div className="room-button" key={roomId} onClick={() => navigate(`/pages/LightTile/${roomId}`)}>
    {room.label}
    <button className="room-on" onClick={(event) => { event.stopPropagation(); pulseDigital(room.tilebtnon); } }></button>

    <button className="room-off"onClick={(event) => { event.stopPropagation(); pulseDigital(room.tilebtnoff);  } }></button>

  </div>
))}
</div>
      
    </div>
  );
}

export default Lights;
