import { useNavigate } from 'react-router-dom';
import HomeBtn from '../components/homebtn';
import CameraBtn from '../components/camerabtn';

const cameras = [
  { id: '1', label: 'Front Door' },
  { id: '2', label: 'PTZ' },
  { id: '3', label: 'Masterbed Front' },
  { id: '4', label: 'Garage' },
  { id: '5', label: 'Camera 5' },
  { id: '6', label: 'Camera 6' },
];

function Cameras() {
  const navigate = useNavigate();

  return (
    <div className="page cam-page">
      <div className="header">
        <HomeBtn />
        <h1 className="title">Cameras</h1>
      </div>

      <h3 className="cam-section-label">SELECT CAMERA</h3>

      <div className="home-grid">
        {cameras.map(cam => (
          <CameraBtn
            key={cam.id}
            label={cam.label}
            onClick={() => navigate(`/pages/camera/${cam.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default Cameras;
