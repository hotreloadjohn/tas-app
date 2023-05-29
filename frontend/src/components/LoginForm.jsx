import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const LoginForm = () => {
  // const [staffid, setStaffId] = useState("");
  // const [password, setPassword] = useState("");
  const [inputs, setInputs] = useState({
    staffid: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();

  let from = location.state?.from?.pathname;

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/home");
    } catch (err) {
      // setError(err.response.data);
    }
    // Perform login logic here
    // console.log("Login submitted");
    // console.log("staffid:", staffid);
    // console.log("Password:", password);

    // const userData = auth.signin(staffid, password);

    // if (userData) {
    //   if (userData.role.length > 1 || userData.role.includes("admin")) {
    //     navigate("/landing", { replace: true });
    //   } else {
    //     navigate("/home", { replace: true });
    //   }
    // }

    // // Reset form fields
    // setStaffId("");
    // setPassword("");
  };

  return (
    // <div className="max-w-md mx-auto">
    //   <form
    //     onSubmit={handleSubmit}
    //     className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4"
    //   >
    // <div className="mb-4">
    //   <label
    //     className="block text-gray-700 text-sm font-bold mb-2"
    //     htmlFor="staffid"
    //   >
    //     Staff ID
    //   </label>
    //   <input
    //     className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //     id="staffid"
    //     name="staffid"
    //     type="text"
    //     placeholder="Staff ID"
    //     onChange={handleChange}
    //     required
    //   />
    // </div>
    // <div className="mb-4">
    //   <label
    //     className="block text-gray-700 text-sm font-bold mb-2"
    //     htmlFor="password"
    //   >
    //     Password
    //   </label>
    //   <input
    //     className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //     id="password"
    //     name="password"
    //     type="password"
    //     placeholder="Password"
    //     onChange={handleChange}
    //     required
    //   />
    // </div>
    //     <div className="flex items-center justify-between">
    //       <button
    //         className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    //         type="submit"
    //       >
    //         Sign In
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-bgimg bg-cover bg-center">
      <div className="bg-white bg-opacity-5 backdrop-filter backdrop-blur-md max-w-md w-full p-6 rounded-md shadow-lg">
        <h2 className="text-2xl text-gray-600 font-bold mb-6 font-sans uppercase">
          Teaching Allocation System
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="staffid"
            >
              Staff ID
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="staffid"
              name="staffid"
              type="text"
              placeholder="Enter your Staff ID"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your Password"
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
