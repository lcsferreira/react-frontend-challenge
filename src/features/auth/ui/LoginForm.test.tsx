import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { LoginForm } from './LoginForm'
import { useAuthStore } from '../model/store'
import { authApi } from '../api/auth'

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
}))

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

vi.mock('../api/auth', () => ({
  authApi: {
    getRequestToken: vi.fn(),
    validateWithLogin: vi.fn(),
    createSession: vi.fn(),
  },
}))

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuthStore.setState({
      token: null,
      user: null,
      isAuthenticated: false,
    })
  })

  it('should render the login form correctly', () => {
    render(<LoginForm />)
    
    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('should show validation errors for invalid input', async () => {
    render(<LoginForm />)
    
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByText(/nome de usuário obrigatório/i)).toBeInTheDocument()
    expect(await screen.findByText(/a senha deve ter pelo menos 6 caracteres/i)).toBeInTheDocument()
  })

  it('should call login and redirect on successful submit', async () => {
    const loginMock = vi.fn()
    useAuthStore.setState({ login: loginMock })

    vi.mocked(authApi.getRequestToken).mockResolvedValue({ 
      success: true, 
      expires_at: '2026-04-01T20:00:00Z', 
      request_token: 'valid_token' 
    })
    vi.mocked(authApi.validateWithLogin).mockResolvedValue({ 
      success: true, 
      expires_at: '2026-04-01T20:00:00Z', 
      request_token: 'valid_token' 
    })
    vi.mocked(authApi.createSession).mockResolvedValue({ 
      success: true, 
      session_id: 'session123' 
    })

    render(<LoginForm />)

    const usernameInput = screen.getByLabelText(/usuário/i)
    fireEvent.change(usernameInput, { target: { value: 'user123' } })
    
    const passwordInput = screen.getByLabelText(/senha/i)
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith('user123', 'session123')
    }, { timeout: 2000 })
  })

})
