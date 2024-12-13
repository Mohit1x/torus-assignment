import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <div className="flex items-center justify-between p-10 bg-purple-600 sticky top-0 shadow-2xl">
      <Link to={"/login"}>
        <div>
          <h1 className="text-2xl text-white font-bold cursor-pointer">
            TORUS
          </h1>
          <p className="text-sm text-white">assignment</p>
        </div>
      </Link>
      <div className="flex items-center justify-center gap-4">
        <Link to={"/usermanagement"}>
          <button
            className={`text-black text-md font-semibold transition hover:text-white hover:underline ${
              location.pathname === "/usermanagement" && "!text-white"
            }`}
          >
            User Management
          </button>
        </Link>
        <Link to={"/analytics"}>
          <button
            className={`text-black text-md font-semibold transition hover:text-white hover:underline ${
              location.pathname === "/analytics" && "!text-white"
            }`}
          >
            Analytics Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
