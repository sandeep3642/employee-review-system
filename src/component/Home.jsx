import React, { useEffect, useState } from "react";
import apiHelper from "../utils/apiHelper";
import { Link } from "react-router-dom";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Home = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await apiHelper("/api/employee/getAllEmployee", "GET");
        setEmployees(data.data); // Assuming the employee data is in the `data.data`
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployee();
  }, []);

  // Function to handle deletion of employee
  const handleDelete = async (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await apiHelper(`/api/employee/delete?id=${employeeId}`, "DELETE");
        alert("Employee deleted successfully!");
        setEmployees(employees.filter((employee) => employee.employeeId !== employeeId));
        window.location.reload()
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-screen-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-700">Employee List</h1>
        <Link to="/addEmployee">
          <button className="bg-purple-600 text-white px-4 py-2 rounded shadow-lg hover:bg-purple-700">
            + Add Employee
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="px-6 py-3 border border-gray-200">S.no</th>
              <th className="px-6 py-3 border border-gray-200">
                Employee Name
              </th>
              <th className="px-6 py-3 border border-gray-200">Email</th>
              <th className="px-6 py-3 border border-gray-200">User Type</th>
              <th className="px-6 py-3 border border-gray-200">Employee ID</th>
              <th className="px-6 py-3 border border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee, index) => (
                <tr
                  key={employee.employeeId}
                  className="bg-gray-50 text-center"
                >
                  <td className="px-6 py-2 border text-gray-800">
                    {index + 1}
                  </td>
                  <td className="px-6 py-2 border text-gray-800">
                    {employee.employeeName}
                  </td>
                  <td className="px-6 py-2 border text-gray-800">
                    {employee.email}
                  </td>
                  <td className="px-6 py-2 border text-gray-800">
                    {employee.userType}
                  </td>
                  <td className="px-6 py-2 border text-gray-800">
                    {employee.employeeId}
                  </td>
                  <td className="px-6 py-2 border text-gray-800 text-right">
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <Link to={`/editEmployee/${employee._id}`}>
                        <FaRegEdit />
                      </Link>
                      <Link to={`/viewEmployee/${employee._id}`}>
                        <FaEye />
                      </Link>
                      <button onClick={() => handleDelete(employee._id)}>
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-3 border text-center text-gray-500"
                >
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
