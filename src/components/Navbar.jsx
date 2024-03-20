import React from "react";
import { Link } from "react-router-dom";
import InputSearch from "./InputSearch";
const Navbar = () => {
  return (
    <div className="flex md:flex-row flex-col justify-between bg-red-600 px-4 py-5 gap-2">
      <Link
        to="/"
        className="font-bold text-xl flex justify-center items-center text-white"
      >
        Movies Collection
      </Link>
      <InputSearch />
    </div>
  );
};

export default Navbar;
