import React from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Sneakers, { loader as sneakersLoader } from "./pages/sneakers/Sneakers";
import SneakerDetails, { loader as sneakerDetailsLoader } from "./pages/sneakers/SneakerDetails";
import Login, { action as loginAction, loader as loginLoader } from "./pages/Login";
import Signup, { action as signupAction} from "./pages/Signup";
import FetchError from "./components/FetchError";
import Users, { loader as userLoader } from "./pages/Users";
import Success, { loader as successLoader } from "./pages/Success";
import RouteError from "./pages/RouteError";
import UserNavbar, { loader as userNavbarLoader } from "./components/UserNavbar";
import Orders, { loader as ordersLoader } from "./pages/Orders";

const router = createBrowserRouter(createRoutesFromElements(
  <>
      <Route element={<Layout />} errorElement={<FetchError />}>
      <Route path="/" element={<Home />} errorElement={<FetchError />} />
      <Route path="sneakers" element={<Sneakers />} loader={sneakersLoader} errorElement={<FetchError />} />
      <Route path="sneakers/:id" element={<SneakerDetails />} loader={sneakerDetailsLoader} errorElement={<FetchError />} />
      <Route path="login" element={<Login />} action={loginAction} loader={loginLoader} errorElement={<FetchError />} />
      <Route path="signup" element={<Signup />} action={signupAction} errorElement={<FetchError />} />
      <Route path="user/:id" element={<UserNavbar />} loader={userNavbarLoader} errorElement={<FetchError />}>
        <Route index element={<Users />} loader={userLoader} errorElement={<FetchError />} />
        <Route path="orders" element={<Orders />} loader={ordersLoader} errorElement={<FetchError />} />
      </Route>
      <Route path="success/:id" element={<Success />} loader={successLoader} errorElement={<FetchError />} />
      <Route path="*" element={<RouteError />} errorElement={<FetchError />} />
    </Route>
  </>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}