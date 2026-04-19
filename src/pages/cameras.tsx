import HomeBtn from '../components/homebtn';

function Cameras() {
return (
    <>
    <HomeBtn />
    <div className="preview-window">
        <ch5-video aspectratio="16:9" sourcetype="Network"  snapshotrefreshrate="5" size="large" id="i3az" url="rtsp://admin:Wzerafsh99@192.168.10.18:554/h264/ch6/sub/av_stream" stretch="true" password="Maari377" class="preview-element">
        </ch5-video>
    </div>
    </>

);
}

export default Cameras;