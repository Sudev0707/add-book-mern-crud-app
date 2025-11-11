import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userBaseURL } from "../utilities/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  });
  const [sucessMsg, setSuccessMsg] = useState("");
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

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     // setSignUpForm({ ...signUpForm, [name]: value });
  //     setSignUpForm((prev) => {
  //       return { ...prev, [name]: value };
  //     });
  //   };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Email validation function
    const validateEmail = (email) => {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.(com|in|org|net|co|io|ai|edu|gov)(\.[a-z]{2})?$/i;

      if (!email) return "Email is required";
      if (!email.includes("@")) return "Email must include '@'";
      if (!emailRegex.test(email))
        return "Enter a valid email address (e.g., name@gmail.com)";
      return "";
    };

    setSignUpForm((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "Email") {
        const errorMsg = validateEmail(value);
        setEmailError(errorMsg);
      }

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call logic here
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (emailError) {
      toast.error("please enter valid email");
      return;
    }
    // create
    try {
      const data = await userBaseURL.post(`/create`, signUpForm);
      //   console.log("signUpForm status", data.data);
      if (data.data.success === true) {
        setSuccessMsg(data.data.message);
        toast.success(data.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again later.");
      }
      console.log("signup failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Toaster />
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-gray-600 font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                name="FirstName"
                placeholder="First name"
                value={signUpForm.FirstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-600 font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="LastName"
                placeholder="Last name"
                value={signUpForm.LastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="Email"
              placeholder="Enter your email"
              value={signUpForm.Email}
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
              placeholder="Create a password"
              value={signUpForm.Password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            // onClick={handleSignUp}
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up →
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
