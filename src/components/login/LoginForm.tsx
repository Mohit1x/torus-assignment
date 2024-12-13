import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";

import { loginThunk } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isLoading, isLoggedIn } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length < 5 && password.trim().length < 5) {
      setError("username or password must be of atleast 5 characters");
      return;
    }
    dispatch(loginThunk({ username, password }));
  };

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      toast.success("logged in successfull");
      navigate("/usermanagement");
    }
  }, [isLoading, isLoggedIn]);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <form
          className="flex flex-col gap-4 items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold">LOGIN</h1>
            <p className="text-sm font-semibold text-gray-600">
              Welcome! Login to start at TORUS.
            </p>
            <p className="text-sm font-semibold text-black">
              username: admin__torus, <p> </p>password: admin@123
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <label className="flex items-center justify-center w-full bg-purple-100 rounded-lg p-4 gap-2">
              <FaUser />
              <input
                type="text"
                className="bg-purple-100 focus:outline-none placeholder:text-black w-full"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className="flex items-center justify-center w-full bg-purple-100 rounded-lg p-4 gap-2">
              <FaLock />
              <input
                onFocus={() => {
                  setError("");
                }}
                type="password"
                className="bg-purple-100 focus:outline-none placeholder:text-black w-full"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {error && (
              <p className="text-md text-red-600 font-semibold">{error}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-customLight to-customDark py-2 px-4 hover:bg-gradient-to-r hover:from-customDark hover:to-customLight w-fit text-white text-center rounded-md transition-all duration-300 ease-in-out font-semibold"
          >
            Login Now
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
