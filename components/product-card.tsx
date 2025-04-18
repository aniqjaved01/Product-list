"use client"

import { memo, useRef, useEffect, useState, type KeyboardEvent } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"
import { useFavorites } from "./favorites-context"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [isVisible, setIsVisible] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const favorite = isFavorite(product.id)

  // Handle keyboard events for accessibility
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggleFavorite(product)
    }
  }

  // Lazy load images using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      <div ref={imageRef} className="relative h-48 bg-gray-100">
        {isVisible && (
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className={cn("object-cover transition-opacity duration-300", isImageLoaded ? "opacity-100" : "opacity-0")}
            onLoad={() => setIsImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <button
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm z-10 focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => toggleFavorite(product)}
          onKeyDown={handleKeyDown}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          tabIndex={0}
        >
          <Heart
            className={cn("h-5 w-5 transition-colors", favorite ? "fill-red-500 text-red-500" : "text-gray-400")}
          />
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold line-clamp-1">{product.name}</h2>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <span className="text-sm text-gray-500">{product.category}</span>
        </div>
      </div>
    </div>
  )
}

// Use memo to prevent unnecessary re-renders
export default memo(ProductCard)
