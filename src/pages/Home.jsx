import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AppContext } from "../config/AppContext";

const Home = () => {
  const { tabs, activeTab } = useContext(AppContext);
  const ActiveComponent = tabs[activeTab].component;
  return (
    <div className="w-full h-screen dark:bg-[#242424] bg-[#FBFDFC] px-5 md:px-12">
      <Navbar />
      <ActiveComponent />
    </div>
  );
};

export default Home;
