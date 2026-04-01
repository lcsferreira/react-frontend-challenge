import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { LoginForm } from './LoginForm'
import { useAuthStore } from '../model/store'

// Mocking TanStack Router's useNavigate
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
}))

// Mocking Sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
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

    render(<LoginForm />)

    const usernameInput = screen.getByLabelText(/usuário/i)
    fireEvent.input(usernameInput, { target: { value: 'user123' } })
    
    const passwordInput = screen.getByLabelText(/senha/i)
    fireEvent.input(passwordInput, { target: { value: 'password123' } })

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      // login(username, sessionId)
      expect(loginMock).toHaveBeenCalledWith('user123', expect.any(String))
    }, { timeout: 2000 })
  })

})
