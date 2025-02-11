import { useContext, useState } from "react";
import { AppContext } from "../config/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {setIsLogin, setUser } = useContext(AppContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!form.email || !form.password || !form.name) {
        alert("Missing Details");
        return;
      }
    setIsLogin(true);
    setUser({ name: form.name, email: form.email });
    navigate('/tasks')

  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-[#EEF6EF] dark:from-[#2C2C2C] to-[#FBFDFC] dark:to-[#242424]">
      {/* Title */}
      <div className="text-center pb-20 w-full">
        <h1 className="text-5xl font-bold text-[#3F9142]">Welcome Back!</h1>
        <p className="text-xl text-black dark:text-white">
          Sign in to your account
        </p>
      </div>

      <form className="w-full" onSubmit={submitHandler}>
        <div className="flex flex-col gap-4 w-full items-center">
          <input
            className="outline-none border border-[#142E15] dark:border-neutral-500 px-4 py-2 rounded-full placeholder:text-[#1B281B] dark:placeholder:text-[#ffffff] text-[#1b281b] dark:text-[#ffffff] text-sm w-[20%]"
            type="text"
            placeholder="John Doe."
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="outline-none border border-[#142E15] dark:border-neutral-500 px-4 py-2 rounded-full placeholder:text-[#1B281B] dark:placeholder:text-[#ffffff] text-[#1b281b] dark:text-[#ffffff] text-sm w-[20%]"
            type="email"
            placeholder="john@doe.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="outline-none border border-[#142E15] dark:border-neutral-500 px-4 py-2 rounded-full placeholder:text-[#1B281B] dark:placeholder:text-[#ffffff] text-[#1b281b] dark:text-[#ffffff] text-sm w-[20%]"
            type="password"
            placeholder="*******"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            className="bg-[#357937] dark:bg-[#98e19bff] text-white dark:text-[#2C2C2C] px-4 py-2 rounded-full w-[20%]"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
