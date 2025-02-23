import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const AuthLayout = () => {
    const isSidebarOpen = useSelector(
        (state: RootState) => state.sidebar.isOpen,
    );

    return (
        <>
            <Sidebar />
            <main
                style={{
                    width: isSidebarOpen
                        ? `calc(100% - 256px)`
                        : `calc(100% - 64px)`,
                    marginLeft: isSidebarOpen ? "256px" : "64px",
                }}
            >
                <Outlet />
            </main>
        </>
    );
};

export default AuthLayout;
