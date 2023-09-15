import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import profile from "../assets/images/Screenshot 2023-09-01 120218.png"

const BlogDetailsPage = () => {
  const { Index } = useParams();
  const signUp = useSelector((state) => state.signUpData.signUp);
  const login = useSelector((state) => state.signInData.login);
  const userDetails = signUp.find((item) =>item.email === login.email);
  const addContent = useSelector((state) => state.content.content);
  const blogDetails = addContent[Index];
  const tags = (blogDetails?.tags).split(",");

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold mb-4">{blogDetails.title}</h1>
        <div className="flex items-center mb-4">
          <img
            src={profile}
            alt=""
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <p className="text-gray-700">{userDetails?.username}</p>
            <p className="text-gray-500">{blogDetails.date}</p>
          </div>
        </div>
        <img
          src={blogDetails.image}
          alt=""
          className="w-full h-auto rounded-md mb-4"
        />
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blogDetails.content }} />
        <div className='flex gap-2 mt-3'>
          {tags.map((item, index) => (
            <p key={index} className='bg-gray-200 rounded px-3 py-2 text-sm'>#{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
