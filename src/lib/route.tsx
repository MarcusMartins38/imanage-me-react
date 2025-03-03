import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { resetUser, updateUser } from "../redux/slices/userSlice";
import { api } from "./api";
import { useEffect, useState } from "react";
import { RootState } from "../redux/store";

export const AuthRoute = ({ Unauth = false }) => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            if (!user.email) {
                try {
                    const response = await api.get("/user/me");
                    dispatch(
                        updateUser({
                            name: response.data.name,
                            email: response.data.email,
                            imageUrl: response.data.imageUrl,
                        }),
                    );
                } catch (error) {
                    dispatch(resetUser());
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [user.email]);

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (Unauth) {
        return !user.email ? <Outlet /> : <Navigate to={"/tasks"} />;
    }

    return user.email ? <Outlet /> : <Navigate to={"/login"} />;
};
