import { Link, useNavigate } from 'react-router-dom'
import { removeToken } from '../auth'
import './DashBoard.css'

function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    try {
      removeToken()
      navigate('/')
    } catch (err) {
      console.error('Logout error:', err)
      // Fallback to window.location if navigate fails
      window.location.href = '/'
    }
  }

  const navigationItems = [
    { path: '/cve', label: 'CVE Insight', description: 'View vulnerability insights' },
    { path: '/feeds', label: 'Threat Feeds', description: 'Monitor threat intelligence' },
    { path: '/ip', label: 'IP Reputation', description: 'Check IP reputation data' },
    { path: '/map', label: 'Locate IP', description: 'Get IP Location' },
  ]

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>ThreatIQ</h2>
        <button 
          onClick={handleLogout}
          className="logout-button"
          type="button"
        >
          Logout
        </button>
      </header>
      
      <main className="dashboard-main">
        <nav className="dashboard-nav">
          <ul className="nav-list">
            {navigationItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link 
                  to={item.path} 
                  className="nav-link"
                  aria-label={item.description}
                >
                  <span className="nav-title">{item.label}</span>
                  <span className="nav-description">{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </div>

    
  )
}

export default Dashboard