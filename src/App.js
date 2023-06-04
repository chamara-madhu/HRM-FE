import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CafesPage from "./pages/CafesPage";
import EmployeesPage from "./pages/EmployeesPage";
import AddEditCafePage from "./pages/AddEditCafePage";
import "react-toastify/dist/ReactToastify.css";
import "./sass/main.scss";
import AddEditEmployeePage from "./pages/AddEditEmployeePage";

const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<CafesPage />} />
          <Route path="/cafes" element={<CafesPage />} />
          <Route path="/cafes/add" element={<AddEditCafePage />} />
          <Route path="/cafes/edit/:id" element={<AddEditCafePage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/employees/add" element={<AddEditEmployeePage />} />
          <Route path="/employees/edit/:id" element={<AddEditEmployeePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
