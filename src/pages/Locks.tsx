import HomeBtn from '../components/homebtn';
import LockTile, { LockSVG, UnlockSVG } from '../components/locktile';

const pulseDigital = (join: string) => {
  window.CrComLib.publishEvent('b', join, true);
  setTimeout(() => window.CrComLib.publishEvent('b', join, false), 100);
};

function Locks() {
  return (
    <div className="page">
      <div className="header">
        <HomeBtn />
        <h1 className="title">Locks</h1>
      </div>

      <section className="lock-section">
        <h3 className="lock-section-label">SCENES</h3>
        <div className="lock-scene-grid">
          <button className="lock-scene-tile" onClick={() => pulseDigital('200')} aria-label="Lock All">
            <LockSVG className="lock-scene-svg lock-scene-svg--lock" />
            <span className="lock-scene-name">Lock All</span>
          </button>
          <button className="lock-scene-tile" onClick={() => pulseDigital('201')} aria-label="Unlock All">
            <UnlockSVG className="lock-scene-svg lock-scene-svg--unlock" />
            <span className="lock-scene-name">Unlock All</span>
          </button>
        </div>
      </section>

      <section className="lock-section">
        <h3 className="lock-section-label">CONTROLS</h3>
        <div className="lock-control-grid">
          <LockTile name="Inside Garage Door" lockJoin="225" unlockJoin="226" feedbackJoin="225" batteryJoin="30" />
          <LockTile name="Outside Garage Door" lockJoin="" unlockJoin="" feedbackJoin="" batteryJoin="302" />
        </div>
      </section>
    </div>
  );
}

export default Locks;
