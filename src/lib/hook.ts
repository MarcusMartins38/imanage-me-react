import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { resetUser } from "../slices/userSlice";
import { jwtDecode } from "jwt-decode";

export const useAuthRefreshToken = () => {
  const [cookie, setCookie] = useCookies(["userAuth"]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();

  const makeRefreshTokenRequest = async () => {
    setIsRefreshing(true);
    const res = await fetch("http://localhost:3333/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Error trying to refresh token");

    return res.json();
  };

  const refresh = useMutation({
    mutationFn: makeRefreshTokenRequest,
    scope: {
      id: "refresh",
    },
    onSuccess: (data) => {
      setCookie("userAuth", {
        ...cookie.userAuth,
        accessToken: data.accessToken,
      });
    },
    onError: () => {
      setCookie("userAuth", null);
      dispatch(resetUser());
    },
    onSettled: () => {
      setIsRefreshing(false);
    },
  });

  useEffect(() => {
    if (!cookie.userAuth.accessToken) {
      setIsRefreshing(false);
      return;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const decodedToken = jwtDecode(cookie.userAuth.accessToken);

    if (decodedToken.exp && decodedToken.exp <= currentTime) {
      refresh.mutate();
    } else {
      setIsRefreshing(false);
    }
  }, [cookie.userAuth?.accessToken]);

  return { isRefreshing, hasAuth: !!cookie.userAuth?.accessToken };
};
