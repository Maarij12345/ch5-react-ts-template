import { useState, useEffect } from 'react';
import HomeBtn from '../components/homebtn';
import { useNavigate } from 'react-router-dom';

/* ── Inline SVG icons (from lock-icon.svg / unlock-icon.svg) ── */
const LockSVG = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm296.5-223.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z" />
  </svg>
);

const UnlockSVG = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M240-640h360v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85h-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640Zm296.5 336.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5Z" />
  </svg>
);

/* ── Lock Card ── */
interface LockCardProps {
  name: string;
  lockJoin: string;
  unlockJoin: string;
  feedbackJoin: string; // true = locked, false = unlocked
}

function LockCard({ name, lockJoin, unlockJoin, feedbackJoin }: LockCardProps) {
  const [isLocked, setIsLocked] = useState<boolean | null>(null);
  const [activeAction, setActiveAction] = useState<'lock' | 'unlock' | null>(null);

  useEffect(() => {
    const subId = window.CrComLib.subscribeState('b', feedbackJoin, (value: boolean) => {
      console.log(`Lock feedback [${feedbackJoin}] =`, value);
      setIsLocked(value);
    });
    return () => {
      window.CrComLib.unsubscribeState('b', feedbackJoin, subId);
    };
  }, [feedbackJoin]);

  const handleAction = (join: string, action: 'lock' | 'unlock') => {
    setActiveAction(action);
    window.CrComLib.publishEvent('b', join, true);
    console.log('PULSE digital', join);
    setTimeout(() => {
      window.CrComLib.publishEvent('b', join, false);
      setTimeout(() => setActiveAction(null), 420);
    }, 100);
  };

  const statusLabel = isLocked === null ? '' : isLocked ? 'Locked' : 'Unlocked';
  const statusClass = isLocked === null ? '' : isLocked ? 'lock-status--locked' : 'lock-status--unlocked';

  return (
    <div className="lock-control-card">
      <div className="lock-control-header">
        <p className="lock-control-name">{name}</p>
        {isLocked !== null && (
          <span className={`lock-status ${statusClass}`}>
            {isLocked
              ? <LockSVG className="lock-status-svg" />
              : <UnlockSVG className="lock-status-svg" />}
            {statusLabel}
          </span>
        )}
      </div>
      <div className="lock-icon-row">
        <button
          className={`lock-icon-btn lock-icon-btn--lock
            ${isLocked === true ? 'lock-icon-btn--fb-lock' : ''}
            ${activeAction === 'lock' ? 'lock-icon-btn--active-lock' : ''}`}
          onClick={() => handleAction(lockJoin, 'lock')}
          aria-label="Lock"
        >
          <LockSVG className="lock-svg" />
        </button>
        <button
          className={`lock-icon-btn lock-icon-btn--unlock
            ${isLocked === false ? 'lock-icon-btn--fb-unlock' : ''}
            ${activeAction === 'unlock' ? 'lock-icon-btn--active-unlock' : ''}`}
          onClick={() => handleAction(unlockJoin, 'unlock')}
          aria-label="Unlock"
        >
          <UnlockSVG className="lock-svg" />
        </button>
      </div>
    </div>
  );
}

/* ── Page ── */
function Locks() {
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
          <LockCard
            name="First Garage Door"
            lockJoin="8"
            unlockJoin="7"
            feedbackJoin="8"
          />
          <LockCard
            name="Second Garage Door"
            lockJoin="7"
            unlockJoin="8"
            feedbackJoin="7"
          />
        </div>
      </section>
    </div>
  );
}

export default Locks;
