import { useParams } from '@tanstack/react-router'

export function MovieDetailPage() {
  const { movieId } = useParams({ from: '/movie/$movieId' })

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Movie Details</h1>
      <p className="text-muted-foreground">Currently viewing movie ID: {movieId}</p>
    </div>
  )
}
