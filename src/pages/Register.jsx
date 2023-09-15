import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import InputField from "../components/common/InputField";
import { useDispatch } from "react-redux";
import { signUpInfo } from "../redux/features/userAuth/signUpSlice";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .required("Email is Required")
    .email("Email format is not valid")
    .matches(
      /^(?=.*@)(?!.*\.\.)([A-Za-z0-9._%+-]+@([a-z]+)\.(com|in|org))$/,
      "Invalid Email format"
    ),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain at least 8 characters, one letter, one number, and one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      dispatch(signUpInfo(values));
      
  
      const userData = JSON.parse(localStorage.getItem("userData")) || [];
      userData.push(values);
      localStorage.setItem("userData", JSON.stringify(userData));
      
      
      navigate("/login");
    },
  });

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md ">
        <h2 className="text-2xl font-semibold mb-4">Create an Account</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <InputField
            type="text"
            name="username"
            value={formik.values.username}
            labelname="Username"
            classname="mt-1 block w-full border border-gray-300 rounded-md shadow-sm ps-2 h-8 mb-1"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && formik.errors.username}
          />
          <InputField
            type="email"
            name="email"
            value={formik.values.email}
            labelname="Email"
            classname="mt-1 block w-full border border-gray-300 rounded-md shadow-sm ps-2 h-8 mb-1"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />
          <InputField
            type={showPassword ? "text" : "password"}
            name="password"
            labelname="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            classname="mt-1 block w-full border border-gray-300 rounded-md shadow-sm ps-2 h-8 mb-1"
            error={formik.touched.password && formik.errors.password}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
          <InputField
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            labelname="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            classname="mt-1 block w-full border border-gray-300 rounded-md shadow-sm ps-2 h-8 mb-1"
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            showConfirmPassword={showConfirmPassword}
            onToggleConfirmPassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          />
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm  rounded-md text-white font-semibold bg-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Sign Up
          </button>
          <p className="mt-2 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-800">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
