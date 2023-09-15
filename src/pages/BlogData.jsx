import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { FaTrash } from "react-icons/fa";
import { BiEdit, BiSolidBookReader } from "react-icons/bi";
import {
  addContent,
  deleteBlog,
  editContent,
  readBlog,
} from "../redux/features/content/contentSlice";
import { useNavigate } from "react-router-dom";
import InputField from "../components/common/InputField";

const BlogData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const { login } = useSelector((state) => state.signInData);
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([
    "All",
    "Technology",
    "Travel",
    "Food",
    "Lifestyle",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const contentArray = useSelector((state) => state.content.content);

  const todayDate = new Date().toUTCString();

  const handleAddBlogClick = () => {
    setIsEditorVisible(true);
    setIsEdit(false);
    setCurrentPost({
      title: "",
      content: "",
      category: "",
      image: "",
      tags: "",
    });
  };

  const handleSearchChange = (e) => {
    setIsLoading(true);
    setSearchTerm(e.target.value);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleEditorChange = (content) => {
    setCurrentPost((prevPost) => ({ ...prevPost, content }));
  };

  const handleEdit = (index) => {
    setIsEditorVisible(true);
    setIsEdit(true);
    setEditIndex(index);
    const { title, content, category, image, tags } = contentArray[index];
    setCurrentPost({ title, content, category, image, tags });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setCurrentPost((prevPost) => ({ ...prevPost, content }));
    }
    if (currentPost.content.trim() !== "" && currentPost.title.trim() !== "") {
      const cleanContent = currentPost.content
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&mdash;/g, "–");
      const description = cleanContent.slice(0, 250);
      const newContent = {
        ...currentPost,
        description: description,
        date: todayDate.slice(0, 16),
      };

      if (isEdit && editIndex !== -1) {
        const existingContent = contentArray[editIndex];
        newContent.read = existingContent.read || 0;

        dispatch(editContent({ index: editIndex, content: newContent }));

        const storedData = JSON.parse(
          localStorage.getItem(`${login.email}_blogData`)
        );
        if (storedData) {
          storedData[editIndex] = newContent;
          localStorage.setItem(
            `${login.email}_blogData`,
            JSON.stringify(storedData)
          );
        }
      } else {
        newContent.read = 0;
        dispatch(addContent(newContent));

        const storedData =
          JSON.parse(localStorage.getItem(`${login.email}_blogData`)) || [];
        storedData.push(newContent);
        localStorage.setItem(
          `${login.email}_blogData`,
          JSON.stringify(storedData)
        );
      }

      setCurrentPost({
        title: "",
        content: "",
        category: "",
        image: "",
        tags: "",
      });

      setIsEditorVisible(false);
      setIsEdit(false);
    }
  };

  const handleDelete = (index) => {
    dispatch(deleteBlog(index));
    const storedData =
      JSON.parse(localStorage.getItem(`${login.email}_blogData`)) || [];
    storedData.splice(index, 1);
    localStorage.setItem(`${login.email}_blogData`, JSON.stringify(storedData));
  };

  const handleReadMore = (index) => {
    navigate(`/blogdetails/${index}`);
    dispatch(readBlog(index));

    const storedData =
      JSON.parse(localStorage.getItem(`${login.email}_blogData`)) || [];
    storedData[index].read = (storedData[index].read || 0) + 1;
    localStorage.setItem(`${login.email}_blogData`, JSON.stringify(storedData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleCategoryCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (value === "All") {
      if (checked) {
        setSelectedCategories([
          "All",
          "Technology",
          "Travel",
          "Food",
          "Lifestyle",
        ]);
      } else {
        setSelectedCategories([]);
      }
    } else {
      if (checked) {
        setSelectedCategories((prevCategories) => [
          ...prevCategories.filter((category) => category !== "All"),
          value,
        ]);
      } else {
        setSelectedCategories((prevCategories) =>
          prevCategories.filter(
            (category) => category !== "All" && category !== value
          )
        );
      }
    }
  };

  const filteredProductsByCategory = (item) => {
    if (selectedCategories.includes("All")) {
      return true;
    }
    return selectedCategories.includes(item.category);
  };

  const filteredContent = contentArray.filter(
    (contentObj) =>
      filteredProductsByCategory(contentObj) &&
      (contentObj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contentObj.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contentObj.tags.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5">
        <div className="text-white">
          <label className="block font-semibold text-black mb-2">
            Filter by Category
          </label>
          <div className="flex gap-3 items-center">
            {["All", "Technology", "Travel", "Food", "Lifestyle"].map(
              (category) => (
                <label className="flex items-center" key={category}>
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-400 focus:ring-2 focus:ring-blue-500"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={handleCategoryCheckboxChange}
                  />
                  <span className="ml-2 text-black">{category}</span>
                </label>
              )
            )}
          </div>
        </div>
        <input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-full ps-5  sm:w-[500px] h-[40px] focus:ring-2 focus:ring-blue-500 outline-none w-[50vw]"
        />
        <button
          onClick={handleAddBlogClick}
          style={{ backgroundColor: "#9d9d7c" }}
          className=" hover:text-black  px-8 text-white  font-semibold rounded-lg focus:ring-2 focus:ring-black w-40 h-12 text-base"
        >
          Create Blog
        </button>
      </div>

      {isEditorVisible && (
        <div className="fixed inset-0  flex justify-center items-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md w-full max-h-screen overflow-y-scroll">
            <form>
              <InputField
                labelname="Title"
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                value={currentPost.title}
                onChange={handleChange}
                classname="mt-1 p-2 border border-gray-300 rounded w-full mb-4"
              />

              <Editor
                apiKey="gz9uyut8p6xfb884jllftvin2ccq7pnez3dru3jcbi33732c"
                value={currentPost.content}
                onInit={(evt, editor) => (editorRef.current = editor)}
                onEditorChange={handleEditorChange}
                init={{
                  height: 300,
                  width: 1440,
                  menubar: false,
                  plugins: "advlist link image lists",
                  toolbar: `undo redo | blocks | bold italic | 
                  alignleft aligncenter alignright | 
                  bullist numlist outdent indent | image | 
                  link | removeformat | help`,
                  forced_root_block: "div",
                }}
              />
              <InputField
                type="url"
                labelname=" Image URL"
                id="image"
                name="image"
                placeholder="Image URL"
                value={currentPost.image}
                onChange={handleChange}
                classname="mt-1 p-2 border border-gray-300 rounded w-full mb-4"
              />

              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  value={currentPost.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  <option value="Technology">Technology</option>
                  <option value="Travel">Travel</option>
                  <option value="Food">Food</option>
                  <option value="Lifestyle">Lifestyle</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tags
                </label>
                <textarea
                  id="tags"
                  name="tags"
                  placeholder="Enter tags separated by commas"
                  value={currentPost.tags}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full h-28 resize-none"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-3"
              >
                {isEdit ? "Save Changes" : "Submit Content"}
              </button>
              <button
                onClick={() => setIsEditorVisible(false)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-300"></div>
        </div>
      ) : (
        <div>
          {filteredContent.length === 0 ? (
            <p className="text-center text-red-500 my-10">
              No blogs available for the selected category and search term.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {filteredContent.map((contentObj, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
                >
                  <div className="h-20">
                    <p className="font-bold text-xl multi-line">
                      {contentObj.title}
                    </p>
                  </div>
                  <div className="flex justify-end mt-2">
                    <p className="text-gray-500">{contentObj.category}</p>
                  </div>
                  <img
                    src={contentObj.image}
                    alt=""
                    className="w-full h-40 object-cover mt-4"
                  />
                  <p className="multi-line my-3 text-gray-700">
                    {contentObj.description}
                  </p>
                  <div className="flex gap-2 truncate">
                    {contentObj.tags.split(",").map((item) => (
                      <p className="bg-gray-100 rounded-full p-2 text-sm">
                        #{item}
                      </p>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => {
                        handleReadMore(index);
                      }}
                      className="text-blue-500 cursor-pointer"
                    >
                      Read More
                    </button>
                    <div className="flex gap-2 cursor-pointer">
                      <button onClick={() => handleEdit(index)}>
                        <BiEdit className="text-xl text-gray-500 hover:text-gray-800" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-500 cursor-pointer"
                      >
                        <FaTrash className="text-xl text-gray-500 hover:text-red-700" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 text-gray-500">
                    <div className="flex gap-2 items-center">
                      <BiSolidBookReader className="text-xl" />
                      <p>{contentObj.read}</p>
                    </div>
                    <p>{contentObj.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogData;
