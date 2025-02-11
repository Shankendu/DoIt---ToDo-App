import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/tasks" element={<Home />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
