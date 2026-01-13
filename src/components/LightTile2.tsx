import { useState, useEffect } from 'react';

function RoomTile2({ roomId, room, pulseDigital, navigate }) {
  const [digitalState, setDigitalState] = useState(false);

  useEffect(() => {
    const sub = window.CrComLib.subscribeState(
      'b',
      room.tilebtnon,
      setDigitalState
    );

    return () => {
      window.CrComLib.unsubscribeState('b', room.tilebtnon, sub);
    };
  }, [room.tilebtnon]);

  return (
    <div
      className="room-button" style={{ backgroundImage: `url(${room.image})` }}
      onClick={() => navigate(`/pages/test/${roomId}`)}
    >{room.label}
    <div className="room-controls" >
     
        <button
          className={`room-off-fb-low ${digitalState ? 'room-off-fb-high' : 'room-off-fb-low'}`}
          onClick={(e) => {
            e.stopPropagation();
            pulseDigital(room.tilebtnoff);
          }}
        />

        <button
          className={`room-on-fb-high ${digitalState ? 'room-on-fb-high' : 'room-on-fb-low'}`}
          onClick={(e) => {
            e.stopPropagation();
            pulseDigital(room.tilebtnon);
          }}
        />
      </div>
    </div>
  );
}

export default RoomTile2;
