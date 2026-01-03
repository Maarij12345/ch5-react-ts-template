
import HomeTile from '../components/HomeTile';
import { homeButtons } from '../data/homeButton';
import { useNavigate } from 'react-router-dom'; // allows page flipping to get proper feedback from control system


function Home() {
   
   


 const navigate = useNavigate();

  return (
    <>
   
    <div className="top-banner">
    <h1 style={{ color: 'black' }}>Khan's Residence</h1>

    </div>

      <div className="home-grid">
         
      {homeButtons.map(btn => ( //iterating through homeButtons array
        <HomeTile //parent component
          key={btn.id} // unique key prop for each button
          label={btn.label}
          image={btn.image}
          onClick={() => navigate(`/pages/${btn.page}`)  } 
        />
      ))}
    </div>
 
    </>
  )
    
}



export default Home;