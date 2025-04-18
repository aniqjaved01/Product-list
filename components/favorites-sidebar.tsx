"use client"

import { useFavorites } from "./favorites-context"
import { Heart, X, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"

interface FavoriteItemProps {
  product: Product
  onRemove: (product: Product) => void
}

function FavoriteItem({ product, onRemove }: FavoriteItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 border-b group">
      <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
      </div>
      <button
        onClick={() => onRemove(product)}
        className="p-1.5 text-gray-400 hover:text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Remove from favorites"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export default function FavoritesSidebar({ side = "right" }: { side?: "left" | "right" }) {
  const { getFavoriteProducts, toggleFavorite } = useFavorites()
  const favoriteProducts = getFavoriteProducts()

  return (
    <Sidebar side={side} className="border-l">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          <h2 className="font-semibold">Favorites</h2>
          <Badge variant="secondary" className="ml-auto">
            {favoriteProducts.length}
          </Badge>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {favoriteProducts.length > 0 ? (
          <ScrollArea className="h-[calc(100vh-180px)]">
            {favoriteProducts.map((product) => (
              <FavoriteItem key={product.id} product={product} onRemove={toggleFavorite} />
            ))}
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-180px)] p-4 text-center text-gray-500">
            <Heart className="h-12 w-12 mb-2 stroke-1" />
            <p>No favorites yet</p>
            <p className="text-sm mt-1">Click the heart icon on products to add them to your favorites</p>
          </div>
        )}
      </SidebarContent>

      {favoriteProducts.length > 0 && (
        <SidebarFooter className="border-t p-4">
          <Button className="w-full gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span>Checkout Favorites</span>
          </Button>
        </SidebarFooter>
      )}
    </Sidebar>
  )
}
