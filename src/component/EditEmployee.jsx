import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiHelper from "../utils/apiHelper";
import { useNavigate, useParams } from "react-router-dom";
import FeedbackForm from "./FeedbackForm"; // Import FeedbackForm component
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

const EditEmployee = () => {
    const { id } = useParams(); // Get employee ID from URL params
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    // Initial form values are empty strings until data is fetched
    const [initialValues, setInitialValues] = useState({
      id: "",
      employeeName: "",
      email: "",
      employeeId: "",
      joiningDate: "",
    });
  
    useEffect(() => {
      // Fetch employee data by ID when component loads
      const fetchEmployeeData = async () => {
        try {
          const response = await apiHelper(`/api/employee/getEmployebyId?id=${id}`, "GET");
          const employee = response.data;
          setInitialValues({
            id: employee._id,
            employeeName: employee.employeeName,
            email: employee.email,
            employeeId: employee.employeeId,
            joiningDate: employee.joiningDate.split("T")[0], // Format date for input
          });
          setLoading(false);
        } catch (error) {
          console.error("Error fetching employee data:", error);
          setLoading(false);
        }
      };
      fetchEmployeeData();
    }, [id]);
  
    // Formik initialization
    const formik = useFormik({
      enableReinitialize: true, // Allow Formik to reinitialize with new initialValues
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        // Build employeeData with only changed values
        const employeeData = Object.keys(values).reduce((acc, key) => {
          if (values[key] !== initialValues[key]) {
            acc[key] = values[key];
          }
          return acc;
        }, {});
  
        // Check if any form values are different from the initial values
        if (Object.keys(employeeData).length === 0) {
          alert("No changes detected.");
          return;
        }
  
        try {
          // Ensure the ID is included in the update request
          employeeData.id = id;
  
          // Call the API to update employee data
          await apiHelper(`/api/employee/update`, "POST", employeeData);
          alert("Employee updated successfully!");
          navigate("/"); // Navigate to home page after successful update
        } catch (error) {
          console.error("Error updating employee:", error);
        }
      },
    });
  

    const handleFeedbackSubmit = async (feedbackData) => {
        try {
          const response = await apiHelper("/api/employee/generateFeedback", "POST", feedbackData);
          if (response.status === 200) {
            toast.success("Feedback submitted successfully!");
            setShowFeedbackForm(false); // Hide feedback form after submission
            
          } else {
            console.error("Error submitting feedback:", response.error);
            toast.success("Failed to submit feedback. Please try again.");
          }
        } catch (error) {
          toast.error("Error submitting feedback:", error);
          alert("An error occurred while submitting feedback. Please try again.");
        }
      };
      

    if (loading) {
      return <div>Loading employee data...</div>;
    }
  


  return (
    <div className="mt-20 max-w-2xl mx-auto p-6 bg-gray-100 rounded-md shadow-lg">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
        Edit Employee
      </h2>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Employee Name and Email in the same row */}
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

        {/* Employee ID and Joining Date */}
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

          {/* Joining Date */}
          <div className="flex-1">
            <label
              htmlFor="joiningDate"
              className="block font-medium text-gray-700"
            >
              Joining Date
            </label>
            <input
              id="joiningDate"
              name="joiningDate"
              type="date"
              className="mt-1 p-2 w-full border rounded-md focus:ring-purple-500 focus:border-purple-500 text-gray-900"
              value={formik.values.joiningDate}
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
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            Update Employee
          </button>
        </div>
      </form>
      <form>
        {/* Employee Form Fields (omitted for brevity) */}
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={() => setShowFeedbackForm(!showFeedbackForm)} // Toggle feedback form visibility
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            {showFeedbackForm ? "Hide Feedback Form" : "Show Feedback Form"}
          </button>
        </div>
      </form>
      {/* Feedback Form */}
      {showFeedbackForm && (
        <div className="mt-6 p-6 bg-white rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Employee Feedback</h2>
          <FeedbackForm
            employeeId={id} // Pass employee ID to FeedbackForm
            onSubmitFeedback={handleFeedbackSubmit} // Handle feedback submission
            onClose={() => setShowFeedbackForm(false)} // Close feedback form
          />
        </div>
      )}
        <ToastContainer /> {/* Toast container to display notifications */}
    </div>
  );
};

export default EditEmployee;
