import { Link } from 'react-router-dom';
import '../styles/RegisterPage.css';
import Background from '../assets/images/bg/1.png';
import EmailIcon from '../assets/icons/email.png';
import KeyIcon from '../assets/icons/key.png';
import RocketImg from '../assets/images/side/rocket.png';
import AppHeader from '../components/AppHeader';

export default function RegisterPage() {
  return (
    <div
      className="register-bg-root"
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontFamily: 'Raleway, system-ui, Arial, sans-serif',
      }}
    >
      <AppHeader />
      <main className="register-main">
        <div className="register-side-img">
          <img src={RocketImg} alt="Rocket and Clouds" />
        </div>
        <div className="register-content">
          <h1 className="register-title">Welcome to<br />Jennah</h1>
          <form className="register-form">
            <label className="register-label" htmlFor="email">Email Address</label>
            <div className="register-input-group">
              <img src={EmailIcon} alt="Email" className="register-icon" />
              <input
                type="email"
                id="email"
                className="register-input"
                placeholder="alphabet@gmail.com"
                autoComplete="email"
              />
            </div>
            <label className="register-label" htmlFor="password">Password</label>
            <div className="register-input-group">
              <img src={KeyIcon} alt="Password" className="register-icon" />
              <input
                type="password"
                id="password"
                className="register-input"
                placeholder=""
                autoComplete="new-password"
              />
            </div>
            <button type="submit" className="register-btn">Sign up</button>
          </form>
          <div className="register-signin-text">
            Already have an account? <Link to="/login" className="register-signin-link">Sign in</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
