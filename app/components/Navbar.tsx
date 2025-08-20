import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar sticky top-10 z-50">
      <Link to="/">
        <h2 className="!font-semibold uppercase text-gradient !text-base">
          talenttracker
        </h2>
      </Link>
      <Link to="/upload" className="capitalize primary-button w-fit !py-1">
        Upload resume
      </Link>
    </nav>
  );
};

export default Navbar;
