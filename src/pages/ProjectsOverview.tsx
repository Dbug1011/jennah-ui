import SidebarNav from '../components/SidebarNav';
import ProjectCard from '../components/ProjectCard';
import FilterIcon from '../assets/icons/filter.png';
import SearchIcon from '../assets/icons/search.png';
import Background from '../assets/images/bg/3.jpg';
import '../styles/ProjectDashboard.css';

export default function ProjectsOverview() {
  return (
    <div
      className="projects-bg-root"
      style={{
        // minHeight: '100vh',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontFamily: 'Raleway, system-ui, Arial, sans-serif',
        display: 'flex',
      }}
    >
      <SidebarNav />
      <main className="projects-main">
        <h1 className="projects-title">All Projects</h1>
        <div className="projects-search-row">
          <div className="projects-search-bar">
            <img src={SearchIcon} alt="Search" className="projects-search-icon" />
            <input type="text" placeholder="Search Projects" className="projects-search-input" />
          </div>
          <button className="projects-filter-btn">
            <img src={FilterIcon} alt="Filter" className="projects-filter-icon" />
          </button>
        </div>
        <div className="projects-cards-grid">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
        <button className="projects-add-btn">Add New Project</button>
      </main>
    </div>
  );
}
