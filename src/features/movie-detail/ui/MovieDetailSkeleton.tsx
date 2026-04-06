import { Skeleton } from "@/shared/ui/skeleton"

export const MovieDetailSkeleton = () => {
  return (
    <div className="container flex flex-col gap-12 py-8 animate-pulse">
      <div className="relative min-h-[500px] w-full rounded-[2rem] bg-muted/20 border border-muted/10 overflow-hidden p-12">
        <div className="flex flex-col md:flex-row gap-8 items-end h-full">
           <Skeleton className="w-[280px] aspect-[2/3] rounded-2xl flex-shrink-0" />
           <div className="flex-1 space-y-6 pb-4">
              <div className="flex gap-4">
                 <Skeleton className="h-6 w-24 rounded-full" />
                 <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-20 w-3/4 rounded-2xl" />
              <div className="space-y-3">
                 <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-5/6" />
                 <Skeleton className="h-4 w-2/3 opacity-50" />
              </div>
              <div className="flex gap-4 pt-4">
                 <Skeleton className="h-14 w-48 rounded-full" />
                 <Skeleton className="h-14 w-14 rounded-full" />
              </div>
           </div>
        </div>
      </div>

      <div className="space-y-6">
        <Skeleton className="h-8 w-64 rounded-full" />
        <div className="flex gap-4 overflow-x-auto pb-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-32 space-y-3">
              <Skeleton className="h-44 w-full rounded-2xl" />
              <Skeleton className="h-4 w-3/4 rounded-md" />
              <Skeleton className="h-3 w-1/2 rounded-md opacity-50" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <Skeleton className="h-8 w-64 rounded-full" />
        <Skeleton className="aspect-video w-full rounded-[2.5rem]" />
      </div>
    </div>
  )
}
