import ProductList from "@/components/product-list"
import { FavoritesProvider } from "@/components/favorites-context"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>
      <FavoritesProvider>
        <ProductList />
      </FavoritesProvider>
    </main>
  )
}
