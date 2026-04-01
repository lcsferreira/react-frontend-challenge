import type { Genre } from "../model/types"

/**
 * Formats the release date to a local string representation.
 */
export const formatDate = (date: string | undefined): string => {
  if (!date) return "N/A"
  try {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  } catch {
    return "Data Inválida"
  }
}

/**
 * Formats the vote average (rating) to one decimal place.
 */
export const formatRating = (rating: number | undefined): string => {
  if (rating === undefined || rating === 0) return "N/A"
  return rating.toFixed(1)
}

/**
 * Formats a list of Genre objects into a comma-separated string.
 */
export const formatGenres = (genres: Genre[] | undefined): string => {
  if (!genres || genres.length === 0) return "Desconhecido"
  return genres.map((g) => g.name).join(", ")
}
