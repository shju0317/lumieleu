import { lazy } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const RootLayout = lazy(() => import('@/layout/RootLayout/RootLayout'));
const Home = lazy(() => import('@/pages/Home/Home'));
const Cart = lazy(() => import('@/pages/Cart/Cart'));
const Order = lazy(() => import('@/pages/Order/Order'));
const SignIn = lazy(() => import('@/pages/SignIn/SignIn'));
const SignUs = lazy(() => import('@/pages/SignUs/SignUs'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/lumieleu" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="order/:userId" element={<Order />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signus" element={<SignUs />} />
    </Route>
  )
);

export default router;
