# Product List with Favorites

A modern, responsive e-commerce product catalog built with Next.js and shadcn/ui components, featuring a favorites system that allows users to save and manage their favorite products.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript for better developer experience
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components built with Radix UI and Tailwind CSS
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icon toolkit

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aniqjaved01/Product-list.git
   cd Product-list
   ```

2. Install dependencies:
   ```bash
   npm install force
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Key Components

### Favorites Context

The `FavoritesContext` manages the state of favorited products across the application. It provides:

- `favorites`: A Map containing all favorited products
- `toggleFavorite`: Function to add/remove products from favorites
- `isFavorite`: Function to check if a product is in favorites
- `getFavoriteProducts`: Function to get all favorited products as an array

### Product List

The `ProductList` component displays products in a responsive grid with infinite scrolling. As the user scrolls down, more products are loaded automatically.

### Favorites Sidebar

The `FavoritesSidebar` component displays all favorited products in a collapsible sidebar. Users can:

- View all their favorited products
- Remove products from favorites
- Proceed to checkout with their favorited products

