import React, { useEffect, useState } from "react";
import apiHelper from "../utils/apiHelper";
import { useParams } from "react-router-dom";
const ViewEmployee = () => {
  const { id } = useParams(); // Get employee ID from URL params
  const [loading, setLoading] = useState(true);

  // Employee data is initially empty until data is fetched
  const [employee, setEmployee] = useState({
    employeeName: "",
    email: "",
    employeeId: "",
    joiningDate: "",
    feedbacks: [], // Add feedback array
  });

  const [expandedFeedback, setExpandedFeedback] = useState({}); // Track which feedback is expanded

  useEffect(() => {
    // Fetch employee data by ID when component loads
    const fetchEmployeeData = async () => {
      try {
        const response = await apiHelper(`/api/employee/getEmployebyId?id=${id}`, "GET");
        const employeeData = response.data;
        setEmployee({
          employeeName: employeeData.employeeName,
          email: employeeData.email,
          employeeId: employeeData.employeeId,
          joiningDate: employeeData.joiningDate.split("T")[0], // Format date for display
          feedbacks: employeeData.feedbacks || [], // Set feedbacks
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setLoading(false);
      }
    };
    fetchEmployeeData();
  }, [id]);

  const toggleFeedbackView = (feedbackId) => {
    setExpandedFeedback((prevState) => ({
      ...prevState,
      [feedbackId]: !prevState[feedbackId], // Toggle between expanded and collapsed state
    }));
  };

  if (loading) {
    return <div>Loading employee data...</div>;
  }

  return (
    <div className="mt-20 max-w-7xl mx-auto p-6 bg-gray-100 rounded-md shadow-lg">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
        View Employee
      </h2>

      {/* Employee Details */}
      <div className="space-y-4">
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
            <div
              id="employeeName"
              className="mt-1 p-2 w-full border rounded-md text-gray-900 bg-gray-200"
            >
              {employee.employeeName}
            </div>
          </div>

          {/* Email */}
          <div className="flex-1">
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email
            </label>
            <div
              id="email"
              className="mt-1 p-2 w-full border rounded-md text-gray-900 bg-gray-200"
            >
              {employee.email}
            </div>
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
            <div
              id="employeeId"
              className="mt-1 p-2 w-full border rounded-md text-gray-900 bg-gray-200"
            >
              {employee.employeeId}
            </div>
          </div>

          {/* Joining Date */}
          <div className="flex-1">
            <label
              htmlFor="joiningDate"
              className="block font-medium text-gray-700"
            >
              Joining Date
            </label>
            <div
              id="joiningDate"
              className="mt-1 p-2 w-full border rounded-md text-gray-900 bg-gray-200"
            >
              {employee.joiningDate}
            </div>
          </div>
        </div>

        {/* Feedbacks Section */}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Feedback for Employee
        </h2>
        {employee.feedbacks.length > 0 ? (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-gray-900">Period From</th>
                <th className="border px-4 py-2 text-gray-900">Period To</th>
                <th className="border px-4 py-2 text-gray-900">Productivity</th>
                <th className="border px-4 py-2 text-gray-900">Teamwork</th>
                <th className="border px-4 py-2 text-gray-900">Punctuality</th>
                <th className="border px-4 py-2 text-gray-900">Communication</th>
                <th className="border px-4 py-2 text-gray-900">Problem Solving</th>
                <th className="border px-4 py-2 text-gray-900">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {employee.feedbacks.map((feedback) => (
                <tr key={feedback._id}>
                  <td className="border px-4 py-2 text-gray-900">{feedback.periodFrom}</td>
                  <td className="border px-4 py-2 text-gray-900">{feedback.periodTo}</td>
                  <td className="border px-4 py-2 text-gray-900">{feedback.metrics.productivity}</td>
                  <td className="border px-4 py-2 text-gray-900">{feedback.metrics.teamwork}</td>
                  <td className="border px-4 py-2 text-gray-900">{feedback.metrics.punctuality}</td>
                  <td className="border px-4 py-2 text-gray-900">{feedback.metrics.communication}</td>
                  <td className="border px-4 py-2 text-gray-900">{feedback.metrics.problemSolving}</td>
                  <td className="border px-4 py-2 text-gray-900">
                    {expandedFeedback[feedback._id]
                      ? feedback.feedback
                      : `${feedback.feedback.substring(0, 200)}...`}
                    <button
                      className="ml-2 text-blue-500 hover:underline"
                      onClick={() => toggleFeedbackView(feedback._id)}
                    >
                      {expandedFeedback[feedback._id] ? "See Less" : "See More"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No feedback available for this employee.</p>
        )}
      </div>
    </div>
  );
};

export default ViewEmployee;
