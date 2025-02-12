import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/tasks" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
