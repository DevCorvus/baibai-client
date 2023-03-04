import { createBrowserRouter } from 'react-router-dom';
import RootPage from './pages/RootPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import ProductFormPage from './pages/ProductFormPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <NotFoundPage />,
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
        path: 'products/add',
        element: <ProductFormPage />,
      },
      {
        path: 'products/:id',
        element: <ProductDetailsPage />,
      },
      {
        path: 'shopping-cart',
        element: <ShoppingCartPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
]);
