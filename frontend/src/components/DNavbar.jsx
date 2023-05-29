import { useAuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import SocLogo from "../assets/soc-logo.svg";

const DNavbar = () => {
  const { isAuthenticated, logout, user } = useAuthContext();

  return (
    <div className="navbar bg-gradient-to-br from-cyan-300 to-indigo-600">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          {/* Mobile nav */}
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li tabIndex={0}>
              <a className="justify-between">
                Parent
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="items-center">
          <img src={SocLogo} alt="soc-logo" className="w-48" />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className="uppercase text-lg font-bold" to={`home`}>
              Home
            </Link>
          </li>
          <li>
            <Link
              className="uppercase text-lg font-bold"
              to={`view-assigned-module`}
            >
              Assigned Modules
            </Link>
          </li>
          <li tabIndex={0}>
            <a className="uppercase text-lg font-bold">
              view
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 z-50 bg-gray-200 border border-gray-600">
              <li>
                <Link className="uppercase text-md font-bold" to={`mc-list`}>
                  Module Cordinator List
                </Link>
              </li>
              <li>
                <Link
                  className="uppercase text-md font-bold"
                  to={`summary-by-module`}
                >
                  Summary by Module
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {isAuthenticated && (
          <div className="flex justify-between items-center gap-2">
            <p>
              Hello!{" "}
              <span className="font-semibold">{user.result.staff_name}</span>
            </p>
            <button
              className="btn btn-sm rounded-btn"
              onClick={async () => {
                await logout();
                // signout(() => navigate("/"));
              }}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DNavbar;
