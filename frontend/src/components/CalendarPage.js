// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import { Link } from "react-router-dom";
// import "react-calendar/dist/Calendar.css"; // Import calendar styles
// import { FiCalendar, FiPlusCircle } from "react-icons/fi"; // For icons

// const CalendarPage = () => {
//   const [date, setDate] = useState(new Date());
//   const [reminders, setReminders] = useState([]);
//   const [reminderText, setReminderText] = useState("");

//   const handleDateChange = (selectedDate) => {
//     setDate(selectedDate);
//   };

//   const handleReminderChange = (e) => {
//     setReminderText(e.target.value);
//   };

//   const addReminder = () => {
//     if (reminderText.trim()) {
//       setReminders([...reminders, { date, text: reminderText }]);
//       setReminderText(""); // Reset input after adding reminder
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-0">
//       <nav className="bg-navy-700 p-4 text-white">
//         <div className="container mx-auto flex justify-end items-center">
//           <ul className="flex space-x-4">
//             <li>
//               <Link to="/" className="hover:text-gray-300 text-lg">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/dashboard" className="hover:text-gray-300 text-lg">
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link to="/reports" className="hover:text-gray-300 text-lg">
//                 Reports
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>
//       <div className="container mx-auto mt-5">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Calendar Section */}
//           <div className="bg-white p-8 rounded-lg shadow-lg">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">Pick a Date</h2>
//               <FiCalendar className="text-3xl text-blue-500" />
//             </div>
//             <Calendar
//               onChange={handleDateChange}
//               value={date}
//               className="rounded-lg"
//             />
//             <p className="mt-4 text-lg font-medium text-gray-600">
//               Selected Date:{" "}
//               <span className="text-gray-800 font-bold">
//                 {date.toDateString()}
//               </span>
//             </p>
//           </div>

//           {/* Reminder Section */}
//           <div className="bg-white p-8 rounded-lg shadow-lg">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">Set Reminder</h2>
//               <FiPlusCircle className="text-3xl text-green-500" />
//             </div>

//             <input
//               type="text"
//               className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={reminderText}
//               onChange={handleReminderChange}
//               placeholder="Enter maintenance reminder"
//             />
//             <button
//               className="mt-4 w-full bg-navy-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
//               onClick={addReminder}
//             >
//               Add Reminder
//             </button>

//             {/* List of Reminders */}
//             <div className="mt-8">
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 Upcoming Maintenance Reminders
//               </h3>
//               {reminders.length === 0 ? (
//                 <p className="text-gray-600">No reminders set.</p>
//               ) : (
//                 <ul className="space-y-4">
//                   {reminders.map((reminder, index) => (
//                     <li
//                       key={index}
//                       className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
//                     >
//                       <span className="font-semibold text-gray-800">
//                         {reminder.date.toDateString()}
//                       </span>
//                       <span className="text-gray-600">{reminder.text}</span>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarPage;

import React, { useState } from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import "react-calendar/dist/Calendar.css"; // Import calendar styles
import { FiCalendar, FiPlusCircle } from "react-icons/fi"; // For icons
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [reminders, setReminders] = useState([]);
  const [reminderText, setReminderText] = useState("");

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleReminderChange = (e) => {
    setReminderText(e.target.value);
  };

  const addReminder = () => {
    if (!reminderText.trim()) {
      toast.error("Please enter a description", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setReminders([...reminders, { date, text: reminderText }]);
    setReminderText(""); // Reset input after adding reminder
  };

  const handleDeleteReminder = (indexToDelete) => {
    setReminders((prevReminders) =>
      prevReminders.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-0">
      <ToastContainer />
      <nav className="bg-navy-700 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Maintenance Calendar</h1>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300 text-lg">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-gray-300 text-lg">
                Dashboard
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
      <div className="container mx-auto mt-5">
        <div className="p-5 bg-gray-100 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Calendar Section */}
            <div className="bg-white p-10 rounded-lg shadow-lg">
              {" "}
              {/* Increased padding */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  {" "}
                  {/* Increased font size */}
                  Pick a Date
                </h2>
                <FiCalendar className="text-4xl text-navy-700" />{" "}
                {/* Increased icon size */}
              </div>
              <div className="h-96">
                {" "}
                {/* Height remains the same */}
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  className="rounded-lg h-full"
                />
              </div>
              <p className="mt-4 text-lg font-medium text-gray-600">
                Selected Date:{" "}
                <span className="text-gray-800 font-bold">
                  {date.toDateString()}
                </span>
              </p>
            </div>

            {/* Reminder Section */}
            <div className="bg-white p-10 rounded-lg shadow-lg">
              {" "}
              {/* Increased padding */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  {" "}
                  {/* Increased font size */}
                  Set Reminder
                </h2>
                <FiPlusCircle className="text-4xl text-navy-700" />{" "}
                {/* Increased icon size */}
              </div>
              <input
                type="text"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent"
                value={reminderText}
                onChange={handleReminderChange}
                placeholder="Enter maintenance reminder"
              />
              <button
                className="mt-4 w-full bg-navy-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-navy-600 transition duration-300"
                onClick={addReminder}
              >
                Add Reminder
              </button>
              {/* List of Reminders */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Upcoming Maintenance Reminders
                </h3>
                {reminders.length === 0 ? (
                  <p className="text-gray-600">No reminders set.</p>
                ) : (
                  <ul className="space-y-4">
                    {reminders.map((reminder, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
                      >
                        <span className="font-semibold text-gray-800">
                          {reminder.date.toDateString()}
                        </span>
                        <span className="text-gray-600">{reminder.text}</span>
                        {/* Delete Icon */}
                        <button
                          onClick={() => handleDeleteReminder(index)}
                          className="text-gray-500 hover:text-red-600 ml-4"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 011-1h6a1 1 0 011 1v1h3a1 1 0 110 2h-1v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5H2a1 1 0 110-2h3V2zM4 5v10a1 1 0 001 1h8a1 1 0 001-1V5H4zm3 3a1 1 0 112 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
