import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, 'Nome de usuário obrigatório'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})


export type LoginFormValues = z.infer<typeof loginSchema>
