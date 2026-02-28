import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router';
import { CartProvider } from '@/context/CartContext';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import About from '@/pages/About';

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <CartProvider>
      <Layout />
    </CartProvider>
  ),
});

// Child routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: Products,
  validateSearch: (search: Record<string, unknown>): { category?: string } => ({
    category: typeof search.category === 'string' ? search.category : undefined,
  }),
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/$id',
  component: ProductDetail,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  productDetailRoute,
  aboutRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
