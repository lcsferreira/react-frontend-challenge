import { LoginForm } from '@/features/auth/ui/LoginForm'

export function LoginPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] p-4 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] bg-sky-500/5 rounded-full blur-3xl -z-10" />
      
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Bem-vindo de volta</h1>
          <p className="text-muted-foreground">Acesse sua conta de curador do CineDash</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}


