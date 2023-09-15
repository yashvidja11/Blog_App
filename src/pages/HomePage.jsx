import React from 'react';
import img1 from '../assets/images/technology-communication-icons-symbols-concept.jpg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const {login} = useSelector((state)=>state.signInData)
  return (
    <div className="min-h-[90vh] bg-gray-50 flex items-center">
      <div className="container mx-auto p-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left px-10">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Welcome to Our Blog App
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Discover the latest insights, tips, and stories on technology,
            communication, lifestyle, travel, and much more!
          </p>
          <p className=" text-gray-600 text-lg">
            Our blog app is your go-to source for informative articles,
            in-depth tutorials, and captivating stories. Explore our diverse
            range of categories and stay updated with the latest trends.
          </p>
          <p className=" text-gray-600 text-lg">
            Whether you're a tech enthusiast, a travel junkie, or just looking
            for lifestyle hacks, we've got something for everyone. Join our
            community of readers and writers today!
          </p>
{login ? 
          <Link
            to="/blog" style={{backgroundColor:"black"}}
            className="mt-6 inline-block  text-white px-4 py-2 rounded-full  transition duration-300 font-semibold"
          >
            Explore Our Blog
          </Link> : <Link
            to="/signup"
            className="mt-6 inline-block bg-black text-white px-8 py-2 rounded-full  transition duration-300 font-semibold"
          >
            SignUp
          </Link> }
        </div>
        <div className="lg:w-1/2">
          <img src={img1} alt="Blog Home" className="w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
