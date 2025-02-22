import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { resetUser, updateUser } from "../redux/slices/userSlice";
import { api } from "./api";
import { useEffect, useState } from "react";

export const AuthRoute = () => {
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

    return user.email ? <Outlet /> : <Navigate to={"/login"} />;
};

export const UnauthRoute = () => {
    const user = useSelector((state: RootState) => state.user);
    api.get("/user/me").then((data) => console.log({ data }));

    if (user.email) {
        return <Navigate to={"/tasks"} />;
    }

    return <Outlet />;
};
