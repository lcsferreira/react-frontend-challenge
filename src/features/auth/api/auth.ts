import { tmdbFetch } from '@/shared/api/tmdb'

interface RequestTokenResponse {
  success: boolean
  expires_at: string
  request_token: string
}

interface SessionResponse {
  success: boolean
  session_id: string
}

export const authApi = {
  getRequestToken: async () => {
    return tmdbFetch<RequestTokenResponse>('/authentication/token/new')
  },

  validateWithLogin: async (params: {
    username: string
    password: string
    request_token: string
  }) => {
    return tmdbFetch<RequestTokenResponse>('/authentication/token/validate_with_login', {
      method: 'POST',
      body: JSON.stringify(params),
    })
  },

  createSession: async (request_token: string) => {
    return tmdbFetch<SessionResponse>('/authentication/session/new', {
      method: 'POST',
      body: JSON.stringify({ request_token }),
    })
  },
}
