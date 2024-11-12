import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MusicalNoteIcon,
  FolderIcon,
  UserGroupIcon,
  BookmarkIcon,
  QuestionMarkCircleIcon,
  Squares2X2Icon,
  NumberedListIcon,
} from "@heroicons/react/24/outline";
import Logo from "../../assets/logo.png";

export const Sidebar = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const navItems = [
    { name: "Dashboard", path: "dashboard", icon: Squares2X2Icon },
    { name: "Songs", path: "songs", icon: MusicalNoteIcon },
    { name: "Artists", path: "artists", icon: UserGroupIcon },
    { name: "Albums", path: "albums", icon: FolderIcon },
    { name: "Playlists", path: "playlists", icon: NumberedListIcon },
    { name: "Genres", path: "genres", icon: BookmarkIcon },
  ];

  return (
    <aside
      className={`sticky top-0 h-screen bg-gradient-to-b from-black to-[#1a1a1a] border-r border-white/40 text-white py-5 px-6 flex flex-col transition-all duration-300 ease-in-out ${
        isSidebarExpanded ? "w-[300px]" : "w-[100px]"
      }`}
    >
      <div className="flex items-center mb-4">
        <img
          src={Logo}
          alt="Logo"
          className={`h-auto w-auto transition-all duration-300 ease-in-out ${
            isSidebarExpanded ? "block" : "hidden"
          }`}
        />
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none ml-auto flex items-center space-x-1 hover:text-[#2ac060] transition duration-300"
        >
          {isSidebarExpanded ? (
            <ChevronLeftIcon className="h-5 w-5" />
          ) : (
            <ChevronRightIcon className="h-5 w-5 mr-3.5 -mb-2" />
          )}
        </button>
      </div>

      <ul className="space-y-2 flex-grow mt-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `py-3.5 px-3 rounded flex items-center space-x-2 transition duration-300 font-medium ${
                  isActive
                    ? "bg-white/20 border-l-2 border-[#2ac060] text-white"
                    : "hover:bg-white/95 hover:text-green-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`h-5 w-5 ${
                      isActive ? "text-white" : "text-green-600"
                    }`}
                  />
                  {isSidebarExpanded && <span>{item.name}</span>}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      <div
        className={`${
          isSidebarExpanded ? "flex-row space-x-4 mb-8" : "flex-col mb-6"
        } flex items-center mt-6 text-white/80 text-xs`}
      >
        <NavLink to="/faqs" className="hover:text-green-500">
          <QuestionMarkCircleIcon className="h-5 w-5 text-white/90 hover:text-green-500 transition duration-300" />
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
