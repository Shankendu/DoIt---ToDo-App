import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { AppContext } from "../config/AppContext";
import { useContext } from "react";

const Chart = () => {
  ChartJS.register(ArcElement, Tooltip);
  const {tasks, isDarkMode} = useContext(AppContext);

  const completedTasks = tasks.filter((task) => !task.isCompleted);
  const incompletedTasks = tasks.filter((task) => task.isCompleted);


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

export default Chart;
