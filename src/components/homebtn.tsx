import { useNavigate } from 'react-router-dom'; // allows page flipping to get proper feedback from control system


function HomeBtn() {
    const navigate = useNavigate();
    return(
        <a className='arrow'>
            <span className="material-symbols-outlined arrow-icon" onClick={() => navigate('/')}>arrow_back</span>
        </a>

    )   
}

export default HomeBtn;