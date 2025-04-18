"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { useFavorites } from "./favorites-context"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const { toggleSidebar } = useSidebar()
  const { getFavoriteProducts } = useFavorites()
  const favoriteProducts = getFavoriteProducts()

  return (
    <header className="sticky top-0 z-10 bg-background border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">Product Catalog</h1>

        <Button variant="outline" size="sm" className="gap-2" onClick={toggleSidebar}>
          <Heart className="h-4 w-4" />
          <span>Favorites</span>
          {favoriteProducts.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {favoriteProducts.length}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  )
}
