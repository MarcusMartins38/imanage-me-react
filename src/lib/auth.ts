import { resetUser } from "../redux/slices/userSlice";
import { store } from "../redux/store";

export const signOutAction = () => {
    store.dispatch(resetUser());
    window.location.href = "/login";
};
