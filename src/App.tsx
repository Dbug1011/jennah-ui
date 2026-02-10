import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomeScreen from './pages/HomeScreen'
import ProjectsOverview from './pages/ProjectsOverview'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import './App.css'

function App() {
  console.log('App component rendering')
  return (
    <Router>
      <div className="app">
        {/* <nav className="navbar">
          <Link to="/" className="logo">Jennah</Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/create_workload">Create Workload</Link>
            <Link to="/overview">Overview</Link> */}
            {/* <Link to="/ProjectDashboard">ProjectDashboard</Link> */}
          {/* </div>
        </nav> */}

        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/overview" element={<ProjectsOverview />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
