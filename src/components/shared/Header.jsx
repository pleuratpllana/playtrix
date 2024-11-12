import {
  UserIcon,
  ArrowRightOnRectangleIcon,
  SpeakerWaveIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import Avatar from "../../assets/avatar.png";

export const Header = ({ playlistCount, toggleModal }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const goToMyAccount = () => {
    navigate("/myaccount");
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    navigate("/");
    setIsDropdownOpen(false);
  };

  return (
    <header className="w-full flex items-center justify-between text-white bg-gradient-to-b from-black to-[#1a1a1a] py-5 px-10 border-b border-white/30">
      <p>Welcome, Pleurat</p>
      <div className="overflow-hidden hidden lg:max-w-[580px] lg:block md:max-w-[300px] md:block">
        <Marquee
          gradient={false}
          className="marquee-text hidden lg:flex whitespace-nowrap items-center font-bold"
          speed={70}
        >
          <SpeakerWaveIcon className="w-5 h-5 text-[#2ac060] mr-2" />
          Enjoy the very best music experience on PlayTrix! &nbsp; | &nbsp;
          <span className="text-[#2ac060]">Discover &nbsp;</span> new songs,
          artists, albums, and genres!&nbsp;
        </Marquee>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleModal}
          className="relative flex items-center bg-transparent text-sm hover:text-green-500 transition duration-300"
          title="View Playlist"
        >
          <Bars3Icon className="w-5 h-5 mr-1" />
          <span>View Playlist</span>
          {playlistCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs rounded-full px-1.5">
              {playlistCount}
            </span>
          )}
        </button>
        <div className="block relative z-50" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2"
          >
            <img
              src={Avatar}
              alt="Avatar of Pleurat Pllana"
              className="w-7 h-7 rounded-full transition-transform duration-200 hover:scale-110"
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-5 flex flex-col w-36 shadow border border-white/30 bg-[#111111] rounded z-50">
              <button
                onClick={goToMyAccount}
                className="flex items-center px-3 py-3 text-sm text-left hover:bg-white/95 hover:text-[#12853a] transition duration-300"
              >
                <UserIcon className="w-5 h-5 mr-1 text-green-600" />
                My Account
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-3 text-sm text-left hover:bg-white/95 hover:text-[#12853a] transition duration-300"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-1.5 text-green-600" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
