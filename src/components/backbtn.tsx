import { useNavigate } from 'react-router-dom';
import arrowback from '../assets/images/arrowback.svg';

function Backbtn() {
  const navigate = useNavigate();

  return (
    
       <a className='arrow' onClick={() => navigate(-1)}>
        <img src={arrowback} alt="back" className='arrowimg'/>
      </a>
  );
}

export default Backbtn;
