import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Feed } from "../pages/Feed";
import { Explore } from "../pages/Explore";
import { Account } from "../pages/Account";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { PrivateRoute } from "./PrivateRoute";
import { AddRecipeModal } from "../pages/AddRecipeModal";
import SingleRecipe from "../pages/SingleRecipe";
import Admin from "../pages/Admin";
import { SingleUser } from "../pages/SingleUser";

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
            <AddRecipeModal />
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
      <Route
        path="/recipe/:postId"
        element={
          <PrivateRoute>
            <SingleRecipe />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/user/:userId"
        element={
            <SingleUser />
        }
      ></Route>
      <Route
        path="/admin"
        element={
          // <PrivateRoute>
            <Admin />
          // </PrivateRoute>
        }
      ></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};
