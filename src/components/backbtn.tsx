import { useNavigate } from 'react-router-dom';

function Backbtn() {
  const navigate = useNavigate();

  return (
    <span
      className="material-symbols-outlined arrow-icon"
      onClick={() => navigate(-1)}
    >
      arrow_back
    </span>
  );
}

export default Backbtn;
