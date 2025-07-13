import { useState } from 'react'
import api from '../api'
import './EmailReport.css'

function EmailReport() {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const sendEmail = async (e) => {
    if (e) e.preventDefault()
    
    // Validation
    if (!to.trim()) {
      setError('Please enter recipient email address')
      return
    }

    if (!validateEmail(to.trim())) {
      setError('Please enter a valid email address')
      return
    }

    if (!subject.trim()) {
      setError('Please enter email subject')
      return
    }

    if (!content.trim()) {
      setError('Please enter email content')
      return
    }

    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      await api.post('/email/send', { 
        to: to.trim(), 
        subject: subject.trim(), 
        content: content.trim() 
      })
      setSuccess('Email sent successfully!')
      // Clear form after successful send
      setTo('')
      setSubject('')
      setContent('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send email')
    } finally {
      setIsLoading(false)
    }
  }

  const clearForm = () => {
    setTo('')
    setSubject('')
    setContent('')
    setError('')
    setSuccess('')
  }

  const isFormValid = () => {
    return to.trim() && subject.trim() && content.trim() && validateEmail(to.trim())
  }

  return (
    <div className="email-report-container">
      <h3>Send Email Report</h3>
      
      <form onSubmit={sendEmail} className="email-form">
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}
        
        {success && (
          <div className="success-message" role="alert">
            {success}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="to">To:</label>
          <input
            id="to"
            type="email"
            placeholder="recipient@example.com"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            disabled={isLoading}
            className="email-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            id="subject"
            type="text"
            placeholder="Email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={isLoading}
            className="subject-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            placeholder="Email content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
            className="content-textarea"
            rows="8"
            required
          />
          <div className="char-count">
            {content.length} characters
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit"
            disabled={isLoading || !isFormValid()}
            className="send-button"
          >
            {isLoading ? 'Sending...' : 'Send Email'}
          </button>
          
          <button 
            type="button"
            onClick={clearForm}
            disabled={isLoading}
            className="clear-button"
          >
            Clear
          </button>
        </div>
      </form>

      <div className="email-preview">
        <h4>Preview:</h4>
        <div className="preview-content">
          <div className="preview-field">
            <strong>To:</strong> {to || 'No recipient'}
          </div>
          <div className="preview-field">
            <strong>Subject:</strong> {subject || 'No subject'}
          </div>
          <div className="preview-field">
            <strong>Content:</strong> 
            <div className="preview-text">
              {content || 'No content'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailReport