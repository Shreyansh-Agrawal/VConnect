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
            I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
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
