import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { closeSidebar, openSidebar } from "../redux/slices/sidebarSlice";
import { updateUser } from "../redux/slices/userSlice";
import { changeTheme } from "../redux/slices/uiSlice";
import { useEffect } from "react";
import AboutMeIcon from "../assets/icons/AboutMeIcon";
import TaskIcon from "../assets/icons/TaskIcon";
import ArrowRight from "../assets/icons/ArrowRight";
import ArrowLeft from "../assets/icons/ArrowLeft";
import LogoutIcon from "../assets/icons/LogoutIcon";
import LightThemeIcon from "../assets/icons/LightThemeIcon";
import DarkThemeIcon from "../assets/icons/DarkThemeIcon";
import { RootState } from "../redux/store";

const Sidebar = () => {
    const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
    const theme = useSelector((state: RootState) => state.ui.theme);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const handleToggleClick = () => {
        if (isOpen) {
            dispatch(closeSidebar());
        } else {
            dispatch(openSidebar());
        }
    };

    const handleLogoutClick = () => {
        dispatch(updateUser({ name: "", email: "", imageUrl: "" }));
        navigate("/login");
    };

    const handleThemeToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        dispatch(changeTheme({ theme: newTheme }));
    };

    return (
        <div className="flex h-screen fixed">
            <div
                className={`bg-base-200 transition-width duration-300 ${
                    isOpen ? "w-64" : "w-16"
                }`}
                style={{
                    borderRadius: "0 24px 24px 0",
                }}
            >
                <div className="menu p-2 !pt-0 h-full flex flex-col justify-between">
                    <div>
                        <section className="p-2">
                            <button
                                onClick={handleToggleClick}
                                className="btn btn-ghost w-full py-2 px-0"
                            >
                                {isOpen ? <ArrowLeft /> : <ArrowRight />}
                            </button>
                        </section>
                        <NavLink
                            to="/tasks"
                            className="menu-item flex items-center w-full h-10 rounded-lg px-1 transition-all duration-300 hover:bg-base-300"
                        >
                            <TaskIcon isOpen={isOpen} />
                            {isOpen && <span>Tasks</span>}
                        </NavLink>

                        <NavLink
                            to="/about"
                            className="menu-item flex items-center w-full h-10 rounded-lg px-1 transition-all duration-300 hover:bg-base-300"
                        >
                            <AboutMeIcon isOpen={isOpen} />
                            {isOpen && <span className="ml-1">About Me</span>}
                        </NavLink>
                    </div>

                    <div className="mb-2 bottom-0 w-full">
                        <label
                            className={`menu-item justify-start w-full h-10 swap swap-rotate rounded-lg px-[3px] transition-all flex items-center ${isOpen ? "max-w-60" : "max-w-12 justify-center"} duration-300 hover:bg-base-300`}
                        >
                            <input
                                type="checkbox"
                                className="theme-controller"
                                checked={theme === "light"}
                                onChange={handleThemeToggle}
                            />
                            {theme === "dark" ? (
                                <LightThemeIcon />
                            ) : (
                                <DarkThemeIcon />
                            )}

                            {isOpen && (
                                <span className="ml-[2px]">Switch Theme</span>
                            )}
                        </label>

                        <NavLink
                            to="/settings"
                            className={`menu-item flex items-center w-full h-10 rounded-lg px-1 transition-all ${isOpen ? "max-w-60" : "max-w-12"} duration-300 hover:bg-base-300`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`icon icon-tabler icons-tabler-outline icon-tabler-settings ${isOpen ? "mr-1" : "m-auto"}`}
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                            </svg>
                            {isOpen && <span>Settings</span>}
                        </NavLink>

                        <button
                            type="button"
                            onClick={handleLogoutClick}
                            className={`menu-item flex items-center w-full h-10 rounded-lg px-1 transition-all group hover:bg-red-500 ${isOpen ? "max-w-60" : "max-w-12"} duration-300`}
                        >
                            <LogoutIcon isOpen={isOpen} />
                            {isOpen && (
                                <span className="text-red-600 group-hover:text-white duration-300 transition-all">
                                    Logout
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
