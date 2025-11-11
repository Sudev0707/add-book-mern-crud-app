import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { userBaseURL } from "../utilities/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const SignIn = () => {
  const [loginForm, setLoginForm] = useState({ Email: "", Password: "" });
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  //
  const userAuth = localStorage.getItem("userAuth");
  const authUser = JSON.parse(userAuth);
  useEffect(() => {
    if (authUser?.isLogin) {
      navigate("/");
    }
  }, []);

  //  email validation
  const validateEmail = (email) => {
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // return emailRegex.test(email);
    // basic email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // check if includes @ and ends with .com
    const hasAtSymbol = email.includes("@");
    const hasDotCom = email.toLowerCase().endsWith(".com");

    if (!hasAtSymbol) {
      return { valid: false, message: "Email must include '@' symbol" };
    }

    if (!hasDotCom) {
      return { valid: false, message: "Email must end with '.com'" };
    }

    if (!emailRegex.test(email)) {
      return { valid: false, message: "Enter a valid email address" };
    }

    return { valid: true, message: "" };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });

    // check email format
    if (name === "email") {
      const { valid, message } = validateEmail(value);
      setEmailError(valid ? "" : message);

      //   if (!validateEmail(value)) {
      //     setEmailError("enter valid email ");
      //   } else {
      //     setEmailError("");
      //   }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await userBaseURL.post("/login", loginForm);
      console.log("login data", res.data);

      const authData = {
        isLogin: true,
        token: res.data?.token,
      };

      // You can store token if needed
      localStorage.setItem("userAuth", JSON.stringify(authData));
      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again later.");
      }
      console.log("login failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Toaster />
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Sign In to CRUD
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="Email"
              placeholder="Enter your email"
              value={loginForm.Email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="Password"
              placeholder="Enter your password"
              value={loginForm.Password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            // onClick={handleSubmit}
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign In →
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <NavLink
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
