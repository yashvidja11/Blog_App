import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/common/InputField';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  message: Yup.string().required('Message is required'),
});

function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      // Simulate a successful submission
      setTimeout(() => {
        setIsSuccess(true);
        action.resetForm();
        // Reset the success message after a delay (e.g., 3 seconds)
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      }, 1000);
    },
  });

  return (
    <div className="bg-gray-50 min-h-[90vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
        <h2 className="text-3xl font-semibold mb-4 text-center">Get in Touch</h2>
        <p className="text-gray-700 mb-4 text-center">
          Have questions or feedback? We'd love to hear from you! Fill out the form below, and we'll get back to you as soon as possible.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <InputField
              labelname="Your Name"
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              classname="w-full border-gray-300 border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              error={formik.errors.name}
            />
          </div>
          <div className="mb-4">
            <InputField
              labelname="Email Address"
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              classname="w-full border-gray-300 border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              error={formik.errors.email}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows="4"
              className="w-full border-gray-300 border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
            {formik.touched.message && formik.errors.message ? (
              <div className="text-red-500">{formik.errors.message}</div>
            ) : null}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-yellow-300 text-black px-4 py-2 rounded-md hover:bg-yellow-400 font-semibold transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
        {isSuccess && (
          <div className="mt-4 p-2 bg-green-200 text-green-800 rounded-md text-center">
            Query successfully sent! We'll get back to you soon.
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactPage;
