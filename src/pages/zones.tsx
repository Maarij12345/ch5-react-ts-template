import { useNavigate } from 'react-router-dom'; // allows page flipping to get proper feedback from control system
import Redselectbtn from '../components/redselectbtn';  
 



function Zones() {
    const navigate = useNavigate();
    return (
        <div className="page">
            <h1>Zones Page</h1>
               <Redselectbtn
  label="ROOMS"
  targetPath="/pages/audio"
  onClick={() => navigate('/pages/audio')}
/>

<Redselectbtn
  label="ZONES"
  targetPath="/pages/zones"
  onClick={() => navigate('/pages/zones')}
/>

        </div>
    );

}




export default Zones;