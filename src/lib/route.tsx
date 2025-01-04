import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { updateUser } from "../slices/userSlice";

export const AuthRoute = () => {
  const [cookie] = useCookies(["userAuth"]);
  const dispatch = useDispatch();

  if (!cookie.userAuth?.accessToken) {
    return <Navigate to={"/login"} />;
  }

  dispatch(
    updateUser({
      name: cookie.userAuth.user.name,
      email: cookie.userAuth.user.email,
      imageUrl: cookie.userAuth.user.imageUrl,
    }),
  );

  return <Outlet />;
};

export const UnauthRoute = () => {
  const [cookie] = useCookies(["userAuth"]);

  if (cookie.userAuth?.accessToken) {
    return <Navigate to={"/tasks"} />;
  }

  return <Outlet />;
};
