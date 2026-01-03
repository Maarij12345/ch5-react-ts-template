// src/components/HomeTile.tsx
type HomeTileProps = {
  label: string;
  image: string;
  onClick: () => void; // originally dont do anything, since this will be the data passed for page flips
};

function HomeTile({ label, image, onClick }: HomeTileProps) { //child component
  return (
   <button className="home-tile"   data-id={label.toLowerCase()}
 onClick={onClick}>
      <img src={image} alt={label} className="home-tile-icon" />
      <span className="home-tile-label">{label}</span>
    </button>
  );
}
 export default HomeTile;
