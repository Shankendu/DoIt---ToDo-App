import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../config/AppContext";
import Sidebar from "./Sidebar";
import { assets } from "../assets/assets";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AllTask = () => {
  const {
    menuOpen,
    isDarkMode,
    input,
    setInput,
    error,
    addTask,
    tasks,
    setError,
    setTasks,
    isGrid,
    openButton,
    setOpenButton,
    filteredTasks,
    selectedDate,
    setSelectedDate,
    reminder,
    setReminder,
  } = useContext(AppContext);

  const [viewCalendar, setViewCalendar] = useState(false);
  const [viewMenu, setViewMenu] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const menuRef = useRef(null);

  const handleChangeStar = (index) => {
    let newTasks = [...tasks];
    newTasks[index].important = !newTasks[index].important;
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleCalendarChange = (date) => {
    setSelectedDate(date + "T00:00:00.000Z".split("T")[0]);
  };

  const handleMenu = (index) => {
    setViewMenu((prev) => (prev === index ? null : index));
  };

  const handleDelete = (index) => {
    let newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleEdit = (index) => {
    setInput(tasks[index].text);
    setReminder(tasks[index].reminder);
    setSelectedDate(tasks[index].plannedDate);
    setEditTask(index);
  };

  const saveTask = (e) => {
    e.preventDefault();
    const updatedTasks = [...tasks];
    if (input.trim() !== "") {
      updatedTasks[editTask].text = input;
      updatedTasks[editTask].reminder = reminder;
      updatedTasks[editTask].plannedDate = selectedDate;
      setTasks(updatedTasks);
      setInput("");
      setReminder(false);
      setEditTask(null);
      setError({ isError: false, text: "" });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else {
      setError({ isError: true, text: "Please enter a task" });
    }
  };
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       menuRef.current &&
  //       !menuRef.current.contains(event.target)
  //     ) {
  //       setViewMenu(null);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [viewMenu]);
  return (
    <div
      className={` flex h-[calc(100vh-50px)] md:h-[calc(100vh-57px)] ${
        menuOpen ? "" : "gap-12"
      }`}
    >
      <Sidebar name={"All Tasks"} length={tasks.length} />
      {/* Main Screen */}
      <div
        className={`min-h-[calc(100vh-57px)] overflow-y-scroll relative origin-top-right ${
          menuOpen
            ? "w-full block"
            : "hidden md:block md:w-[83%] md:max-w-[83%]"
        }`}
      >
        {/* Title */}
        <div className="py-1 flex items-center gap-1 border-b-[1.5px] border-b-[#496e4b33]">
          <p className="text-xs font-medium dark:text-[#97F69B] text-[#142E15]">
            To Do
          </p>
          <img
            onClick={() =>
              setOpenButton((prev) => ({ ...prev, openInput: !prev.openInput }))
            }
            className={`size-3 transition-all duration-500 ${
              openButton.openInput ? "rotate-0" : "rotate-180"
            }`}
            src={isDarkMode ? assets.arrow_dark : assets.arrow}
            alt="arrow"
          />
        </div>

        {/* Input Box */}
        <div
          className={`bg-gradient-to-b from-[#f0f2f0] to-[#eef6efff] dark:bg-gradient-to-b dark:from-[#496e4b33] dark:to-[#496e4b33] py-4 ${
            openButton.openInput ? "hidden" : "block"
          }`}
        >
          <form
            onSubmit={(e) => addTask(e)}
            className="pt-[42px] pb-[48px] px-[20px]"
          >
            <input
              onChange={(e) => {
                const value = e.target.value;
                setInput(value);
                if (value.trim() !== "") {
                  setError({ isError: false, text: "" });
                }
              }}
              type="text"
              value={input}
              placeholder="Add a task"
              className="w-full placeholder:text-[#1b281bb8] text-[#1b281bb8] dark:text-[#ffffffff] dark:placeholder:text-[#ffffffff] border-none outline-none"
            />
            {error.isError && (
              <span className="text-red-500 text-sm">*{error.text}</span>
            )}
          </form>
          <div className="py-4 px-[20px] flex justify-between items-center">
            <section className="flex gap-5 relative">
              <img
                onClick={() => setReminder(!reminder)}
                className="size-4 md:size-6 cursor-pointer"
                src={
                  reminder
                    ? isDarkMode
                      ? assets.bell_active_dark
                      : assets.bell_active
                    : isDarkMode
                    ? assets.bell_dark
                    : assets.bell
                }
                alt="bell"
              />
              <img
                className="size-4 md:size-6 cursor-pointer"
                src={isDarkMode ? assets.repeat_dark : assets.repeat}
                alt="repeat"
              />
              <div className="">
                <img
                  className="size-4 md:size-6 cursor-pointer "
                  src={
                    viewCalendar
                      ? isDarkMode
                        ? assets.calendar_active_dark
                        : assets.calendar_active
                      : isDarkMode
                      ? assets.calendar_dark
                      : assets.calendar
                  }
                  alt="calendar"
                  onClick={() => setViewCalendar(!viewCalendar)}
                />
                <div className="absolute scale-75 z-30 left-[0%] top-6 h-20 w-80 ">
                  <Calendar
                    style={{ height: "100%", width: "100%" }}
                    locale="en-GB"
                    value={selectedDate}
                    onChange={(date) => handleCalendarChange(date)}
                    className={`bg-[#35793729] text-sm ${
                      viewCalendar ? "block" : "hidden"
                    }`}
                  />
                </div>
              </div>
            </section>
            <section>
              {editTask === null ? (
                <button
                  onClick={addTask}
                  className="border-none cursor-pointer px-2 py-1 md:text-base sm:text-sm text-xs md:px-4 md:py-2 bg-[#35793729] dark:bg-[#357937e0] dark:text-[#cfcfcfff] text-[#357937ff] rounded-lg"
                >
                  ADD TASK
                </button>
              ) : (
                <button
                  onClick={saveTask}
                  className="border-none cursor-pointer px-2 py-1 md:text-base sm:text-sm text-xs md:px-4 md:py-2 bg-[#35793729] dark:bg-[#357937e0] dark:text-[#cfcfcfff] text-[#357937ff] rounded-lg"
                >
                  SAVE TASK
                </button>
              )}
            </section>
          </div>
        </div>

        {/* All Task Title */}
        <div
          className={`pt-4 pb-1 flex items-center gap-1 ${
            !openButton.openInput
              ? "border-t-[1.5px] border-b-[1.5px] border-b-[#496e4b33] border-t-[#496e4b33]"
              : " border-b-[1.5px] border-b-[#496e4b33]"
          }`}
        >
          <p className="text-xs font-medium dark:text-[#97F69B] text-[#142E15]">
            All Tasks
          </p>
          <img
            onClick={() =>
              setOpenButton((prev) => ({ ...prev, openTask: !prev.openTask }))
            }
            className={`size-3 transition-all duration-500 cursor-pointer ${
              openButton.openTask ? "rotate-0" : "rotate-180"
            }`}
            src={isDarkMode ? assets.arrow_dark : assets.arrow}
            alt="arrow"
          />
        </div>

        {/* Task List */}
        <div
          className={`overflow-scroll ${
            isGrid
              ? "grid-cols-1 sm:grid-cols-2 grid md:grid-cols-3 items-center justify-start w-full gap-3 pt-3 text-sm md:text-base"
              : "flex flex-col justify-between items-center w-full "
          }`}
        >
          {filteredTasks.find((task) => !task.isCompleted) ? (
            filteredTasks.map((task, index) => {
              return (
                !task.isCompleted && (
                  <div
                    key={index}
                    className={`overflow-visible ${
                      openButton.openTask ? "hidden" : "block"
                    } ${
                      isGrid
                        ? "w-full border-[1.5px] border-[#496e4b33] py-4 px-[20px]"
                        : "w-full py-4 pr-8 pl-[20px] border-b-[1.5px] border-b-[#496e4b33]"
                    } `}
                  >
                    <section
                      className={`${
                        isGrid
                          ? "flex justify-between items-center w-full"
                          : "flex justify-between items-center w-full"
                      }`}
                    >
                      <label
                        className={`text-[#1B281B] dark:text-[#F5F5F5] flex items-center gap-4 cursor-pointer`}
                      >
                        <input
                          className="size-3 md:size-5 appearance-none checked:appearance-auto border-2 border-[#1B281B] dark:border-[#F5F5F5] "
                          type="checkbox"
                          checked={task.isCompleted}
                          onChange={(e) => {
                            let updatedTasks = tasks.map((task, i) =>
                              i === index
                                ? { ...task, isCompleted: e.target.checked }
                                : task
                            );
                            setTasks(updatedTasks);
                            localStorage.setItem(
                              "tasks",
                              JSON.stringify(updatedTasks)
                            );
                          }}
                        />
                        {task.text}
                      </label>
                      <div className="flex gap-5 relative overflow-visible">
                        <img
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMenu(index);
                          }}
                          className="cursor-pointer size-4 md:size-6"
                          src={
                            isDarkMode ? assets.dotMenu_dark : assets.dotMenu
                          }
                          alt="menu"
                        />
                        <div
                          ref={menuRef}
                          onClick={(e) => e.stopPropagation()}
                          className={`top-[-8px] right-16 z-50 absolute items-center justify-center shadow-lg text-center transition-all duration-300 ${
                            viewMenu === index ? "flex" : "hidden"
                          }`}
                        >
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(index);
                            }}
                            className="px-4 py-2 w-full border-r border-r-[#496e4b33] cursor-pointer bg-white hover:bg-gray-100 transition-all duration-300"
                          >
                            <p className="text-sm">Edit</p>
                          </div>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(index);
                            }}
                            className="px-4 py-2 cursor-pointer w-full text-red-500 bg-white hover:bg-gray-100 transition-all duration-300"
                          >
                            <p className="text-sm">Delete</p>
                          </div>
                        </div>
                        <img
                          className="cursor-pointer size-4 md:size-6"
                          onClick={() => handleChangeStar(index)}
                          src={
                            isDarkMode
                              ? task.important
                                ? assets.star_solid_dark
                                : assets.star_dark
                              : task.important
                              ? assets.star_solid
                              : assets.star
                          }
                          alt="star"
                        />
                      </div>
                    </section>
                  </div>
                )
              );
            })
          ) : (
            <p
              className={`pl-[20px] py-4 pr-8 text-[#1B281B] dark:text-[#F5F5F5] text-sm ${
                openButton.openTask ? "hidden" : "block"
              } `}
            >
              No Tasks to show.
            </p>
          )}
        </div>

        {/*Completed Task Title */}
        <div className="pt-4 pb-1 flex items-center gap-1 border-b-[1.5px] border-b-[#496e4b33]">
          <p className="text-xs font-medium dark:text-[#97F69B] text-[#142E15]">
            Completed Tasks
          </p>
          <img
            onClick={() =>
              setOpenButton((prev) => ({
                ...prev,
                openCompletedTask: !prev.openCompletedTask,
              }))
            }
            className={`size-3 transition-all duration-500 cursor-pointer ${
              openButton.openCompletedTask ? "rotate-0" : "rotate-180"
            }`}
            src={isDarkMode ? assets.arrow_dark : assets.arrow}
            alt="arrow"
          />
        </div>

        {/* Completed Task List */}
        <div className="text-xs md:text-base">
          {tasks.some((task) => task.isCompleted) ? (
            tasks.map((task, index) => {
              return (
                task.isCompleted && (
                  <div
                    key={index}
                    className={` border-b-[1.5px] border-b-[#496e4b33] py-4 pr-8 pl-[20px] flex justify-between ${
                      openButton.openCompletedTask ? "hidden" : "block"
                    }`}
                  >
                    <section className="">
                      <label
                        className={`text-neutral-600 dark:text-neutral-500 flex items-center cursor-pointer gap-4 ${
                          task.isCompleted ? "line-through" : ""
                        }`}
                      >
                        <input
                          className="size-3 md:size-5 appearance-none checked:appearance-auto accent-[#3F9142]"
                          type="checkbox"
                          checked={task.isCompleted}
                          onChange={(e) => {
                            let updatedTasks = tasks.map((task, i) =>
                              i === index
                                ? { ...task, isCompleted: e.target.checked }
                                : task
                            );
                            setTasks(updatedTasks);
                            localStorage.setItem(
                              "tasks",
                              JSON.stringify(updatedTasks)
                            );
                          }}
                        />
                        {task.text}
                      </label>
                    </section>
                    <section className="flex gap-5 relative overflow-visible">
                      <img
                        onClick={() => handleMenu(index)}
                        className="cursor-pointer size-4 md:size-6"
                        src={isDarkMode ? assets.dotMenu_dark : assets.dotMenu}
                        alt="menu"
                      />
                      <div
                        ref={menuRef}
                        onClick={(e) => e.stopPropagation()}
                        className={`top-[-8px] right-16 z-50 absolute items-center justify-center shadow-lg text-center transition-all duration-300 ${
                          viewMenu === index ? "flex" : "hidden"
                        }`}
                      >
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(index);
                          }}
                          className="px-4 py-2 w-full border-r border-r-[#496e4b33] cursor-pointer bg-white hover:bg-gray-100 transition-all duration-300"
                        >
                          <p className="text-sm">Edit</p>
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(index);
                          }}
                          className="px-4 py-2 cursor-pointer w-full text-red-500 bg-white hover:bg-gray-100 transition-all duration-300"
                        >
                          <p className="text-sm">Delete</p>
                        </div>
                      </div>
                      <img
                        className="cursor-pointer size-4 md:size-6"
                        onClick={() => handleChangeStar(index)}
                        src={
                          isDarkMode
                            ? task.important
                              ? assets.star_solid_dark
                              : assets.star_dark
                            : task.important
                            ? assets.star_solid
                            : assets.star
                        }
                        alt="star"
                      />
                    </section>
                  </div>
                )
              );
            })
          ) : (
            <p
              className={`pl-[20px] py-4 pr-8 text-[#1B281B] dark:text-[#F5F5F5] text-sm ${
                openButton.openTask ? "hidden" : "block"
              } `}
            >
              No Tasks to show.
            </p>
          )}
        </div>
      </div>

      {/* Task Settings */}
    </div>
  );
};

export default AllTask;
