import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            VITians <span>Networking</span> App
          </h1>
          <p>
            Now keep track of your projects, connect with your peers and see the 
            updates from the clubs of VIT. Want to join as a Club? Register as one 
            to keep a track of your events and put up updates!
          </p>
          <Link
            to="/register"
            className="btn btn-hero"
            style={{ marginRight: 15 }}
          >
            Individual
          </Link>
          <Link to="/registerClub" className="btn btn-hero">
            Club
          </Link>
        </div>
        <img src={main} alt="project hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
}

export default Landing
