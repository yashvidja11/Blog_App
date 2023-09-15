import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MasterLayout from "./layout/MasterLayout";
import HomePage from "./pages/HomePage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import { useDispatch, useSelector } from "react-redux";
import { getDatafromLocalStorage } from "./redux/features/content/contentSlice";
import ContactPage from "./pages/ContactPage";
import About from "./pages/About";
import BlogData from "./pages/BlogData";
import ProtectedRoute from "./components/ProtectedRoute";
import { getDataFromLocalStorage } from "./redux/features/userAuth/signUpSlice";

const Router = () => {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.signInData);
  useEffect(() => {
    const storedData = localStorage.getItem(`${login.email}_blogData`);
    const blogData = storedData ? JSON.parse(storedData) : [];
    dispatch(getDatafromLocalStorage(blogData));

    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    dispatch(getDataFromLocalStorage(userData));
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MasterLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<About />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/blog" element={<BlogData />} />
            <Route path="/blogdetails/:Index" element={<BlogDetailsPage />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
