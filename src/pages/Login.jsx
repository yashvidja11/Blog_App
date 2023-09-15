import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../components/common/InputField";
import { useDispatch, useSelector } from "react-redux";
import { loginInfo } from "../redux/features/userAuth/signinSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { signUp } = useSelector((state) => state.signUpData);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const currentUser = signUp.find((item) => item.email === values.email);
      const currentUserPass = signUp.find((item) => item.password === values.password);
    
      if (currentUser) {
        if (!currentUserPass) {
          formik.setFieldError('password', 'Invalid password');
        } else {
          dispatch(loginInfo(values));
          navigate("/blog")
        }
      } else {
        formik.setFieldError('email', 'Invalid email');
      }
    }
    
  });

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Log In</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <InputField
            type="email"
            name="email"
            labelname="Email"
            classname="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-8 mb-1 ps-3"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />
          <InputField
            type={showPassword ? "text" : "password"}
            name="password"
            labelname="Password"
            classname="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-8 mb-1 ps-3"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-semibold rounded-md  bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black text-white"
          >
            Log In
          </button>
          <p className="mt-2 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
