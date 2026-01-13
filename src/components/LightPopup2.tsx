import { useParams } from 'react-router-dom';

import { lightPopup2 } from '../data/lightpopupsecondrow';
import Backbtn from './backbtn';
import { useState, useEffect } from 'react';

function RoomTile2() {
  const { roomId } = useParams<{ roomId: string }>();
  const room = roomId ? lightPopup2[roomId] : null;

  if (!room) {
    return <p>Room not found hi</p>;
  }

  // feedback state PER LIGHT (index-based)
  const [feedback, setFeedback] = useState<Record<number, boolean>>({});

  // pulse digital join
  const pulseDigital = (join: string) => {
    console.log('PULSE digital', join);
    window.CrComLib.publishEvent('b', join, true);
    setTimeout(() => {
      window.CrComLib.publishEvent('b', join, false);
    }, 100);
  };

  // subscribe to feedback joins
  useEffect(() => {
    const subscriptionIds: number[] = [];

    room.onsig.forEach((join, index) => {
      const subId = window.CrComLib.subscribeState(
        'b',
        join,
        (value: boolean) => {
          setFeedback(prev => ({
            ...prev,
            [index]: value,
          }));
        }
      );

      subscriptionIds.push(subId);
    });

    return () => {
      room.onsig.forEach((join, index) => {
        window.CrComLib.unsubscribeState('b', join, subscriptionIds[index]);
      });
    };
  }, [room]);
  

  return (
   
    <div className="room-tile">
  <div className='header'>
      <Backbtn />
      <h1 className="title">{roomId}</h1>
</div>

      {room.lights.map((light, index) => {
        const isOn = feedback[index] ?? false;
        console.log("this is a test" + isOn);
        return (
          <div key={light} >
            <h2>{light}</h2>
            <div className="light-row">
            <button
              className={`offlightbtn ${isOn ? 'offlightoff' : 'offlighton'}`}
              onClick={() => pulseDigital(room.offsig[index])}>
            
            </button>

            <button
              className={`light-btn ${isOn ? 'light-on' : 'light-off'}`}
              onClick={() => pulseDigital(room.onsig[index])}>
             
            </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RoomTile2;
//   <img src={isOn ? '/src/assets/images/blackcrossedlight.svg' : '/src/assets/images/whitecrossedlight.svg'} alt="" />
//  <img src={isOn ? '/src/assets/images/light.svg' : '/src/assets/images/blacklight.svg'} alt="" />