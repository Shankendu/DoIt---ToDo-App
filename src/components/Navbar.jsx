import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../config/AppContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const {
    setMenuOpen,
    menuOpen,
    isDarkMode,
    toggleDarkMode,
    isGrid,
    setIsGrid,
    search,
    setSearch,
  } = useContext(AppContext);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="py-3 flex justify-between">
      {/* Nav-Left */}
      <div className="flex gap-6 items-center">
        <img
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-4 h-4 md:w-6 md:h-6 cursor-pointer"
          src={!menuOpen
              ? isDarkMode
                ? assets.cross_dark
                : assets.cross
              : isDarkMode
              ? assets.menu_dark
              : assets.menu}
          alt="menu"
        />
        <img onClick={()=>navigate("/tasks")} className="h-6 md:h-8 cursor-pointer" src={assets.logo} alt="logo" />
      </div>
      {/* Nav-Right */}
      <div className="flex gap-3 md:gap-6 items-center">
        <input
          className={`placeholder:text-[#1b281bb8] text-[#1b281bb8] dark:text-[#ffffffff] dark:placeholder:text-[#ffffffff] outline-none border [#496e4b33] dark:border-[#ffffff33] w-[100px] py-1 px-2  md:py-2 md:px-4 rounded-full text-xs transition-all duration-500 ease-in-out origin-right ${
            showSearch ? "scale-x-100" : "scale-x-0"
          }`}
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img
          className="w-4 h-4 md:w-6 md:h-6 cursor-pointer"
          src={
            showSearch
              ? isDarkMode
                ? assets.cross_dark
                : assets.cross
              : isDarkMode
              ? assets.search_dark
              : assets.search
          }
          alt="search"
          onClick={() => {
            setShowSearch(!showSearch);
            setSearch("");
          }}
        />
        <img
          onClick={() => setIsGrid(!isGrid)}
          className="w-4 h-4 md:w-6 md:h-6 cursor-pointer"
          src={
            isGrid
              ? isDarkMode
                ? assets.list_dark
                : assets.list
              : isDarkMode
              ? assets.grid_dark
              : assets.grid
          }
          alt="app_grid"
        />
        <img
          className="w-4 h-4 md:w-6 md:h-6 cursor-pointer"
          src={isDarkMode ? assets.sun : assets.moon}
          alt="moon"
          onClick={toggleDarkMode}
        />
      </div>
    </div>
  );
};

export default Navbar;
