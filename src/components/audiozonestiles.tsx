import { useState, useEffect } from 'react';
import keyboardarrowup from '../assets/images/keyboard-arrow-up.svg';
import keyboardarrowdown from '../assets/images/keyboard-arrow-down.svg';
import volumeup from '../assets/images/volume_up.svg';
import volumeoff from '../assets/images/volume_off.svg';
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
  <span id={powerState ? 'redpower' : 'whitepower'} className="material-symbols-outlined" onClick={() => { pulseSource(powerjoin);}}>power_settings_new</span>
<p className='songname'>{serialState}hi</p>

<img src={imageurlserial} alt="" className='urlimage'/>

  
    </div>
  );
}

export default Audiozones;
