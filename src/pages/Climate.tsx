import { useNavigate } from 'react-router-dom';
import HomeBtn from '../components/homebtn';


function Climate() {
    const navigate = useNavigate();
    return (
        <div className="page">
              <div className="header">
              <HomeBtn />
              <h1 className="title">Climate</h1>
            </div>
               
      
      
        </div>
    );

}




export default Climate;