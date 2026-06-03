import { useState, useEffect } from 'react';

export const LockSVG = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className={className} fill="currentColor" aria-hidden="true">
    <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm296.5-223.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z" />
  </svg>
);

export const UnlockSVG = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className={className} fill="currentColor" aria-hidden="true">
    <path d="M240-640h360v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85h-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640Zm296.5 336.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5Z" />
  </svg>
);

const BatterySVG = ({ path, className }: { path: string; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className={className} fill="currentColor" aria-hidden="true">
    <path d={path} />
  </svg>
);

const OUTER = 'M320-80q-17 0-28.5-11.5T280-120v-640q0-17 11.5-28.5T320-800h80v-80h160v80h80q17 0 28.5 11.5T680-760v640q0 17-11.5 28.5T640-80H320Z';

const BATTERY_LEVELS = [
  { min: 88, path: OUTER },
  { min: 75, path: OUTER + 'm40-560h240v-80H360v80Z' },
  { min: 63, path: OUTER + 'm40-480h240v-160H360v160Z' },
  { min: 50, path: OUTER + 'm40-400h240v-240H360v240Z' },
  { min: 38, path: OUTER + 'm40-320h240v-320H360v320Z' },
  { min: 25, path: OUTER + 'm40-240h240v-400H360v400Z' },
  { min: 13, path: OUTER + 'm40-160h240v-480H360v480Z' },
  { min: 0,  path: OUTER + 'm40-80h240v-560H360v560Z' },
];

const getBatteryPath = (pct: number) =>
  BATTERY_LEVELS.find(l => pct >= l.min)!.path;

const getBatteryColorClass = (pct: number) => {
  if (pct >= 50) return 'battery-icon--good';
  if (pct >= 20) return 'battery-icon--medium';
  return 'battery-icon--low';
};

type LockTileProps = {
  name: string;
  lockJoin: string;
  unlockJoin: string;
  feedbackJoin: string;
  batteryJoin?: string;
};

function LockTile({ name, lockJoin, unlockJoin, feedbackJoin, batteryJoin }: LockTileProps) {
  const [isLocked, setIsLocked] = useState<boolean | null>(null);
  const [activeAction, setActiveAction] = useState<'lock' | 'unlock' | null>(null);
  const [batteryRaw, setBatteryRaw] = useState('');

  
  useEffect(() => {
    const lockSubId = window.CrComLib.subscribeState('b', feedbackJoin, (value: boolean) =>
      setIsLocked(value)
    );
    const battSubId = batteryJoin
      ? window.CrComLib.subscribeState('s', batteryJoin, (value: string) => {
          if (value) setBatteryRaw(value);
        })
      : null;

    return () => {
      window.CrComLib.unsubscribeState('b', feedbackJoin, lockSubId);
      if (battSubId && batteryJoin) {
        window.CrComLib.unsubscribeState('s', batteryJoin, battSubId);
      }
    };
  }, []);

  const handleAction = (join: string, action: 'lock' | 'unlock') => {
    if (!join) return;
    setActiveAction(action);
    window.CrComLib.publishEvent('b', join, true);
    setTimeout(() => {
      window.CrComLib.publishEvent('b', join, false);
      setTimeout(() => setActiveAction(null), 420);
    }, 100);
  };

  const match = batteryRaw.match(/\d+/);
  const batteryPct = match ? Math.min(100, Math.max(0, parseInt(match[0], 10))) : null;

  return (
    <div className="lock-control-card">
      <div className="lock-card-top">
        <div className="lock-control-info">
          <p className="lock-control-name">{name}</p>
          {isLocked !== null && (
            <span className={`lock-status ${isLocked ? 'lock-status--locked' : 'lock-status--unlocked'}`}>
              {isLocked ? <LockSVG className="lock-status-svg" /> : <UnlockSVG className="lock-status-svg" />}
              {isLocked ? 'Locked' : 'Unlocked'}
            </span>
          )}
        </div>
        {batteryPct !== null && (
          <div className="lock-battery">
            <BatterySVG
              path={getBatteryPath(batteryPct)}
              className={`lock-battery-icon ${getBatteryColorClass(batteryPct)}`}
            />
            <span className="lock-battery-pct">{batteryPct}%</span>
          </div>
        )}
      </div>
      <div className="lock-icon-row">
        <button
          className={`lock-icon-btn lock-icon-btn--lock ${isLocked === true ? 'lock-icon-btn--fb-lock' : ''} ${activeAction === 'lock' ? 'lock-icon-btn--active-lock' : ''}`}
          onClick={() => handleAction(lockJoin, 'lock')}
          aria-label="Lock"
        >
          <LockSVG className="lock-svg" />
        </button>
        <button
          className={`lock-icon-btn lock-icon-btn--unlock ${isLocked === false ? 'lock-icon-btn--fb-unlock' : ''} ${activeAction === 'unlock' ? 'lock-icon-btn--active-unlock' : ''}`}
          onClick={() => handleAction(unlockJoin, 'unlock')}
          aria-label="Unlock"
        >
          <UnlockSVG className="lock-svg" />
        </button>
      </div>
    </div>
  );
}

export default LockTile;
