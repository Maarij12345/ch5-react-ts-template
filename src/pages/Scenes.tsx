import { useNavigate } from 'react-router-dom'; // allows page flipping to get proper feedback from control system
import Redselectbtn from '../components/redselectbtn';
import HomeBtn from '../components/homebtn';



function Scenes() {
  const navigate = useNavigate();
  return (
    <div className="page">
      <div className="header">
        <HomeBtn />
        <h1 className="title">Lights</h1>
      </div>
      <div className="selection-container">
        <Redselectbtn
          label="ROOMS"
          targetPath="/pages/lights"
          onClick={() => navigate('/pages/lights')}
        />

        <Redselectbtn
          label="SCENES"
          targetPath="/pages/scenes"
          onClick={() => navigate('/pages/scenes')}
        />
      </div>
    </div>

  );

}




export default Scenes;