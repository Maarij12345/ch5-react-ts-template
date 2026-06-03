import { useNavigate } from 'react-router-dom'; // allows page flipping to get proper feedback from control system
import Redselectbtn from '../components/redselectbtn';
import HomeBtn from '../components/homebtn';


function AudioSearch() {
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
        <Redselectbtn
          label="SEARCH"
          targetPath="/pages/search"
          onClick={() => navigate('/pages/search')}
        />
      </div>


        </div>
    );

}




export default AudioSearch;
