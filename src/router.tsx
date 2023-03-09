import { createBrowserRouter } from 'react-router-dom';
import RootPage from './pages/RootPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import ProductFormPage from './pages/ProductFormPage';
import ProtectRoute from './middlewares/ProtectRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        path: '',
        element: <ProductListPage />,
      },
      {
        path: 'products',
        element: <ProductListPage />,
      },
      {
        path: 'products/:id',
        element: <ProductDetailsPage />,
      },
      {
        path: 'products/add',
        element: (
          <ProtectRoute>
            <ProductFormPage />
          </ProtectRoute>
        ),
      },
      {
        path: 'products/:id/edit',
        element: (
          <ProtectRoute>
            <ProductFormPage />
          </ProtectRoute>
        ),
      },
      {
        path: 'shopping-cart',
        element: (
          <ProtectRoute>
            <ShoppingCartPage />
          </ProtectRoute>
        ),
      },
      {
        path: 'login',
        element: (
          <ProtectRoute guestOnly>
            <LoginPage />
          </ProtectRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <ProtectRoute guestOnly>
            <RegisterPage />
          </ProtectRoute>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
