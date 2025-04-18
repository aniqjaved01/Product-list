"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Product } from "@/lib/types"

type FavoritesContextType = {
  favorites: Map<string, Product>
  toggleFavorite: (product: Product) => void
  isFavorite: (id: string) => boolean
  getFavoriteProducts: () => Product[]
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Map<string, Product>>(new Map())

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Map(prevFavorites)
      if (newFavorites.has(product.id)) {
        newFavorites.delete(product.id)
      } else {
        newFavorites.set(product.id, product)
      }
      return newFavorites
    })
  }, [])

  const isFavorite = useCallback((id: string) => favorites.has(id), [favorites])

  const getFavoriteProducts = useCallback(() => {
    return Array.from(favorites.values())
  }, [favorites])

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, getFavoriteProducts }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
