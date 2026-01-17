import { useState, useEffect } from 'react';



type AudioZoneProps = {
  label: string;
  mutejoin: string;
};

const pulseDigital = (join: string) => {
  console.log('PULSE digital', join);
  window.CrComLib.publishEvent('b', join, true);
  setTimeout(() => {
    window.CrComLib.publishEvent('b', join, false);
  }, 100);
};

function Audiozones({ label, mutejoin }: AudioZoneProps) {
  // ✅ hooks MUST be inside component
  const [digitalState, setDigitalState] = useState(false);
  const [analogState, setAnalogState] = useState(0);
  const [serialState, setSerialState] = useState('');

  useEffect(() => {
    const d1Id = window.CrComLib.subscribeState('b', '1', (value: boolean) =>
      setDigitalState(value)
    );
    const a1Id = window.CrComLib.subscribeState('n', '1', (value: number) =>
      setAnalogState(value)
    );
    const s1Id = window.CrComLib.subscribeState('s', '1', (value: string) =>
      setSerialState(value)
    );
    

    return () => {
      window.CrComLib.unsubscribeState('b', '1', d1Id);
      window.CrComLib.unsubscribeState('n', '1', a1Id);
      window.CrComLib.unsubscribeState('s', '1', s1Id);
    };
  }, []);

  const sendAnalog = (value: number) =>
    window.CrComLib.publishEvent('n', '1', value);

  const sendSerial = (value: string) =>
    window.CrComLib.publishEvent('s', '1', value);


const min = 0;
const max = 65535;
const percent = ((analogState - min) / (max - min)) * 100;

  return (
    <div className="zone">
      <p className="roomname">{label}</p>

      <button onClick={() => pulseDigital(mutejoin)}>mute</button>

       <input
  type="range"
  min={min}
  max={max}
  value={analogState}
  onChange={(e) => sendAnalog(Number(e.target.value))}
  className="analogSlider"
  style={{
    background: `linear-gradient(
      to right,
      #0895e7 0%,
      #0895e7 ${percent}%,
      #d3d3d3 ${percent}%,
      #d3d3d3 100%
    )`,
  }}
/>

  
    </div>
  );
}

export default Audiozones;
