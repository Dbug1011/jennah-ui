import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../assets/HomeScreen/Logo.png';
import ProjectsIcon from '../assets/icons/project.png';
import WorkloadIcon from '../assets/icons/job.png';
import MenuIcon from '../assets/icons/menu.png'; // Add a menu icon for hamburger
import '../styles/ProjectDashboard.css';
import '../styles/HomeScreen.css';

const navItems = [
  {
    label: 'Projects',
    icon: ProjectsIcon, // This will not be used for the nav item, but keep structure
    path: '/overview',
  },
  {
    label: 'Workloads',
    icon: WorkloadIcon,
    path: '/workloads',
  },
];

function SidebarNav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 900);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 900);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive: show hamburger on mobile
  return (
    <>
      {isMobile && (
        <button
          className="sidebar-hamburger-btn"
          onClick={() => setOpen(true)}
          style={{ position: 'fixed', top: 24, left: 24, zIndex: 1000, background: 'none', border: 'none' }}
        >
          <img src={MenuIcon} alt="Menu" style={{ width: 40, height: 40 }} />
        </button>
      )}
      {/* Desktop sidebar */}
      {!isMobile && (
        <aside className="sidebar-nav">
          <div className="sidebar-logo-group">
           <a href="/"> <img src={Logo} alt="Jennah Logo" className="sidebar-logo-img" /></a>
          </div>
          <div className="sidebar-nav-section">
            <span className="sidebar-nav-title">NAVIGATION</span>
            {navItems.map(item => (
              <Link
                key={item.label}
                to={item.path}
                className={`sidebar-nav-item${location.pathname.startsWith(item.path) ? ' active' : ''}`}
              >
                <img src={item.icon} alt={item.label} className="sidebar-nav-icon" />
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="sidebar-account">
              <div style={{ position: 'absolute', left: 0, bottom: 92, color: '#b3e0ff', fontSize: '0.9rem', letterSpacing: '1px' }}>
                <span className="sidebar-nav-title">YOUR ACCOUNT</span>
              </div>
              <div className="sidebar-account-info">
                <span className="sidebar-account-name">Juan Dela Cruz</span>
                <span className="sidebar-account-email">cruzjuandela@gmail.com</span>
              </div>
            </div>
          </div>
        </aside>
      )}
      {/* Mobile full-screen menu overlay */}
      {isMobile && open && (
        <div className="home-mobile-menu-bg" onClick={() => setOpen(false)}>
          <div className="home-mobile-menu" onClick={e => e.stopPropagation()}>
            <button className="home-mobile-close" aria-label="Close menu" onClick={() => setOpen(false)}>&times;</button>
            
            {navItems.map(item => (
              <Link
                key={item.label}
                to={item.path}
                className={`home-mobile-link${location.pathname.startsWith(item.path) ? ' active' : ''}`}
                onClick={() => setOpen(false)}
              >
                
                <span>{item.label}</span>
              </Link>
            ))}
            <div style={{ margin: '32px 0 0 0', color: '#27526e', fontSize: '0.9rem', letterSpacing: '1px', textAlign: 'center' }}>YOUR ACCOUNT</div>
            
              <span style={{color: '#27526e'}}>Juan Dela Cruz</span>
              <span style={{color: '#27526e'}} className="sidebar-account-email">cruzjuandela@gmail.com</span>
           
          </div>
        </div>
      )}
    </>
  );
}

export default SidebarNav;
