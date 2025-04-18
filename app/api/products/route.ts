import { NextResponse } from "next/server"
import type { Product } from "@/lib/types"

// Mock data generator
function generateMockProducts(page: number, limit: number): Product[] {
  const startIndex = (page - 1) * limit
  const products: Product[] = []

  const categories = ["Electronics", "Clothing", "Home", "Books", "Sports"]

  for (let i = 0; i < limit; i++) {
    const id = `product-${startIndex + i + 1}`
    products.push({
      id,
      name: `Product ${startIndex + i + 1}`,
      description: `This is a description for product ${startIndex + i + 1}. It contains all the important details about the product that a customer might want to know.`,
      price: Math.floor(Math.random() * 100) + 10,
      category: categories[Math.floor(Math.random() * categories.length)],
      image: `https://picsum.photos/seed/${id}/400/300`,
    })
  }

  return products
}

export async function GET(request: Request) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const url = new URL(request.url)
  const page = Number.parseInt(url.searchParams.get("page") || "1")
  const limit = Number.parseInt(url.searchParams.get("limit") || "20")

  // Generate mock products
  const products = generateMockProducts(page, limit)

  // Simulate end of data after 5 pages
  if (page > 5) {
    return NextResponse.json([])
  }

  return NextResponse.json(products)
}
