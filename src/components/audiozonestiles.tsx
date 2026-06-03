import { useState, useEffect } from 'react';
import keyboardarrowup from '../assets/images/keyboard-arrow-up.svg';
import keyboardarrowdown from '../assets/images/keyboard-arrow-down.svg';
import volumeup from '../assets/images/volume_up.svg';
import volumeoff from '../assets/images/volume_off.svg';
const PowerSVG = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className={className} fill="currentColor" aria-hidden="true">
    <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-84 31.5-156.5T197-763l56 56q-44 44-68.5 102T160-480q0 134 93 227t227 93q134 0 227-93t93-227q0-67-24.5-125T707-707l56-56q54 54 85.5 126.5T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-360v-440h80v440h-80Z"/>
  </svg>
);
type AudioZoneProps = {
  label: string;
  mutejoin: string;
  pausejoin: string;
  analogValue: string;
  songName: string;
  imageurl: string;
  powerjoin: string;
  arrowjoin: string;
  playera: string;
  playerb: string;
  Tvrmtv: string;
  basementtv: string;
  masterbedtv: string;
  gymrmtv: string;
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
function Audiozones({label, mutejoin, analogValue, songName, imageurl, pausejoin, powerjoin, arrowjoin, playera, playerb, Tvrmtv, basementtv, masterbedtv, gymrmtv}: AudioZoneProps) {
  // ✅ hooks MUST be inside component
  const [digitalState, setDigitalState] = useState(false); //mute
  const [arrowState, setArrowState] = useState(false);
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
    const d4Id = window.CrComLib.subscribeState('b', arrowjoin, (value: boolean) =>
      setArrowState(value)
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
      window.CrComLib.unsubscribeState('b', arrowjoin, d4Id);
      window.CrComLib.unsubscribeState('n', analogValue, a1Id);
      window.CrComLib.unsubscribeState('s', songName, s1Id);
      window.CrComLib.unsubscribeState('s', imageurl, s2Id);
      
    };
  }, []);

  const sendAnalog = (value: number) =>
    window.CrComLib.publishEvent('n', analogValue, value);
 
const pulseSource = (value: string) => {
   window.CrComLib.publishEvent('b', value, true);
   console.log(value)
    setTimeout(() => {
      window.CrComLib.publishEvent('b', value, false);
    }, 100);
}

//0895e7 - color i like
const min = 0;
const max = 65535;
const percent = ((analogState - min) / (max - min)) * 100;



  return (
    <div className="zone">
      <p className="roomname">{label}</p>
      <div className={arrowState ? 'popup' : 'popup-hidden'}id="popup">
        <p className="sourcelisttext" onClick={() => { pulseSource(playera);}}>Player A</p>
        <p className="sourcelisttext" onClick={() => { pulseSource(playerb);}}>Player B</p>
        <p className="sourcelisttext" onClick={() => { pulseSource(Tvrmtv);}}>Tv Room TV</p>
        <p className="sourcelisttext" onClick={() => { pulseSource(basementtv);}}>Basement TV</p>
        <p className="sourcelisttext" onClick={() => { pulseSource(gymrmtv);}}>Gym Room TV</p>
        <p className="sourcelisttext" onClick={() => { pulseSource(masterbedtv);}}>MasterBed TV</p>
    </div>
      
     
<span id="arrowicon" onClick={() => { pulseSource(arrowjoin); }}>
  <img src={arrowState ? keyboardarrowup : keyboardarrowdown} alt="arrow" className='arrowbtn'/>
</span>
     <span onClick={() => { pulseSource(mutejoin);}}> <img src={digitalState ? volumeoff : volumeup} alt="mute" className='volume'/></span>


     <span id="pause" className="material-symbols-outlined" onClick={() => { pulseSource(pausejoin);}}>  {pauseState ? 'play_arrow' : 'pause'}</span>
    <span id="skip_next" className="material-symbols-outlined">skip_next</span>
    <span id="skip_previous" className="material-symbols-outlined">skip_previous</span>
       <input type="range" min={min} max={max} value={analogState} onChange={(e) => { sendAnalog(Number(e.target.value))} }
  className="analogSlider" style={{ background: `linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(255, 255, 255) ${percent}%, rgba(255, 255, 255, 0.58) ${percent}%, rgba(255, 255, 255, 0.58) 100%)`,
  }}
  id='analogSlider'/>
  <span id="power" onClick={() => { pulseSource(powerjoin);}}>
    <PowerSVG className={`powerbtn ${powerState ? 'power-on' : 'power-off'}`} />
  </span>
<p className='songname'>{serialState}</p>

<img src={imageurlserial} alt="" className='urlimage'/>

  
    </div>
  );
}

export default Audiozones;
