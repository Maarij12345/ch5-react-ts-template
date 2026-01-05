import { useParams } from 'react-router-dom';
import { lightPopup } from '../data/lightpopup';
import Backbtn from '../components/backbtn';

function RoomTile() {
  const { roomId } = useParams<{ roomId: string }>();  // Give me the roomId part of the URL and store it in a variable called roomId.

  const room = roomId ? lightPopup[roomId] : null; // If roomId exists → Look up data in lightPopup using roomId as the key
//it is accessing the key of the lightPopup object from the roomid variable so for example if roomId is livingroom it will access lightPopup['livingroom']


   const pulseDigital = (join: string) => {
    window.CrComLib.publishEvent('b', join, true);
    console.log('PULSE digital', join);
    setTimeout(() => {
      window.CrComLib.publishEvent('b', join, false);
    }, 100);
  };

if (!room) {
    return <p>Room not found</p>;
  }
  return (
   
    <div className="room-tile">
         <Backbtn />
      {/*<button>{room.label}</button> */}
      <h2 className='roomtitle'>{roomId}</h2>

      {room.lights.map((light, index) => ( // the first parameter is the value, the second is the index
        <>
        <h3 key={light}>{light}</h3>
       <button onClick={() => pulseDigital(room.onsig[index])}>On</button>
       <button onClick={() => pulseDigital(room.offsig[index])}>Off</button>
       
      </>
      ))}
    </div>
  );
}

export default RoomTile;
