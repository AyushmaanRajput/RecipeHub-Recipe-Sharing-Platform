import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Feed } from "../pages/Feed";
import { Explore } from "../pages/Explore";
import { Account } from "../pages/Account";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { PrivateRoute } from "./PrivateRoute";
import { UserRecipes } from "../pages/UserRecipes";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/explore" element={<Explore />}></Route>
      <Route
        path="/feed"
        element={
          <PrivateRoute>
            <Feed />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/user-recipes"
        element={
          <PrivateRoute>
            <UserRecipes />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/account"
        element={
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};
