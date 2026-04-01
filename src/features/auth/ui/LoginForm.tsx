import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '../model/store'
import { loginSchema, type LoginFormValues } from '../model/schema'
import { authApi } from '../api/auth'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/shared/ui/card'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

export function LoginForm() {
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const { request_token: initialToken } = await authApi.getRequestToken()
      
      await authApi.validateWithLogin({
        username: data.username,
        password: data.password,
        request_token: initialToken,
      })
      
      const { session_id } = await authApi.createSession(initialToken)
      
      login(data.username, session_id)
      toast.success('Login realizado com sucesso!')
      navigate({ to: '/' })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao realizar login'
      toast.error(message)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Login TMDB</CardTitle>
        <CardDescription className="text-center">
          Use suas credenciais do The Movie Database para entrar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              placeholder="seu_usuario"
              {...register('username')}
              className={errors.username ? 'border-destructive' : ''}
            />
            {errors.username && (
              <p className="text-sm font-medium text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className={errors.password ? 'border-destructive' : ''}
            />
            {errors.password && (
              <p className="text-sm font-medium text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Autenticando...' : 'Entrar'}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-center w-full text-muted-foreground">
          Precisa de uma conta? <a href="https://www.themoviedb.org/signup" target="_blank" rel="noreferrer" className="text-primary hover:underline">Cadastre-se no TMDB</a>
        </p>
      </CardFooter>
    </Card>
  )
}

