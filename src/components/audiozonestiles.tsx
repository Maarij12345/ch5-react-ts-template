import { useState, useEffect } from 'react';



type AudioZoneProps = {
  label: string;
  mutejoin: string;
  pausejoin: string;
  analogValue: string;
  songName: string;
  imageurl: string;
  powerjoin: string;
  
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
function Audiozones({ label, mutejoin, analogValue, songName, imageurl, pausejoin, powerjoin}: AudioZoneProps) {
  // ✅ hooks MUST be inside component
  const [digitalState, setDigitalState] = useState(false);
  const [pauseState, setPausestate] = useState(false);
  const [powerState, setpowerState] = useState(false);
  const [analogState, setAnalogState] = useState(0);
  const [serialState, setSerialState] = useState('');
  const [imageurlserial, setImageurlserial] = useState('');

  useEffect(() => {

    const d1Id = window.CrComLib.subscribeState('b', mutejoin, (value: boolean) =>
      setDigitalState(value)
    );
    const d2Id = window.CrComLib.subscribeState('b', pausejoin, (value: boolean) =>
      setPausestate(value)
    );
     const d3Id = window.CrComLib.subscribeState('b', powerjoin, (value: boolean) =>
      setpowerState(value)
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
      window.CrComLib.unsubscribeState('b', pausejoin, d2Id);
      window.CrComLib.unsubscribeState('b', powerjoin, d3Id);
      window.CrComLib.unsubscribeState('n', analogValue, a1Id);
      window.CrComLib.unsubscribeState('s', songName, s1Id);
      window.CrComLib.unsubscribeState('s', imageurl, s2Id);
      
    };
  }, []);

  const sendAnalog = (value: number) =>
    window.CrComLib.publishEvent('n', analogValue, value);
 const togglepause = (value:boolean)=>{
    window.CrComLib.publishEvent('b', pausejoin, true);
    setTimeout(() => {
      window.CrComLib.publishEvent('b', pausejoin, false);
    }, 100);
 }
 const togglepower = (value:boolean)=>{
    window.CrComLib.publishEvent('b', powerjoin, true);
    setTimeout(() => {
      window.CrComLib.publishEvent('b', powerjoin, false);
    }, 100);
 }
 const toggleDigital = (value: boolean) =>{
    window.CrComLib.publishEvent('b', mutejoin, true);
    setTimeout(() => {
      window.CrComLib.publishEvent('b', mutejoin, false);
    }, 100);
}
//0895e7 - color i like
const min = 0;
const max = 65535;
const percent = ((analogState - min) / (max - min)) * 100;



  return (
    <div className="zone">
      <p className="roomname">{label}</p>

     <span id="arrowicon"className= "material-symbols-outlined" onClick={() => { toggleDigital(!digitalState);}}>  {digitalState ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</span>
     <span id="muteicon"className= "material-symbols-outlined" onClick={() => { toggleDigital(!digitalState);}}>  {digitalState ? 'volume_off' : 'volume_up'}</span>
     <span id="pause" className="material-symbols-outlined" onClick={() => { togglepause(!pauseState);}}>  {pauseState ? 'play_arrow' : 'pause'}</span>
    <span id="skip_next" className="material-symbols-outlined">skip_next</span>
    <span id="skip_previous" className="material-symbols-outlined">skip_previous</span>
       <input type="range" min={min} max={max} value={analogState} onChange={(e) => { sendAnalog(Number(e.target.value))} }
  className="analogSlider" style={{ background: `linear-gradient(to right, #000000ff 0%, #000000ff ${percent}%, #ffffffff ${percent}%, #d3d3d3 100%)`,
  }}
  id='analogSlider'/>
  <span id={powerState ? 'redpower' : 'whitepower'} className="material-symbols-outlined" onClick={() => { togglepower(!powerState);}}>power_settings_new</span>
<p className='songname'>{serialState}hi</p>

<img src={imageurlserial} alt="" className='urlimage'/>

  
    </div>
  );
}

export default Audiozones;
