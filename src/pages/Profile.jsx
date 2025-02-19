import { useContext, useState } from "react";
import { AppContext } from "../config/AppContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import Chart from "../components/Chart";

const Profile = () => {
  const { isDarkMode, toggleDarkMode, user, tasks, todayTask, importantTasks, plannedTasks, reminderTasks } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [activeChartTab, setActiveChartTab] = useState(0);

  const chartTabs = [
    {
      name: "All",
      chart: Chart,
      data: tasks,
    },
    {
      name: "Today",
      chart: Chart,
      data: todayTask,
    },
    {
      name: "Important",
      chart: Chart,
      data: importantTasks,
    },
    {
      name: "Planned",
      chart: Chart,
      data: plannedTasks,
    },
    {
      name: "Reminder",
      chart: Chart,
      data: reminderTasks,
    },
  ];

  const ChartTab = chartTabs[activeChartTab].chart;

  const handleLogout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-full overflow-scroll h-screen dark:bg-[#242424] bg-[#FBFDFC] px-12">
      {/* Navbar */}
      <div className="flex justify-between items-center py-3">
        <div className="flex gap-6 items-center">
          <img
            onClick={() => navigate("/tasks")}
            className={`w-4 h-4 md:w-6 md:h-6 cursor-pointer  ${isDarkMode ? "rotate-90" : "-rotate-90"}`}
            src={isDarkMode ? assets.arrow_white : assets.arrow}
            alt="menu"
          />
          <img onClick={() => navigate("/tasks")} className="h-8 cursor-pointer" src={assets.logo} alt="logo" />
        </div>
        <div className="flex gap-4 items-center">
        <button onClick={() => handleLogout()} className="hover:bg-red-500 outline-none text-[#1B281B] dark:text-white px-2 py-0.5 md:px-4 md:py-1 rounded-full text-xs md:text-sm border border-red-500">Logout</button>
          <img
            className="w-4 h-4 md:w-6 md:h-6 cursor-pointer"
            src={isDarkMode ? assets.sun : assets.moon}
            alt="moon"
            onClick={toggleDarkMode}
          />
        </div>
      </div>
      {/* Main Screen */}
      <div className="pt-10 pb-5 flex items-center">
        <div className="min-w-12 sm:w-20 min-h-12 sm:h-20 md:w-40 md:h-40 rounded-full overflow-hidden flex cursor-pointer items-center justify-center">
          <img src={assets.image} alt="profile" />
        </div>
        <div className="pl-6 text-left text-[#1B281B] dark:text-[#EBEBEB] flex flex-col gap-2 items-start">
          <h1 className="text-2xl md:text-5xl font-bold">{user.name}</h1>
          <p className="text-lg md:text-xl">{user.email}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row border border-[#496e4b33] dark:border-white">
        <section className="basis-full md:basis-[50%] border-r border-[#496e4b33] dark:border-white pl-5 py-4">
          <h1 className="text-3xl font-bold text-[#3F9142] pb-6">Tasks:</h1>
          <p className="text-xl text-[#1B281B] dark:text-[#EBEBEB] pb-2">
            Total Tasks: {tasks.length}
          </p>
          <p className="text-xl text-[#1B281B] dark:text-[#EBEBEB] pb-2">
            Today&apos;s Tasks: {todayTask.length}
          </p>
          <p className="text-xl text-[#1B281B] dark:text-[#EBEBEB] pb-2">
            Important Tasks: {importantTasks.length}
          </p>
          <p className="text-xl text-[#1B281B] dark:text-[#EBEBEB] pb-2">
            Planned Tasks: {tasks.length}
          </p>
        </section>
        <section className=" basis-full md:basis-[50%] border-t border-[#496e4b33] dark:border-white md:border-t-0 ">
          <div className=" flex text-[#1B281B] dark:text-[#EBEBEB] md:justify-between justify-start text-center ">
            {chartTabs.map((tab, index) => (
              <p
                key={index}
                onClick={() => setActiveChartTab(index)}
                className={`cursor-pointer basis-[20%] text-[8px] sm:text-xs md:text-sm px-2 py-2 md:px-4 md:py-2 border-t-0 border-l-0 last:border-r-0 border border-[#496e4b33] dark:border-white ${activeChartTab === index ? "bg-[#357937] text-[#EBEBEB]" : "bg-[#FBFDFC] dark:bg-[#242424] text-[#1B281B] dark:text-[#EBEBEB]"} `}
              >
                {tab.name}
              </p>
            ))}
          </div>
          <div className=" w-full flex flex-col items-center justify-center py-5">
            <div className=" h-44 md:h-64 w-44 md:w-64 flex items-center justify-center ">
              {chartTabs[activeChartTab].data.length > 0 ? (
                <ChartTab chartData={chartTabs[activeChartTab].data}/>
              ) : (
                <p className="dark:text-[#EBEBEB] text-[#1B281B] text-center">No Data</p>
              )}
            </div>
            <div className="px-4 pt-4 w-full flex justify-start gap-5">
              <section className="flex gap-1 items-center">
                <p
                  className={`${
                    isDarkMode ? "bg-[#3F9142]" : "bg-[#3F9142]"
                  } w-6 h-6 rounded-full`}
                ></p>
                <p
                  className={`${
                    isDarkMode ? "text-[#EBEBEB]" : "text-[#1B281B]"
                  } text-lg`}
                >
                  Pending
                </p>
              </section>
              <section className="flex gap-1 items-center">
                <p
                  className={`${
                    isDarkMode ? "bg-[#A0EDA4]" : "bg-[#142E15]"
                  } w-6 h-6 rounded-full`}
                ></p>
                <p
                  className={`${
                    isDarkMode ? "text-[#EBEBEB]" : "text-[#1B281B]"
                  } text-lg`}
                >
                  Done
                </p>
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
