import {  useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const location = useLocation();

  if (!isAuth) {
    return (
      <Navigate
        to="/login"
        state={{ pathname: location.pathname }}
        replace={true}
      />
    );
  }

  return children;
};
