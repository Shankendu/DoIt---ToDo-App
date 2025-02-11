import { useContext } from "react";
import { AppContext } from "../config/AppContext";
import Sidebar from "./Sidebar";
import { assets } from "../assets/assets";

const Important = () => {
  const {
    menuOpen,
    isDarkMode,
    tasks,
    setTasks,
    isGrid,
    openButton,
    setOpenButton, filteredTasks
  } = useContext(AppContext);

  const handleChangeStar = (index) => {
    let newTasks = [...tasks];
    newTasks[index].important = !newTasks[index].important;
    setTasks([...tasks, newTasks])
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const importantTasks = tasks.filter((task) => task.important);

  return (
    <div className={` flex h-screen ${menuOpen ? "gap-0" : "gap-12"}`}>
      <Sidebar name={"Important Tasks"} length={importantTasks.length} />
      {/* Main Screen */}
      <div
        className={`max-h-[calc(100vh-56px)] relative ${
          menuOpen ? "w-full" : "w-[83%]"
        }`}
      >
        {/* All Task Title */}
        <div
          className={`pb-1 flex items-center gap-1 " border-b-[1.5px] border-b-[#496e4b33]`}
        >
          <p className="text-xs font-medium dark:text-[#97F69B] text-[#142E15]">
            Today&apos;s Tasks
          </p>
          <img
            onClick={() =>
              setOpenButton((prev) => ({ ...prev, openTask: !prev.openTask }))
            }
            className={`size-3 transition-all duration-500 ${
              openButton.openTask ? "rotate-0" : "rotate-180"
            }`}
            src={isDarkMode ? assets.arrow_dark : assets.arrow}
            alt="arrow"
          />
        </div>

        {/* Task List */}
        <div
          className={`${
            isGrid
              ? "grid grid-cols-3 items-center justify-start w-full gap-3 pt-3"
              : "flex flex-col justify-between items-center w-full"
          }`}
        >
          {filteredTasks.find((task) => !task.isCompleted && task.important) ? (
            filteredTasks.map((task, index) => {
              return (
                !task.isCompleted && task.important && (
                  <div
                    key={index}
                    className={`${openButton.openTask ? "hidden" : "block"} ${
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
                        className={`text-[#1B281B] dark:text-[#F5F5F5] flex items-center gap-4`}
                      >
                        <input
                          className="size-5 appearance-none checked:appearance-auto border-2 border-[#1B281B] dark:border-[#F5F5F5] "
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
                      <img
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
            className={`size-3 transition-all duration-500 ${
              openButton.openCompletedTask ? "rotate-0" : "rotate-180"
            }`}
            src={isDarkMode ? assets.arrow_dark : assets.arrow}
            alt="arrow"
          />
        </div>

        {/* Completed Task List */}
        <div>
          {tasks.find((task) => task.isCompleted && task.important) ? (
            tasks.map((task, index) => {
              return (
                task.isCompleted && task.important && (
                  <div
                    key={index}
                    className={` border-b-[1.5px] border-b-[#496e4b33] py-4 pr-8 pl-[20px] flex justify-between ${
                      openButton.openCompletedTask ? "hidden" : "block"
                    }`}
                  >
                    <section className="">
                      <label
                        className={`text-neutral-600 dark:text-neutral-500 flex items-center gap-4 ${
                          task.isCompleted ? "line-through" : ""
                        }`}
                      >
                        <input
                          className="size-5 appearance-none checked:appearance-auto accent-[#3F9142]"
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
                    <section className="cursor-pointer">
                      <img
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
    </div>
  );
};

export default Important;
