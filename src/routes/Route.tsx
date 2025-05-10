import { type RouteObject }  from 'react-router-dom';
import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import ListOrder from '../components/pages/ListOrder';
import Cart from '../components/pages/Cart'
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../components/pages/Layouts/MainLayout';
import type { JSX } from 'react';
import Menu from '../components/pages/Menu';

const withProtectionAndLayout = (component: JSX.Element) => (
  <ProtectedRoute>
    <MainLayout>{component}</MainLayout>
  </ProtectedRoute>
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: withProtectionAndLayout(<Home />),
  },
  {
    path: '/login',
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: '/menu',
    element: withProtectionAndLayout(<Menu />),
  },
  {
    path: '/order',
    element: withProtectionAndLayout(<ListOrder />),
  },
  {
    path: '/cart',
    element: withProtectionAndLayout(<Cart />),
  },
];

export default routes;
