import FolderIcon from '../assets/icons/folder.png';
import '../styles/ProjectDashboard.css';

export default function ProjectCard({ name = 'PRJName', quota = 45, running = 3, fail = 0, lastUsed = '2 minutes ago', healthy = true }) {
  return (
    <div className="project-card">
      <div className="project-card-header">
        <img src={FolderIcon} alt="Folder" className="project-card-icon" />
        <span className="project-card-title">{name}</span>
      </div>
      <div className="project-card-details">
        <div className="project-card-detail">
          <span className="project-card-label">QUOTA</span>
          <span className="project-card-value">{quota}% <span className="project-card-used">Used</span></span>
        </div>
        <div className="project-card-detail">
          <span className="project-card-label">RUNNING</span>
          <span className="project-card-value">{running}</span>
        </div>
        <div className="project-card-detail">
          <span className="project-card-label">FAIL</span>
          <span className="project-card-value">{fail}</span>
        </div>
      </div>
      <div className="project-card-footer">
        <span className="project-card-lastused">Last used {lastUsed}</span>
        <span className={`project-card-health${healthy ? ' healthy' : ' unhealthy'}`}>{healthy ? '● Healthy' : '● Unhealthy'}</span>
      </div>
    </div>
  );
}
