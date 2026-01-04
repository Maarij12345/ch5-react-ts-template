import { useLocation } from 'react-router-dom';

type RedSelectBtnProps = {
  label: string;
  targetPath: string;
  onClick: () => void;
};

function Redselectbtn({ label, targetPath, onClick }: RedSelectBtnProps) {
  const location = useLocation();
  const isActive = location.pathname === targetPath;

  return (
    
    <button
      className={`selection-btn ${
        isActive ? 'select-high' : 'select-low'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
    
  );
}

export default Redselectbtn;
