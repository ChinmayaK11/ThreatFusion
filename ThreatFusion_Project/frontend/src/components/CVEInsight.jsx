import { useState } from 'react'
import api from '../api'
import './CVEInsight.css'

function CVEInsight() {
  const [cveId, setCveId] = useState('')
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const fetchCVE = async (e) => {
    if (e) e.preventDefault()
   
    if (!cveId.trim()) {
      setError('Please enter a CVE ID')
      return
    }
    setIsLoading(true)
    setError('')
    setData(null)
    try {
      const res = await api.get(`/cve/${cveId.trim()}`)
      setData(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch CVE data')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchCVE()
    }
  }
  
  const clearData = () => {
    setData(null)
    setError('')
    setCveId('')
  }
  
  return (
    <div className="cve-insight-container">
      <h3>CVE Insight</h3>
     
      <form onSubmit={fetchCVE} className="cve-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="CVE ID (e.g., CVE-2023-1234)"
            value={cveId}
            onChange={(e) => setCveId(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="cve-input"
          />
          <button
            type="submit"
            disabled={isLoading || !cveId.trim()}
            className="fetch-button"
          >
            {isLoading ? 'Loading...' : 'Get Insight'}
          </button>
        </div>
      </form>
      
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
      
      {data && (
        <div className="cve-results">
          <div className="results-header">
            <h4>CVE Details: {cveId}</h4>
            <button
              onClick={clearData}
              className="clear-button"
              type="button"
            >
              Clear
            </button>
          </div>
         
          <div className="cve-data">
            <div className="data-item">
              <strong>Description:</strong>
              <span className="description">{data.description}</span>
            </div>
           
            <div className="data-item">
              <strong>CVSS:</strong>
              <span className={`cvss-score ${data.cvss >= 7 ? 'high' : data.cvss >= 4 ? 'medium' : 'low'}`}>
                {data.cvss}
              </span>
            </div>
           
            <div className="data-item">
              <strong>Threat Score:</strong>
              <span className="threat-score">{data.threatScore}</span>
            </div>
           
            <div className="data-item">
              <strong>Priority:</strong>
              <span className={`priority priority-${data.priority?.toLowerCase()}`}>
                {data.priority}
              </span>
            </div>
             <div className="data-item">
              <strong>Summary:</strong>
              <span className="threat-score">{data.summary}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CVEInsight