import { useParams } from 'react-router-dom';
import Backbtn from './backbtn';
import { cameraData } from '../data/cameraData';

function CameraPopup() {
  const { cameraId } = useParams<{ cameraId: string }>();
  const camera = cameraId ? cameraData[cameraId] : null;

  if (!camera) {
    return (
      <div className="page">
        <div className="header">
          <Backbtn />
        </div>
        <p style={{ padding: '1rem' }}>Camera not found.</p>
      </div>
    );
  }

  return (
    <div className="page cam-popup-page">
      <div className="header">
        <Backbtn />
        <h1 className="title">{camera.label}</h1>
      </div>

      {/* ── Live feed ───────────────────────────────────────────────
          size="large"   → larger native overlay for the dedicated view
          stretch="true" → fills the element's own bounding box
          snapshotrefreshrate="5" → shows a still image every 5 s while
                                    the stream hasn't been tapped yet
          No receiveStatePlay → built-in play button is active
      ─────────────────────────────────────────────────────────────── */}
      <div className="cam-popup-wrapper">
        <ch5-video
          id={`cam-view-${cameraId}`}
          class="cam-popup-video"
          aspectratio="16:9"
          sourcetype="Network"
          snapshotrefreshrate="5"
          size="large"
          stretch="true"
          url={camera.url}
          password={camera.password}
        />
      </div>

      <div className="cam-popup-footer">
        <span className="cam-live-badge">
          <span className="cam-live-dot" />
          Live
        </span>
        <p className="cam-popup-hint">Tap the feed to start live stream</p>
      </div>
    </div>
  );
}

export default CameraPopup;
