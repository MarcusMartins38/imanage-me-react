import { NavLink } from "react-router";

type SidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: (open: boolean) => void;
};

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  return (
    <div className="flex h-screen fixed">
      <div
        className={`bg-base-200 transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        <section className="p-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="btn btn-ghost w-full py-2 px-0"
          >
            {isCollapsed ? (
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-arrow-right"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 16l4 -4l-4 -4" />
                <path d="M8 12h8" />
                <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="icon icon-tabler icons-tabler-filled icon-tabler-square-rounded-arrow-left"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm.707 5.293a1 1 0 0 0 -1.414 0l-4 4a1.037 1.037 0 0 0 -.2 .284l-.022 .052a.95 .95 0 0 0 -.06 .222l-.008 .067l-.002 .063v-.035v.073a1.034 1.034 0 0 0 .07 .352l.023 .052l.03 .061l.022 .037a1.2 1.2 0 0 0 .05 .074l.024 .03l.073 .082l4 4l.094 .083a1 1 0 0 0 1.32 -.083l.083 -.094a1 1 0 0 0 -.083 -1.32l-2.292 -2.293h5.585l.117 -.007a1 1 0 0 0 -.117 -1.993h-5.585l2.292 -2.293l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                  fill="currentColor"
                  strokeWidth="0"
                />
              </svg>
            )}
          </button>
        </section>

        <div className="menu p-2 !pt-0 h-full">
          <NavLink
            to="/tasks"
            className="menu-item flex items-center w-full h-10 rounded-lg px-1 transition-all duration-300 hover:bg-zinc-200"
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
              className={`icon icon-tabler icons-tabler-outline icon-tabler-checklist ${isCollapsed ? "m-auto" : "mr-1"}`}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" />
              <path d="M14 19l2 2l4 -4" />
              <path d="M9 8h4" />
              <path d="M9 12h2" />
            </svg>
            {!isCollapsed && <span>Tasks</span>}
          </NavLink>

          <div className="absolute mb-2 bottom-0 w-full">
            <NavLink
              to="/settings"
              className={`menu-item flex items-center w-full h-10 rounded-lg px-1 transition-all ${isCollapsed ? "max-w-12" : "max-w-60"} duration-300 hover:bg-zinc-200`}
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
                className={`icon icon-tabler icons-tabler-outline icon-tabler-settings ${isCollapsed ? "m-auto" : "mr-1"}`}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
              </svg>
              {!isCollapsed && <span>Settings</span>}
            </NavLink>
            <NavLink
              to="/logout"
              className={`menu-item flex items-center w-full h-10 rounded-lg px-1 transition-all hover:bg-red-200 ${isCollapsed ? "max-w-12" : "max-w-60"} duration-300 hover:bg-zinc-200`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className={`icon icon-tabler icons-tabler-outline icon-tabler-logout-2 text-red-600 ${isCollapsed ? "m-auto ml-[6px]" : "mr-1 ml-[-2px]"}`}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                <path d="M15 12h-12l3 -3" />
                <path d="M6 15l-3 -3" />
              </svg>
              {!isCollapsed && <span>Settings</span>}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
