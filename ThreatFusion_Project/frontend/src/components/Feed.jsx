import { useEffect, useState } from 'react'
import api from '../api'
import './Feed.css'

function Feed() {
  const [feeds, setFeeds] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        setIsLoading(true)
        setError('')
        const res = await api.get('http://localhost:5000/api/feed/fetch')
        setFeeds(res.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch threat feeds')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeeds()
  }, [])

  const refreshFeeds = async () => {
    try {
      setIsLoading(true)
      setError('')
      const res = await api.get('http://localhost:5000/api/feed/fetch')
      setFeeds(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to refresh threat feeds')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'No date'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="feed-container">
        <h3>Threat Feeds</h3>
        <div className="loading-message">Loading threat feeds...</div>
      </div>
    )
  }

  return (
    <div className="feed-container">
      <div className="feed-header">
        <h3>Threat Feeds</h3>
        <button 
          onClick={refreshFeeds}
          disabled={isLoading}
          className="refresh-button"
          type="button"
        >
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      {feeds.length === 0 && !isLoading && !error && (
        <div className="no-feeds-message">
          No threat feeds available at the moment.
        </div>
      )}

      {feeds.length > 0 && (
        <div className="feeds-list">
          <div className="feeds-count">
            Showing {feeds.length} threat feed{feeds.length !== 1 ? 's' : ''}
          </div>
          
          <ul className="feed-items">
            {feeds.map((feed, i) => (
              <li key={feed.id || i} className="feed-item">
                <div className="feed-content">
                  <h4 className="feed-title">{feed.title}</h4>
                  
                  {feed.description && (
                    <p className="feed-description">{feed.description}</p>
                  )}
                  
                  <div className="feed-meta">
                    {feed.source && (
                      <span className="feed-source">Source: {feed.source}</span>
                    )}
                    {feed.timestamp && (
                      <span className="feed-timestamp">
                        {formatDate(feed.timestamp)}
                      </span>
                    )}
                    {feed.severity && (
                      <span className={`feed-severity severity-${feed.severity.toLowerCase()}`}>
                        {feed.severity}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Feed