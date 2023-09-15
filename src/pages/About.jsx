// About.js

import React from "react";
import profile from "../assets/images/Screenshot 2023-09-01 120218.png"
function About() {
  return (
    <div className="bg-gray-50 min-h-[90vh] p-8 flex justify-center items-center">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md">
        <h1 className="text-3xl font-semibold mb-4">About Our Blog</h1>
        <p className="text-gray-700 mb-6">
          Welcome to our blog! We are passionate about sharing knowledge and
          insights on a variety of topics. Whether it's technology, lifestyle,
          or travel, we've got you covered.
        </p>
        <h2 className="text-xl font-semibold mb-2">Our Team</h2>
        <div className="w-full">
          <div className=" p-4">
            <img
              src={profile}
              alt="Team Member Name"
              className="w-20 h-20 rounded-full  mb-2"
            />
            <h3 className="text-lg font-semibold">Yash Patel</h3>
            <p className="text-gray-600">Role: Software Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
