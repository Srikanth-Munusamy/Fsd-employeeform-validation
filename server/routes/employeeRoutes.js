const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Route to add a new employee
router.post("/employees", async (req, res) => {
  const { name, employeeId, email, phone, department, dateOfJoining, role } =
    req.body;

  // Input validations
  if (
    !name ||
    !employeeId ||
    !email ||
    !phone ||
    !department ||
    !dateOfJoining ||
    !role
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check for duplicate employeeId
    const [existingEmployeeId] = await db.query(
      "SELECT * FROM employees WHERE employee_id = ?",
      [employeeId],
    );
    if (existingEmployeeId.length > 0) {
      return res.status(400).json({ error: "Employee ID already exists" });
    }

    // Check for duplicate email
    const [existingEmail] = await db.query(
      "SELECT * FROM employees WHERE email = ?",
      [email],
    );
    if (existingEmail.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Insert employee into the database
    const sql = `
      INSERT INTO employees (name, employee_id, email, phone, department, date_of_joining, role)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await db.query(sql, [
      name,
      employeeId,
      email,
      phone,
      department,
      dateOfJoining,
      role,
    ]);

    return res.status(201).json({ message: "Employee added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error adding employee" });
  }
});

// Route to fetch all employees
router.get("/employees", async (req, res) => {
  try {
    const [employees] = await db.query("SELECT * FROM employees");
    if (employees.length === 0) {
      return res.status(404).json({ error: "No employees found" });
    }
    return res.status(200).json(employees);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error fetching employees" });
  }
});

// Route to fetch a single employee by ID
router.get("/employees/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [employee] = await db.query("SELECT * FROM employees WHERE id = ?", [
      id,
    ]);
    if (employee.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    return res.status(200).json(employee[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error fetching employee" });
  }
});

// Route to delete an employee by ID
router.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("DELETE FROM employees WHERE id = ?", [id]);
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error deleting employee" });
  }
});

module.exports = router;
