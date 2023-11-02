import { lazy } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ProductDetails from './pages/ProductDetails/ProductDetails';

const RootLayout = lazy(() => import('@/layout/RootLayout/RootLayout'));
const Home = lazy(() => import('@/pages/Home/Home'));
const Cart = lazy(() => import('@/pages/Cart/Cart'));
const Order = lazy(() => import('@/pages/Order/Order'));
const SignIn = lazy(() => import('@/pages/SignIn/SignIn'));
const SignUs = lazy(() => import('@/pages/SignUs/SignUs'));
const Gallery = lazy(() => import('@/pages/Gallery/GalleryPage'));
const About = lazy(() => import('@/pages/About/About'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/lumieleu" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="order" element={<Order />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signus" element={<SignUs />} />
      <Route path="productdetails/:productId" element={<ProductDetails />} />
      <Route path="gallery" element={<Gallery />} />
      <Route path="about" element={<About />} />
    </Route>
  )
);

export default router;
