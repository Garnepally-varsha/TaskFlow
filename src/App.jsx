
import { useState } from 'react'
import './App.css'

function App() {
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState('Member')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('error')

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const isSignup = mode === 'signup'

  const passwordChecks = [
    form.password.length >= 8,
    /[A-Z]/.test(form.password),
    /[a-z]/.test(form.password),
    /[0-9]/.test(form.password),
    /[^A-Za-z0-9]/.test(form.password),
  ]

  const passwordStrength = passwordChecks.filter(Boolean).length

  const strengthLabels = [
    'Very weak',
    'Weak',
    'Fair',
    'Good',
    'Strong',
    'Strong',
  ]

  function handleChange(event) {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))

    setMessage('')
  }

  function switchMode(nextMode) {
    setMode(nextMode)
    setMessage('')
    setShowPassword(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('')

    if (isSignup && !form.name.trim()) {
      setMessage('Please enter your full name.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setMessage('Please enter a valid email address.')
      return
    }

    if (form.password.length < 8) {
      setMessage('Password must contain at least 8 characters.')
      return
    }

    if (isSignup && passwordStrength < 3) {
      setMessage(
        'Please improve your password. Include uppercase and lowercase letters, numbers, or symbols.'
      )
      return
    }

    if (isSignup && form.password !== form.confirmPassword) {
      setMessage('Your passwords do not match.')
      return
    }

    setMessageType('info')
    setMessage(
      isSignup
        ? `Your ${role} signup form is valid! Account creation will be available when the backend is connected.`
        : 'Your login form is valid! Authentication will be available when the backend is connected.'
    )
  }

  function handleForgotPassword() {
    setMessageType('info')
    setMessage(
      'Password recovery will be available after the backend is connected.'
    )
  }

  function clearMessage() {
    setMessage('')
    setMessageType('error')
  }

  return (
    <main className="auth-page">
      <header className="topbar">
        <a
          className="brand"
          href="#"
          onClick={(event) => {
            event.preventDefault()
            switchMode('login')
          }}
          aria-label="TaskFlow home"
        >
          <span className="brand-icon">T</span>
          <span>TaskFlow</span>
        </a>

        <span className="topbar-note">Your team's workspace</span>
      </header>

      <section className="auth-layout">
        <aside className="hero-panel">
          <div className="hero-content">
            <span className="eyebrow">
              <span className="status-dot" />
              WORK BETTER, TOGETHER
            </span>

            <h1>
              Great work starts
              <br />
              with a <span>better flow.</span>
            </h1>

            <p className="hero-description">
              Bring your projects, people, and priorities together.
              Less chaos, more meaningful progress.
            </p>

            <div className="preview-card">
              <div className="preview-heading">
                <div>
                  <span className="preview-label">YOUR WORKSPACE</span>
                  <h3>Project overview</h3>
                </div>
                <span className="preview-menu">•••</span>
              </div>

              <div className="progress-row">
                <span>Website redesign</span>
                <strong>75%</strong>
              </div>

              <div className="progress-track">
                <span className="progress-fill fill-one" />
              </div>

              <div className="progress-row second-row">
                <span>Mobile application</span>
                <strong>48%</strong>
              </div>

              <div className="progress-track">
                <span className="progress-fill fill-two" />
              </div>

              <div className="preview-footer">
                <div className="avatar-stack" aria-label="Team members">
                  <span>AK</span>
                  <span>SM</span>
                  <span>RJ</span>
                </div>
                <span>Moving forward together</span>
              </div>
            </div>

            <div className="hero-caption">
              <span className="caption-check">✓</span>
              One workspace. Every project. Your whole team.
            </div>
          </div>

          <div className="hero-decoration decoration-one" />
          <div className="hero-decoration decoration-two" />
        </aside>

        <section className="form-panel">
          <div className="form-container">
            <div className="mobile-brand">
              <span className="brand-icon">T</span>
              TaskFlow
            </div>

            <div className="form-heading">
              <span className="welcome-label">
                {isSignup ? 'GET STARTED' : 'WELCOME BACK'}
              </span>

              <h2>
                {isSignup ? 'Create your account' : 'Sign in to TaskFlow'}
              </h2>

              <p>
                {isSignup
                  ? 'Set up your account and get your team moving.'
                  : 'Enter your details to access your workspace.'}
              </p>
            </div>

            <div className="mode-switch" aria-label="Authentication mode">
              <button
                type="button"
                className={!isSignup ? 'mode-active' : ''}
                onClick={() => switchMode('login')}
                aria-pressed={!isSignup}
              >
                Sign in
              </button>

              <button
                type="button"
                className={isSignup ? 'mode-active' : ''}
                onClick={() => switchMode('signup')}
                aria-pressed={isSignup}
              >
                Create account
              </button>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {isSignup && (
                <div className="field-group">
                  <label htmlFor="name">Full name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="field-group">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field-group">
                <div className="label-row">
                  <label htmlFor="password">Password</label>

                  {!isSignup && (
                    <button
                      type="button"
                      className="text-button"
                      onClick={handleForgotPassword}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>

                <div className="password-wrap">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={
                      isSignup
                        ? 'Create a strong password'
                        : 'Enter your password'
                    }
                    autoComplete={
                      isSignup ? 'new-password' : 'current-password'
                    }
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                  />

                  <button
                    type="button"
                    className="show-password"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {isSignup && (
                <>
                  <div className="password-strength">
                    <div className="strength-label">
                      <span>Password strength</span>
                      <span>
                        {form.password
                          ? strengthLabels[passwordStrength]
                          : 'Not set'}
                      </span>
                    </div>

                    <div
                      className="strength-bars"
                      aria-label={`Password strength: ${passwordStrength} of 5`}
                    >
                      {[1, 2, 3, 4, 5].map((level) => (
                        <span
                          key={level}
                          className={
                            level <= passwordStrength
                              ? `strength-level-${passwordStrength}`
                              : ''
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div className="field-group">
                    <label htmlFor="confirmPassword">Confirm password</label>

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {form.confirmPassword &&
                    form.confirmPassword !== form.password && (
                      <p className="password-hint">
                        Passwords do not match yet.
                      </p>
                    )}

                  <div className="field-group">
                    <label>I want to join as</label>

                    <div className="role-options">
                      {['Member', 'Manager'].map((item) => (
                        <button
                          key={item}
                          type="button"
                          className={`role-option ${
                            role === item ? 'role-selected' : ''
                          }`}
                          onClick={() => setRole(item)}
                          aria-pressed={role === item}
                        >
                          <span className="role-symbol">
                            {item === 'Manager' ? '♙' : '♧'}
                          </span>

                          <span className="role-description">
                            <strong>{item}</strong>
                            <small>
                              {item === 'Manager'
                                ? 'Organise projects'
                                : 'Collaborate on tasks'}
                            </small>
                          </span>

                          <span className="role-radio">
                            {role === item ? '✓' : ''}
                          </span>
                        </button>
                      ))}
                    </div>

                    <p className="field-hint">
                      Actual permissions will be controlled by the backend.
                    </p>
                  </div>
                </>
              )}

              {message && (
                <div
                  className={`form-message ${
                    messageType === 'info' ? 'message-info' : ''
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {message}
                </div>
              )}

              <button type="submit" className="submit-button">
                {isSignup ? 'Create account' : 'Sign in'}
                <span aria-hidden="true">→</span>
              </button>

              <p className="switch-prompt">
                {isSignup
                  ? 'Already have an account?'
                  : "Don't have an account yet?"}{' '}

                <button
                  type="button"
                  className="text-button"
                  onClick={() => switchMode(isSignup ? 'login' : 'signup')}
                >
                  {isSignup ? 'Sign in' : 'Sign up'}
                </button>
              </p>
            </form>

            <div className="security-note">
              <span aria-hidden="true">⌑</span>
              <span>Your workspace, organised in one place.</span>
            </div>
          </div>
        </section>
      </section>

      <footer className="page-footer">
        <span>© {new Date().getFullYear()} TaskFlow</span>

        <span className="team-credit">
          Built by the TaskFlow Management System team
          <span className="team-names">
            Garnepally Varsha · Mohammed Muneeb · Eeravathini Bhargav
          </span>
        </span>
      </footer>
    </main>
  )
}

export default App