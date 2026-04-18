import { useNavigate } from 'react-router-dom'; // allows page flipping to get proper feedback from control system

import arrowback from '../assets/images/arrowback.svg';

function HomeBtn() {
    const navigate = useNavigate();
    return(
      <a className='arrow' onClick={() => navigate('/')}>
        <img src={arrowback} alt="back" className='arrowimg'/>
      </a>
    )   
}

export default HomeBtn;