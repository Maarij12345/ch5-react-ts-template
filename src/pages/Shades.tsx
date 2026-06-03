import { useNavigate } from 'react-router-dom';
import HomeBtn from '../components/homebtn';


function Shades() {
    const navigate = useNavigate();
    return (
        <div className="page">
              <div className="header">
              <HomeBtn />
              <h1 className="title">Shades</h1>
            </div>
               
      
      
        </div>
    );

}




export default Shades;