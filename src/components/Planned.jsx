import { useContext } from "react";
import { AppContext } from "../config/AppContext";
import Sidebar from "./Sidebar";
import { assets } from "../assets/assets";

const Planned = () => {
  const {
    menuOpen,
    isDarkMode,
    tasks,
    setTasks,
    isGrid,
    openButton,
    setOpenButton, filteredTasks, plannedTasks
  } = useContext(AppContext);

  const handleChangeStar = (index) => {
    let newTasks = [...tasks];
    newTasks[index].important = !newTasks[index].important;
    setTasks(newTasks)
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };


  return (
    <div className={` flex h-[calc(100vh-50px)] md:h-[calc(100vh-57px)] ${menuOpen ? "gap-0" : "gap-12"}`}>
      <Sidebar name={"Planned Tasks"} length={plannedTasks.length} />
      {/* Main Screen */}
      <div
       className={`min-h-[calc(100vh-57px)] overflow-y-scroll relative origin-top-right ${
          menuOpen ? "w-full block" : "hidden md:block md:w-[83%] md:max-w-[83%]"
        }`}
      >
        {/* All Task Title */}
        <div
          className={`px-1  flex items-center gap-1 " border-b-[1.5px] border-b-[#496e4b33]`}
        >
          <p className="text-xs font-medium dark:text-[#97F69B] text-[#142E15]">
            Planned Tasks
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
          {filteredTasks.find((task) => !task.isCompleted && task.isPlanned) ? (
            filteredTasks.map((task, index) => {
              return (
                !task.isCompleted && task.isPlanned && (
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
                      <img
                        onClick={() => handleChangeStar(index)}
                        className="cursor-pointer size-4 md:size-6"
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
            className={`size-3 transition-all duration-500 cursor-pointer ${
              openButton.openCompletedTask ? "rotate-0" : "rotate-180"
            }`}
            src={isDarkMode ? assets.arrow_dark : assets.arrow}
            alt="arrow"
          />
        </div>

        {/* Completed Task List */}
        <div className="text-xs md:text-base">
          {tasks.find((task) => task.isCompleted && task.isPlanned) ? (
            tasks.map((task, index) => {
              return (
                task.isCompleted && task.isPlanned && (
                  <div
                    key={index}
                    className={` border-b-[1.5px] border-b-[#496e4b33] py-4 pr-8 pl-[20px] flex justify-between ${
                      openButton.openCompletedTask ? "hidden" : "block"
                    }`}
                  >
                    <section className="">
                      <label
                        className={`text-neutral-600 dark:text-neutral-500 flex items-center gap-4 cursor-pointer ${
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
                    <section className="cursor-pointer size-4 md:size-6">
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

export default Planned;
