import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card"
import { Skeleton } from "@/shared/ui/skeleton"
import { cn } from "@/shared/lib/utils"

interface MovieCardSkeletonProps {
  className?: string
}

export const MovieCardSkeleton = ({ className }: MovieCardSkeletonProps) => {
  return (
    <Card className={cn("flex h-full flex-col overflow-hidden border-muted/20 bg-muted/10 backdrop-blur-sm", className)}>
      <CardHeader className="p-0">
        <Skeleton className="aspect-[2/3] w-full rounded-none" />
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        <Skeleton className="h-6 w-3/4 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-full opacity-60" />
          <Skeleton className="h-3 w-5/6 opacity-60" />
          <Skeleton className="h-3 w-4/6 opacity-40" />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-4 border-t border-muted/10">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3 rounded-full opacity-30" />
          <Skeleton className="h-3 w-20 opacity-30" />
        </div>
        <Skeleton className="h-3 w-12 opacity-30" />
      </CardFooter>
    </Card>
  )
}
