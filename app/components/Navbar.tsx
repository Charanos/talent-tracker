import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar sticky top-10 z-50">
      <Link to="/">
        <h2 className="!font-semibold uppercase text-gradient !text-base">
          Andishi Pipeline
        </h2>
      </Link>
      <Link to="/upload" className="capitalize primary-button w-fit !py-1">
        Analyze Resume
      </Link>
    </nav>
  );
};

export default Navbar;
