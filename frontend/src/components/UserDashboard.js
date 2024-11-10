// import React from "react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import ForcastChart from "./ForcastChart.js";

// const UserDashboard = () => {
//   const navigate = useNavigate();
//   const [expanded, setExpanded] = useState(true);
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("type");
//     navigate("/");
//   };

//   const type = localStorage.getItem("type");

//   return (
//     <>
//       <nav className="bg-blue-500 p-4 text-white">
//         <div className="container mx-auto flex justify-end items-center">
//           {/* <div className="text-2xl font-bold">Capstone</div> */}
//           <ul className="flex space-x-4">
//             <li>
//               <Link to="/" className="hover:text-gray-300 text-lg">
//                 Home
//               </Link>
//             </li>
//             {type == "Manager" && (
//               <li>
//                 <Link to="/calender" className="hover:text-gray-300 text-lg">
//                   Calender
//                 </Link>
//               </li>
//             )}

//             <li>
//               <Link to="/reports" className="hover:text-gray-300 text-lg">
//                 Reports
//               </Link>
//             </li>

//             <li>
//               <Link to="/calendar" className="hover:text-gray-300 text-lg">Calendar</Link>
//             </li>
//             {/* <li>
//               <Link to="/profile" className="hover:text-gray-300 text-lg">
//                 Profile
//               </Link>
//             </li> */}

//             {/* <li>
//               <button onClick={logout} className="hover:text-gray-300 text-lg">
//                 Logout
//               </button>
//             </li> */}
//           </ul>
//         </div>
//       </nav>

//       {/* <div classname="flex justify-center items-center flex-row">
//         <div>

//           <div className="font-bold text-3xl text-center">Live sensor data</div>
//           <ForcastChart />
//         </div>

//         <div>

//           <div className="font-bold text-3xl text-center">Live sensor data</div>
//           <ForcastChart />
//         </div>

//       </div> */}

//       <ForcastChart />
//     </>
//   );
// };

// export default UserDashboard;

// ----------------------------------
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForcastChart from "./ForecastChart.js";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    navigate("/");
  };

  const type = localStorage.getItem("type");

  return (
    <>
      <nav className="bg-navy-700 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300 text-lg">
                Home
              </Link>
            </li>
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
