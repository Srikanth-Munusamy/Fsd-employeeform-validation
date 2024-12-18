import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeUpdateForm = () => {
  const { id } = useParams(); // To get the employee ID from URL params
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

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch employee data when the component mounts
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employees/${id}`,
        );
        setEmployeeData(response.data);
      } catch (err) {
        setError("Error fetching employee data");
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/employees/${id}`,
        employeeData,
      );
      setSuccess(response.data.message);
      setError("");
    } catch (err) {
      setError(
        err.response ? err.response.data.error : "Error updating employee",
      );
    }
  };

  const handleNavigate = () => {
    navigate("/employees");
  };

  return (
    <div>
      <h1>Update Employee</h1>
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

        <button type="submit">Update</button>
        <button type="button" onClick={handleNavigate}>
          View Employees
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default EmployeeUpdateForm;
