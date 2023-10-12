import { lazy } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const RootLayout = lazy(() => import('@/layout/RootLayout/RootLayout'));
const Home = lazy(() => import('@/pages/Home/Home'));
const SignIn = lazy(() => import('@/pages/SignIn/SignIn'));
const SignUs = lazy(() => import('@/pages/SignUs/SignUs'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/lumieleu" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signus" element={<SignUs />} />
    </Route>
  )
);

export default router;
