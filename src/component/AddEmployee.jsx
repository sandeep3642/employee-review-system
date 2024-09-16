import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiHelper from "../utils/apiHelper";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Form validation schema using Yup
const validationSchema = Yup.object({
  employeeName: Yup.string()
    .required("Employee Name is required")
    .min(3, "Name must be at least 3 characters long"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  employeeId: Yup.string().required("Employee ID is required"),
  joiningDate: Yup.string().required("Joining Date is required"),
});

const AddEmployee = () => {
  const navigate = useNavigate();

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      employeeName: "",
      email: "",
      employeeId: "",
      joiningDate: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Call the API to save employee data
        await apiHelper("/api/employee/addEmployee", "POST", values);
        toast.success("Employee added successfully!");
        navigate("/");
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    },
  });

  return (
    
    <div className=" mt-20 max-w-2xl mx-auto p-6 bg-gray-100 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
        Add Employee
      </h2>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Employee Name and Email in same row */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Employee Name */}
          <div className="flex-1">
            <label
              htmlFor="employeeName"
              className="block font-medium text-gray-700"
            >
              Employee Name
            </label>
            <input
              id="employeeName"
              name="employeeName"
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-900"
              value={formik.values.employeeName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.employeeName && formik.errors.employeeName ? (
              <div className="text-red-500 text-sm">
                {formik.errors.employeeName}
              </div>
            ) : null}
          </div>

          {/* Email */}
          <div className="flex-1">
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 p-2 w-full border rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-900"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
        </div>

        {/* Employee ID and Period */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label
              htmlFor="employeeId"
              className="block font-medium text-gray-700"
            >
              Employee ID
            </label>
            <input
              id="employeeId"
              name="employeeId"
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-900"
              value={formik.values.employeeId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.employeeId && formik.errors.employeeId ? (
              <div className="text-red-500 text-sm">
                {formik.errors.employeeId}
              </div>
            ) : null}
          </div>

          <div className="flex-1">
            <label htmlFor="period" className="block font-medium text-gray-700">
              Joining Date
            </label>
            <input
              id="joiningDate"
              name="joiningDate"
              type="date"
              className="mt-1 p-2 w-full border rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-900"
              value={formik.values.period}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.joiningDate && formik.errors.joiningDate ? (
              <div className="text-red-500 text-sm">
                {formik.errors.joiningDate}
              </div>
            ) : null}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 text-gray-900"
          >
            Add Employee
          </button>
        </div>
      </form>
      <ToastContainer /> {/* Toast container to display notifications */}
    </div>
  );
};

export default AddEmployee;
