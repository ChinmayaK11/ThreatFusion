import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Dashboard from './components/DashBoard.jsx'
import CVEInsight from './components/CVEInsight.jsx'
import Feed from './components/Feed.jsx'
import IPReputation from './components/IPReputation.jsx'
import EmailReport from './components/EmailReport.jsx'
import IPLookup from './components/IPLookup.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cve" element={<CVEInsight />} />
        <Route path="/feeds" element={<Feed />} />
        <Route path="/ip" element={<IPReputation />} />
        <Route path="/email" element={<EmailReport />} />
        <Route path="/map" element={<IPLookup/>} />
      </Routes>
    </Router>
  )
}

export default App
