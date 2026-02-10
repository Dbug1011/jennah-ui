import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../assets/HomeScreen/Logo.png';
import MenuIcon from '../assets/icons/menu.png';
import '../styles/HomeScreen.css';

export default function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="home-header">
      <div className="home-logo-group">
        <a href="/"><img src={Logo} alt="Jennah Logo" className="home-logo-img" /></a>
      </div>
      <nav className="home-nav">
        <Link to="/" className="home-nav-link">Home</Link>
        <a href="#features" className="home-nav-link">Features</a>
        <a href="#pricing" className="home-nav-link">Pricing</a>
        <a href="#contact" className="home-nav-link">Contact</a>
      </nav>
      {/* Show Sign Up or Login depending on page */}
      {location.pathname === '/auth/login' ? (
        <Link to="/auth/register" className="home-signup-btn">Sign Up</Link>
      ) : (
        <Link to="/auth/login" className="home-signup-btn">Login</Link>
      )}
      <button className="home-hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
        <img src={MenuIcon} alt="Menu" className="home-menu-icon" />
      </button>
      {menuOpen && (
        <div className="home-mobile-menu-bg" onClick={() => setMenuOpen(false)}>
          <div className="home-mobile-menu" onClick={e => e.stopPropagation()}>
            <button className="home-mobile-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>&times;</button>
            <Link to="/" className="home-mobile-link" onClick={() => setMenuOpen(false)}>Home</Link>
            <a href="#features" className="home-mobile-link" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#pricing" className="home-mobile-link" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href="#contact" className="home-mobile-link" onClick={() => setMenuOpen(false)}>Contact</a>
            {location.pathname === '/login' ? (
              <Link to="/signup" className="home-mobile-signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            ) : (
              <Link to="/login" className="home-mobile-signup" onClick={() => setMenuOpen(false)}>Login</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
