import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeForm = () => {
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    name: "",
    employeeId: "",
    email: "",
    phone: "",
    department: "HR",
    dateOfJoining: "",
    role: "",
  });

  const [error, setError] = useState(""); // For displaying error message
  const [success, setSuccess] = useState(""); // For displaying success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employees",
        employeeData,
      );
      setSuccess("Employee added successfully!");
      setError(""); // Clear any previous error message
      setEmployeeData({
        name: "",
        employeeId: "",
        email: "",
        phone: "",
        department: "HR",
        dateOfJoining: "",
        role: "",
      });
    } catch (err) {
      if (err.response) {
        // Handle specific backend error responses
        if (err.response.data.error === "Employee ID already exists") {
          setError("Employee ID already exists.");
        } else if (err.response.data.error === "Email already exists") {
          setError("Email already exists.");
        } else {
          setError("An error occurred while adding the employee.");
        }
      } else {
        setError("Error adding employee.");
      }
    }
  };

  const handleNavigate = () => {
    navigate("/employees");
  };

  return (
    <div>
      <h1>Employee Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Input fields */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={employeeData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            name="employeeId"
            value={employeeData.employeeId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={employeeData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Department:</label>
          <select
            name="department"
            value={employeeData.department}
            onChange={handleChange}
          >
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <div>
          <label>Date of Joining:</label>
          <input
            type="date"
            name="dateOfJoining"
            value={employeeData.dateOfJoining}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={employeeData.role}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
        <button type="button" onClick={handleNavigate}>
          View Employees
        </button>
      </form>

      {/* Display success and error messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default EmployeeForm;
