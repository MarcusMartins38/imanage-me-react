import { useCookies } from "react-cookie";
import { Outlet, Navigate } from "react-router";

export const AuthRoute = () => {
  const [cookie] = useCookies(["userAuth"]);

  if (!cookie.userAuth) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};

export const UnauthRoute = () => {
  const [cookie] = useCookies(["userAuth"]);

  if (cookie.userAuth) {
    return <Navigate to={"/tasks"} />;
  }

  return <Outlet />;
};
