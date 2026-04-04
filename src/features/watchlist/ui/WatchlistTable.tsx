import { useState, useEffect } from "react"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table"
import { getColumns } from "./columns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { useWatchlistStore } from "../model/store"
import { ListFilter } from "lucide-react"
import { EmptyState } from "@/shared/ui/feedback-states"
import { useRouter } from "@tanstack/react-router"

interface WatchlistTableProps {
  onMovieClick: (id: number) => void
}

export const WatchlistTable = ({ onMovieClick }: WatchlistTableProps) => {
  const { movies, removeMovie } = useWatchlistStore()
  const [sorting, setSorting] = useState<SortingState>([])
  const [isHydrated, setIsHydrated] = useState(false)
  const { navigate } = useRouter()

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const columns = getColumns(removeMovie, onMovieClick)

  const table = useReactTable({
    data: movies,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  if (!isHydrated) return null

  if (movies.length === 0) {
    return (
      <EmptyState 
        title="Sua watchlist está vazia"
        description="Comece a explorar filmes no Dashboard e adicione seus favoritos aqui."
        actionLabel="Explorar Filmes"
        onAction={() => navigate({ to: "/" })}
      />
    )
  }

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-5 duration-700">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <ListFilter className="h-4 w-4 text-primary" />
          <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground opacity-80">
            Total de {movies.length} filmes
          </span>
        </div>
      </div>
      
      <div className="rounded-xl border border-muted/20 bg-card/20 backdrop-blur-md overflow-hidden shadow-xl shadow-background/50">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead 
                      key={header.id} 
                      className="cursor-pointer select-none transition-colors hover:text-foreground group"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                             {{
                              asc: ' ↑',
                              desc: ' ↓',
                            }[header.column.getIsSorted() as string] ?? ' ↕'}
                          </span>
                        )}
                      </div>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="transition-all group-hover:translate-x-0.5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
