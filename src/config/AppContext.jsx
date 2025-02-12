/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { createContext } from "react";
import AllTask from "../components/AllTask";
import Today from "../components/Today";
import { assets } from "../assets/assets";
import Important from "../components/Important";
import Chart from "../components/Chart";
import TodayChart from "../components/TodayChart";
import ImportantChart from "../components/ImportantChart";
import Planned from "../components/Planned";
import PlannedChart from "../components/PlannedChart";

export const AppContext = createContext();

export const ContextProvider = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isGrid, setIsGrid] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [input, setInput] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [search, setSearch] = useState("");
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("login") || false
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [error, setError] = useState({ isError: false, text: "" });
  const [openButton, setOpenButton] = useState({
    openInput: false,
    openTask: false,
    openCompletedTask: false,
  });
  const todayDate = new Date();
  const formattedDate = todayDate.toLocaleDateString("en-GB");
  const todayTask = tasks.filter((task) => task.date === formattedDate);
  const importantTasks = tasks.filter((task) => task.important);
  const plannedTasks = tasks.filter((task) => task.isPlanned);
  const filteredTasks = tasks.filter(
    (task) =>
      task.text && task.text.toLowerCase().includes(search.toLowerCase())
  );

  const addTask = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      let newTask = {
        text: input,
        isCompleted: false,
        important: false,
        isPlanned: selectedDate !== null ? true : false,
        date: formattedDate,
        plannedDate: selectedDate || null,
      };
      setTasks([...tasks, newTask]);
      setInput("");
      setError({ isError: false, text: "" });
    } else {
      setError({ isError: true, text: "Please enter a task" });
    }
  };


  //Setting all tasks to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("login", isLogin);
    localStorage.setItem("user", JSON.stringify(user));
  }, [tasks, isLogin, user]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  const tabs = [
    {
      name: "All Tasks",
      component: AllTask,
      image_light: assets.task,
      image_dark: assets.task_dark,
      active: assets.task_active,
      active_dark: assets.task_active_dark,
      chart: Chart,
      data: tasks,
    },
    {
      name: "Today",
      component: Today,
      image_light: assets.calendar,
      image_dark: assets.calendar_dark,
      active: assets.calendar_active,
      active_dark: assets.calendar_active_dark,
      chart: TodayChart,
      data: todayTask,
    },
    {
      name: "Important",
      component: Important,
      image_light: assets.star,
      image_dark: assets.star_dark,
      active: assets.star_active,
      active_dark: assets.star_active_dark,
      chart: ImportantChart,
      data: importantTasks,
    },
    {
      name: "Planned",
      component: Planned,
      image_light: assets.plan,
      image_dark: assets.plan_dark,
      active: assets.plan_active,
      active_dark: assets.plan_active_dark,
      chart: PlannedChart,
      data: tasks,
    },
    {
      name: "Assigned to me",
      component: Today,
      image_light: assets.assign,
      image_dark: assets.assign_dark,
      active: assets.assign_active,
      active_dark: assets.assign_active_dark,
      chart: Chart,
      data: tasks,
    },
  ];
  let value = {
    menuOpen,
    setMenuOpen,
    tabs,
    activeTab,
    setActiveTab,
    isDarkMode,
    setIsDarkMode,
    toggleDarkMode,
    input,
    setInput,
    error,
    addTask,
    tasks,
    setError,
    setTasks,
    isGrid,
    setIsGrid,
    openButton,
    setOpenButton,
    todayTask,
    search,
    setSearch,
    filteredTasks,
    isLogin,
    setIsLogin, user, setUser, formattedDate, importantTasks, selectedDate, setSelectedDate, plannedTasks
  };
  
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
