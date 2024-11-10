import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForcastChart from "./ForecastChart.js";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Clear local storage
        localStorage.removeItem("token");
        localStorage.removeItem("type");
        // Navigate to home page
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const type = localStorage.getItem("type");

  return (
    <>
      <nav className="bg-navy-700 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <ul className="flex space-x-4">
            <li>
              <Link to="/calendar" className="hover:text-gray-300 text-lg">
                Calendar
              </Link>
            </li>
            <li>
              <Link to="/reports" className="hover:text-gray-300 text-lg">
                Reports
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-gray-300 text-lg"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mx-auto mt-5 p-5 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-5">
          Live Sensor Data
        </h2>
        <ForcastChart />
      </div>
    </>
  );
};

export default UserDashboard;
