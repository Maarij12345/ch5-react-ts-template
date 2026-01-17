import { useNavigate } from 'react-router-dom'; // allows page flipping to get proper feedback from control system
import Redselectbtn from '../components/redselectbtn';  
import HomeBtn from '../components/homebtn';


function Zones() {
    const navigate = useNavigate();
    return (
        <div className="page">
              <div className="header">
              <HomeBtn />
              <h1 className="title">Audio</h1>
            </div>
               
      <div className="selection-container">
        <Redselectbtn
          label="ZONES"
          targetPath="/pages/audio"
          onClick={() => navigate('/pages/audio')}
        />

        <Redselectbtn
          label="GROUPS"
          targetPath="/pages/zones"
          onClick={() => navigate('/pages/zones')}
        />
      </div>
      
        </div>
    );

}




export default Zones;