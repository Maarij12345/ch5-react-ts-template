type CameraBtnProps = {
  label: string;

  onClick: () => void; // originally dont do anything, since this will be the data passed for page flips
};

function CameraBtn({ label, onClick }: CameraBtnProps) { //child component
  return (
   <button className="home-tile"   data-id={label.toLowerCase()}
 onClick={onClick}>
      
      <span className="home-tile-label">{label}</span>
    </button>
  );
}
 export default CameraBtn;
