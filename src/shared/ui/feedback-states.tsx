import { AlertCircle, FileSearch, RefreshCcw } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/shared/lib/utils"

interface EmptyStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
  className?: string
}

export const EmptyState = ({
  title = "Nenhum resultado encontrado",
  description = "Tente mudar os filtros ou refazer sua busca.",
  actionLabel,
  onAction,
  icon,
  className,
}: EmptyStateProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center bg-card/20 backdrop-blur-md rounded-[2rem] border border-muted/20 animate-in fade-in zoom-in duration-500", className)}>
      <div className="bg-primary/10 p-5 rounded-full mb-6">
        {icon || <FileSearch className="h-10 w-10 text-primary opacity-50" />}
      </div>
      <h3 className="text-2xl font-black mb-2 tracking-tight">{title}</h3>
      <p className="text-muted-foreground max-w-[400px] mb-8">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" className="rounded-full px-8">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export const ErrorState = ({
  title = "Ops! Algo deu errado",
  description = "Não conseguimos carregar as informações agora.",
  onRetry,
  className,
}: ErrorStateProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center bg-destructive/5 backdrop-blur-md rounded-[2rem] border border-destructive/10 animate-in fade-in zoom-in duration-500", className)}>
      <div className="bg-destructive/10 p-5 rounded-full mb-6 border border-destructive/20 shadow-xl shadow-destructive/5">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>
      <h3 className="text-2xl font-black mb-2 tracking-tight">{title}</h3>
      <p className="text-muted-foreground max-w-[400px] mb-8">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="destructive" className="rounded-full px-8 gap-2 group transition-all">
          <RefreshCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
          Tentar novamente
        </Button>
      )}
    </div>
  )
}
