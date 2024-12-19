import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  // Fetch employees when the component loads
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch all employees from the backend
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees");
      setEmployees(response.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  // Delete an employee by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      alert("Employee deleted successfully!");
      fetchEmployees(); // Refresh the employee list after deletion
    } catch (err) {
      console.error("Error deleting employee:", err);
      alert("Failed to delete employee!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Employee List</h1>
      <button
        onClick={() => navigate("/")} // Navigate back to Add Employee form
        style={{
          marginBottom: "15px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Add New Employee
      </button>
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Date of Joining</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.employee_id}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.department}</td>
                <td>{emp.date_of_joining}</td>
                <td>{emp.role}</td>
                <td>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#DC3545",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: "3px",
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/employees/update/${emp.id}`)} // Navigate to update form
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#007BFF",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: "3px",
                      marginLeft: "10px",
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
