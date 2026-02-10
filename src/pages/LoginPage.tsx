import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';
import Logo from '../assets/HomeScreen/Logo.png';
import Background from '../assets/images/bg/2.png';
import EmailIcon from '../assets/icons/email.png';
import KeyIcon from '../assets/icons/key.png';
import AppHeader from '../components/AppHeader';

export default function LoginPage() {
  return (
    <div
      className="login-bg-root"
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        
        backgroundRepeat: 'no-repeat',
        fontFamily: 'Raleway, system-ui, Arial, sans-serif',
      }}
    >
     
        
        
        
        <AppHeader/>
      <main className="login-main">
        <h1 className="login-title">Welcome to<br />Jennah</h1>
        <form className="login-form">
          <label className="login-label" htmlFor="email">Email Address</label>
          <div className="login-input-group">
            <img src={EmailIcon} alt="Email" className="login-icon" />
            <input
              type="email"
              id="email"
              className="login-input"
              placeholder="alphabet@gmail.com"
              autoComplete="email"
            />
          </div>
          <label className="login-label" htmlFor="password">Password</label>
          <div className="login-input-group">
            <img src={KeyIcon} alt="Password" className="login-icon" />
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder=""
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="login-signup-text">
          Don't have an account? <Link to="/auth/register" className="login-signup-link">Sign up</Link>
        </div>
      </main>
    </div>
  );
}
