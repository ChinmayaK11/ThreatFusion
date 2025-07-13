import { useState } from 'react'
import api from '../api'
import './IPReputation.css'

function IPReputation() {
  const [ip, setIp] = useState('')
  const [details, setDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const validateIP = (ipAddress) => {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
    return ipv4Regex.test(ipAddress) || ipv6Regex.test(ipAddress)
  }

  const fetchIP = async (e) => {
    if (e) e.preventDefault()
    
    if (!ip.trim()) {
      setError('Please enter an IP address')
      return
    }

    if (!validateIP(ip.trim())) {
      setError('Please enter a valid IP address')
      return
    }

    setIsLoading(true)
    setError('')
    setDetails(null)

    try {
      const res = await api.get(`/ip/${ip.trim()}`)
      setDetails(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch IP reputation data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchIP()
    }
  }

  const clearData = () => {
    setDetails(null)
    setError('')
    setIp('')
  }

  const getReputationClass = (reputation) => {
    if (!reputation) return ''
    const rep = reputation.toLowerCase()
    if (rep.includes('good') || rep.includes('clean')) return 'good'
    if (rep.includes('malicious') || rep.includes('bad')) return 'bad'
    if (rep.includes('suspicious') || rep.includes('moderate')) return 'suspicious'
    return ''
  }

  const getConfidenceClass = (score) => {
    if (score >= 75) return 'high'
    if (score >= 50) return 'medium'
    if (score >= 25) return 'low'
    return 'very-low'
  }

  return (
    <div className="ip-reputation-container">
      <h3>IP Reputation</h3>
      
      <form onSubmit={fetchIP} className="ip-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="IP Address (e.g., 192.168.1.1)"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="ip-input"
          />
          <button 
            type="submit"
            disabled={isLoading || !ip.trim()}
            className="check-button"
          >
            {isLoading ? 'Checking...' : 'Check'}
          </button>
        </div>
      </form>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      {details && (
        <div className="ip-results">
          <div className="results-header">
            <h4>IP Details: {ip}</h4>
            <button 
              onClick={clearData}
              className="clear-button"
              type="button"
            >
              Clear
            </button>
          </div>
          
          <div className="ip-data">
            <div className="data-item">
              <strong>Country:</strong> 
              <span className="country">{details.country || 'Unknown'}</span>
            </div>
            
            <div className="data-item">
              <strong>Organization:</strong> 
              <span className="org">{details.org || 'Unknown'}</span>
            </div>
            
            <div className="data-item">
              <strong>Abuse Confidence Score:</strong> 
              <span className={`confidence-score ${getConfidenceClass(details.abuseConfidenceScore)}`}>
                {details.abuseConfidenceScore !== undefined ? `${details.abuseConfidenceScore}%` : 'Unknown'}
              </span>
            </div>
            
            <div className="data-item">
              <strong>Reputation:</strong> 
              <span className={`reputation ${getReputationClass(details.reputation)}`}>
                {details.reputation || 'Unknown'}
              </span>
            </div>

            {details.isp && (
              <div className="data-item">
                <strong>ISP:</strong> 
                <span className="isp">{details.isp}</span>
              </div>
            )}

            {details.usage && (
              <div className="data-item">
                <strong>Usage:</strong> 
                <span className="usage">{details.usage}</span>
              </div>
            )}

            {details.lastSeen && (
              <div className="data-item">
                <strong>Last Seen:</strong> 
                <span className="last-seen">
                  {new Date(details.lastSeen).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default IPReputation