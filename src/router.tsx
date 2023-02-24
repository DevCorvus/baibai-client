import { createBrowserRouter } from 'react-router-dom';
import RootPage from './pages/RootPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

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
        path: 'products/:id',
        element: <ProductDetailsPage />,
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