import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import EmployeeUpdateForm from "./components/EmployeeUpdateForm"; // import the new component
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeForm />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route
          path="/employees/update/:id"
          element={<EmployeeUpdateForm />}
        />{" "}
        {/* add the new route */}
      </Routes>
    </Router>
  );
}

export default App;
