import ProductList from "@/components/product-list"
import { FavoritesProvider } from "@/components/favorites-context"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import FavoritesSidebar from "@/components/favorites-sidebar"
import Header from "@/components/header"

export default function Home() {
  return (
    <FavoritesProvider>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <SidebarInset>
            <Header />
            <main className="container mx-auto px-4 py-8">
              <ProductList />
            </main>
          </SidebarInset>
          <FavoritesSidebar />
        </div>
      </SidebarProvider>
    </FavoritesProvider>
  )
}
