import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { AppContext } from "../config/AppContext";
import { useContext } from "react";

const ImportantChart = () => {
  ChartJS.register(ArcElement, Tooltip);
  const {tasks, isDarkMode} = useContext(AppContext);

  const importantTasks = tasks.filter((task)=> task.important);
  const completedTasks = importantTasks.filter((task) => !task.isCompleted);
  const incompletedTasks = importantTasks.filter((task) => task.isCompleted);


  const data = {
    labels: ["Pending", "Done"],
    datasets: [
      {
        data: [completedTasks.length, incompletedTasks.length],
        backgroundColor: [
          ` ${isDarkMode ? "#3F9142": "#3F9142"}`,
          ` ${isDarkMode ? "#A0EDA4": "#142E15"}`,
        ],
        borderWidth: 0,
      },

    ],
  };
  return <Doughnut data={data} />;
};

export default ImportantChart;
