import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Backbtn from './backbtn';
import { cameraData } from '../data/cameraData';

function CameraPopup() {
  const { cameraId } = useParams<{ cameraId: string }>();
  const camera = cameraId ? cameraData[cameraId] : null;

  useEffect(() => {
    // ch5-video renders at the OS layer below the WebView. Any CSS background-color
    // on body/html covers it completely. Override with transparent while on this page
    // and restore the CSS rule on unmount by clearing the inline style.
    document.body.style.backgroundColor = 'transparent';
    document.documentElement.style.backgroundColor = 'transparent';
    return () => {
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    if (!cameraId) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(`cam-view-${cameraId}`);
      if (el) el.click();
    }, 500);
    return () => clearTimeout(timer);
  }, [cameraId]);

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
      {/* Provides the page background at the OS level alongside ch5-video.
          Without this, the page background would be transparent everywhere. */}
      <ch5-background backgroundcolor="#f4f4f7" />

      <div className="header">
        <Backbtn />
        <h1 className="title">{camera.label}</h1>
      </div>

      <div className="cam-popup-wrapper">
        <ch5-video
          id={`cam-view-${cameraId}`}
          class="cam-popup-video"
          aspectratio="16:9"
          sourcetype="Network"
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
      </div>
    </div>
  );
}

export default CameraPopup;
