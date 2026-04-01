import { describe, it, expect } from 'vitest'
import { loginSchema } from './schema'

describe('loginSchema', () => {
  it('should validate a valid username and password', () => {
    const data = { username: 'testuser', password: 'password123' }
    const result = loginSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('should reject an empty username', () => {
    const data = { username: '', password: 'password123' }
    const result = loginSchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Nome de usuário obrigatório')
    }
  })

  it('should reject a password with less than 6 characters', () => {
    const data = { username: 'testuser', password: '12345' }
    const result = loginSchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('A senha deve ter pelo menos 6 caracteres')
    }
  })


  it('should reject empty fields', () => {
    const data = { email: '', password: '' }
    const result = loginSchema.safeParse(data)
    expect(result.success).toBe(false)
  })
})
