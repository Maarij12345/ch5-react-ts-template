import { useState, useEffect } from 'react';



type AudioZoneProps = {
  label: string;
  mutejoin: string;
  analogValue: string;
  songName: string;
  imageurl: string;
};
/*
const pulseDigital = (join: string) => {
  console.log('PULSE digital', join);
  window.CrComLib.publishEvent('b', join, true);
  setTimeout(() => {
    window.CrComLib.publishEvent('b', join, false);
  }, 100);
};
*/
function Audiozones({ label, mutejoin, analogValue, songName, imageurl}: AudioZoneProps) {
  // ✅ hooks MUST be inside component
  const [digitalState, setDigitalState] = useState(false);
  const [analogState, setAnalogState] = useState(0);
  const [serialState, setSerialState] = useState('');
  const [imageurlserial, setImageurlserial] = useState('');

  useEffect(() => {

    const d1Id = window.CrComLib.subscribeState('b', mutejoin, (value: boolean) =>
      setDigitalState(value)
    
    
    
    );
    
    const a1Id = window.CrComLib.subscribeState('n', analogValue, (value: number) =>
      setAnalogState(value)
    );
    

    const s1Id = window.CrComLib.subscribeState('s', songName, (value: string) =>
      setSerialState(value)
    );
    const s2Id = window.CrComLib.subscribeState('s', imageurl, (value: string) =>
      setImageurlserial(value)
    );

    return () => {
      window.CrComLib.unsubscribeState('b', mutejoin, d1Id);
      window.CrComLib.unsubscribeState('n', analogValue, a1Id);
      window.CrComLib.unsubscribeState('s', songName, s1Id);
      window.CrComLib.unsubscribeState('s', imageurl, s2Id);
    };
  }, []);

  const sendAnalog = (value: number) =>
    window.CrComLib.publishEvent('n', analogValue, value);

 const toggleDigital = (value: boolean) =>{
    window.CrComLib.publishEvent('b', mutejoin, true);
    setTimeout(() => {
      window.CrComLib.publishEvent('b', mutejoin, false);
    }, 100);
}

const min = 0;
const max = 65535;
const percent = ((analogState - min) / (max - min)) * 100;

  return (
    <div className="zone">
      <p className="roomname">{label}</p>

     <span id="muteicon"className= "material-symbols-outlined" onClick={() => { toggleDigital(!digitalState);}}>  {digitalState ? 'volume_off' : 'volume_up'}</span>

       <input type="range" min={min} max={max} value={analogState} onChange={(e) => { sendAnalog(Number(e.target.value))} }
  className="analogSlider" style={{ background: `linear-gradient(to right, #0895e7 0%, #e70808ff ${percent}%, #d3d3d3 ${percent}%, #d3d3d3 100%)`,
  }}
  id='analogSlider'
 
/>
<p className='songname'>{serialState}</p>

<img src={imageurlserial} alt="" className='urlimage'/>

  
    </div>
  );
}

export default Audiozones;
