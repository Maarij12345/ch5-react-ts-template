import { useNavigate } from 'react-router-dom';
import HomeBtn from '../components/homebtn';
import Redselectbtn from '../components/redselectbtn';
import { lightPopup } from '../data/lightpopup';
import { lightPopup2 } from '../data/lightpopupsecondrow'
import { lightPopup3 } from '../data/lightpopupthirdrow'
import RoomTile from '../components/LightTile';
import RoomTile2 from '../components/LightTile2';
import RoomTile3 from '../components/LightTile3';



function Lights() {
  const navigate = useNavigate();

  const pulseDigital = (join: string) => {
    window.CrComLib.publishEvent('b', join, true);
    console.log('PULSE digital', join);
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

      <div className="button-row">
        {Object.entries(lightPopup).map(([roomId, room]) => (
          <RoomTile
            key={roomId}
            roomId={roomId}
            room={room}
            pulseDigital={pulseDigital}
            navigate={navigate}
          />
        ))}
      </div>
       <h2>Second Floor</h2>


         <div className="button-row">
        {Object.entries(lightPopup2).map(([roomId, room]) => (
          <RoomTile2
            key={roomId}
            roomId={roomId}
            room={room}
            pulseDigital={pulseDigital}
            navigate={navigate}
          />
        ))}
        
      </div>
        <h2>Basement</h2>
          <div className="button-row">
        {Object.entries(lightPopup3).map(([roomId, room]) => (
          <RoomTile3
            key={roomId}
            roomId={roomId}
            room={room}
            pulseDigital={pulseDigital}
            navigate={navigate}
          />
        ))}
        
      </div>


      
    </div>
  );
}

export default Lights;
