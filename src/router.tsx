import { createBrowserRouter } from 'react-router-dom';
import RootPage from './pages/RootPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import ProtectRoute from './middlewares/ProtectRoute';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import AppError from './components/states/AppError';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <AppError />,
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
            <AddProductPage />
          </ProtectRoute>
        ),
      },
      {
        path: 'products/:id/edit',
        element: (
          <ProtectRoute>
            <EditProductPage />
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
