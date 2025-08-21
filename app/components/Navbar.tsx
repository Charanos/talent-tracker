import React from "react";
import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth } = usePuterStore();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // Optionally redirect to home or refresh the page
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <nav className="navbar sticky top-10 z-50">
      <Link to="/">
        <h2 className="!font-semibold uppercase text-gradient !text-base">
          Andishi Pipeline
        </h2>
      </Link>
      <div className="flex items-center gap-3">
        {auth.isAuthenticated && (
          <button
            onClick={handleSignOut}
            className="capitalize cursor-pointer hover:underline secondary-button w-fit !py-1"
          >
            Sign Out
          </button>
        )}
        <Link to="/upload" className="capitalize primary-button w-fit !py-1">
          Analyze Resume
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
