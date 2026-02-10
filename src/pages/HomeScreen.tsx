import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/HomeScreen.css';
import Logo from '../assets/HomeScreen/Logo.png';
import Background from '../assets/HomeScreen/Background.png';
import MenuIcon from '../assets/icons/menu.png';

export default function HomeScreen() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="home-bg-root"
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontFamily: 'Raleway, system-ui, Arial, sans-serif',
      }}
    >
      <header className="home-header">
        <div className="home-logo-group">
          <img src={Logo} alt="Jennah Logo" className="home-logo-img" />
        </div>
        <nav className="home-nav">
          <Link to="/" className="home-nav-link">Home</Link>
          <a href="#features" className="home-nav-link">Features</a>
          <a href="#pricing" className="home-nav-link">Pricing</a>
          <a href="#contact" className="home-nav-link">Contact</a>
        </nav>
        <Link to="/signup" className="home-signup-btn">Sign Up</Link>
        <button className="home-hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <img src={MenuIcon} alt="Menu" className="home-menu-icon" />
        </button>
      </header>
      {menuOpen && (
        <div className="home-mobile-menu-bg" onClick={() => setMenuOpen(false)}>
          <div className="home-mobile-menu" onClick={e => e.stopPropagation()}>
            <button className="home-mobile-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>&times;</button>
            <Link to="/" className="home-mobile-link" onClick={() => setMenuOpen(false)}>Home</Link>
            <a href="#features" className="home-mobile-link" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#pricing" className="home-mobile-link" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href="#contact" className="home-mobile-link" onClick={() => setMenuOpen(false)}>Contact</a>
            <Link to="/signup" className="home-mobile-signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </div>
        </div>
      )}
      <main className="home-main">
        <button className="home-simplify-btn">Simplify your workload</button>
        <h1 className="home-title">
          Ship code,<br />
          <span className="home-title-secondary">Not infrastructure</span>
        </h1>
        <p className="home-subtitle">
          A unified interface to schedule, monitor, and manage containerized<br />
          jobs on GCP Batch
        </p>
        <Link to="/auth/login" className="home-cta-btn">Start workload</Link>
      </main>
    </div>
  );
}