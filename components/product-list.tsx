"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import ProductCard from "./product-card"
import type { Product } from "@/lib/types"
import { Loader2 } from "lucide-react"

// Simulated API endpoint for fetching products
const API_URL = "/api/products"
const PRODUCTS_PER_PAGE = 20

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingRef = useRef<HTMLDivElement>(null)

  // Fetch products function
  const fetchProducts = useCallback(async (pageNum: number) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}?page=${pageNum}&limit=${PRODUCTS_PER_PAGE}`)
      const data = await response.json()

      if (data.length < PRODUCTS_PER_PAGE) {
        setHasMore(false)
      }

      setProducts((prev) => [...prev, ...data])
      setLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error)
      setLoading(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    fetchProducts(1)
  }, [fetchProducts])

  // Infinite scroll using Intersection Observer
  useEffect(() => {
    if (loading) return

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1)
      }
    }

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: "100px",
    })

    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [loading, hasMore])

  // Load more products when page changes
  useEffect(() => {
    if (page > 1) {
      fetchProducts(page)
    }
  }, [page, fetchProducts])

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div ref={loadingRef} className="flex justify-center items-center py-8">
          {loading && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span>Loading more products...</span>
            </div>
          )}
        </div>
      )}

      {!hasMore && products.length > 0 && <p className="text-center py-8 text-gray-500">No more products to load</p>}

      {products.length === 0 && !loading && <p className="text-center py-8 text-gray-500">No products found</p>}
    </div>
  )
}
