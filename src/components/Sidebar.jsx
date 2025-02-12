/* eslint-disable react/prop-types */
import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../config/AppContext";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ name, length }) => {
  const { menuOpen, tabs, setActiveTab, activeTab, isDarkMode, user } =
    useContext(AppContext);
  const ActiveChart = tabs[activeTab].chart;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      className={`h-[calc(100vh-56px)] transition-all duration-500 ease-in-out relative overflow-hidden ${
        menuOpen ? "w-0 opacity-0" : "w-[17%] opacity-100"
      }`}
    >
      <div className="bg-[#EEF6EF] dark:bg-[#2C2C2C] min-h-[calc(100vh-175px)] translate-y-[13%] relative px-[9px]">
        {/* Profile Container */}
        <div className="flex flex-col items-center w-full justify-center translate-y-[-50%] relative group">
          <div className="w-24 h-24 rounded-full overflow-hidden flex cursor-pointer items-center justify-center group">
            <img className="" src={assets.profile} alt="profile" />
          </div>
          <p className="font-medium pt-2 dark:text-[#EBEBEB] text-[#1B281B]">
            Hey, {user.name}
          </p>
          <div className="top-0 opacity-0 group-hover:opacity-100 group-hover:flex group-hover:top-20 absolute w-[100px] flex-col items-center justify-center z-20 shadow-lg text-center transition-all duration-300">
            <div
              onClick={() => navigate("/profile")}
              className="px-4 py-2 w-full border-b border-b-[#496e4b33] cursor-pointer bg-white hover:bg-gray-100 transition-all duration-300"
            >
              <p className="text-sm">My Profile</p>
            </div>
            <div
              onClick={() => handleLogout()}
              className="px-4 py-2 cursor-pointer w-full text-red-500 bg-white hover:bg-gray-100 transition-all duration-300"
            >
              <p className="text-sm">Logout</p>
            </div>
          </div>
        </div>

        <div className="translate-y-[-12%] flex-col gap-y-3 relative -z-10">
          <div className="bg-[#FBFDFC] dark:bg-[#232323] py-2 ">
            {tabs.map((item, index) => {
              return (
                <div
                  onClick={() => setActiveTab(index)}
                  key={index}
                  className={`flex items-center gap-4 px-4 py-2 cursor-pointer ${
                    activeTab === index
                      ? "bg-[#35793729] dark:bg-[#35793729] text-[#357937] dark:text-[#98e19bff] rounded-full"
                      : "bg-[#FBFDFC] dark:bg-[#232323] dark:text-[#EBEBEB] text-[#1B281B] rounded-none"
                  }`}
                >
                  <img
                    src={
                      activeTab === index
                        ? isDarkMode
                          ? item.active_dark
                          : item.active
                        : isDarkMode
                        ? item.image_dark
                        : item.image_light
                    }
                    alt={item.name}
                  />
                  <p className="font-medium text-sm">{item.name}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-[#FBFDFC] dark:bg-[#232323] gap-4 px-4 py-2 mt-2 flex items-center">
            <img src={isDarkMode ? assets.add_dark : assets.add} alt="add" />
            <p className="font-medium text-sm text-[#1B281B] dark:text-[#EBEBEB]">
              Add List
            </p>
          </div>
          <div className="bg-[#FBFDFC] dark:bg-[#232323] mt-2 flex-col">
            <div className="px-4 py-2 flex border-b-2 border-[#f0f0f0] dark:border-b-[#1b1b1bff]">
              <section className="w-[80%] flex flex-col justify-start">
                <p className="text-sm dark:text-[#EBEBEB] text-[#1B281B]">
                  {name}
                </p>
                <p className="font-medium text-base dark:text-[#EBEBEB] text-[#1B281B]">
                  {length}
                </p>
              </section>
              <section className="w-[20%] text-left flex justify-end">
                <div className="w-3 h-3 bg-[#bdbdbdff] dark:bg-[#bdbdbdff] flex items-center justify-center rounded-full">
                  <p className="text-[10px]  font-bold rounded-full text-white dark:text-[#232323ff]">
                    i
                  </p>
                </div>
              </section>
            </div>
            <div className="px-4 pt-4 pb-2 w-full h-full">
              <div className="h-full w-full flex items-end justify-center">
                <div className="h-[100px] w-[100px] flex items-center justify-center">
                  {tabs[activeTab].data.length > 0 ? (
                    <ActiveChart />
                  ) : (
                    "No Data"
                  )}
                </div>
              </div>
            </div>
            <div className="px-4 pb-3 w-full flex justify-start gap-5">
              <section className="flex gap-1 items-center">
                <p
                  className={`${
                    isDarkMode ? "bg-[#3F9142]" : "bg-[#3F9142]"
                  } w-[5px] h-[5px] rounded-full`}
                ></p>
                <p
                  className={`${
                    isDarkMode ? "text-[#EBEBEB]" : "text-[]"
                  } text-[8px]`}
                >
                  Pending
                </p>
              </section>
              <section className="flex gap-1 items-center">
                <p
                  className={`${
                    isDarkMode ? "bg-[#A0EDA4]" : "bg-[#142E15]"
                  } w-[5px] h-[5px] rounded-full`}
                ></p>
                <p
                  className={`${
                    isDarkMode ? "text-[#EBEBEB]" : "text-[#1B281B]"
                  } text-[8px]`}
                >
                  Done
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
