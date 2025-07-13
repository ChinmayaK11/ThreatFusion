import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { saveToken } from '../auth'
import './Login.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    if (e) e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const res = await api.post('/auth/login', { username, password })
      saveToken(res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              required
              autoComplete="username"
            />
          </div>
          
          <div className="form-group">
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              required
              autoComplete="current-password"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading || !username.trim() || !password.trim()}
            className="login-button"
            onClick={handleLogin}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login;