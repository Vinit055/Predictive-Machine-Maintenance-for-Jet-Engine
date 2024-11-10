// import React from "react";
// import { Link } from "react-router-dom";
// const LandingPage = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen font-sans">
//       {/* Navigation */}
//       <nav className="bg-blue-500 p-4 text-white w-full">
//         <div className="container mx-auto flex justify-between items-center">
//           {/* <div className="text-2xl font-bold">AI Kavach</div> */}
//           {/* <ul className="flex space-x-4">
//             <li>
//               <Link to="/" className="hover:text-gray-300">
//                 Home
//               </Link>
//             </li>
//             <li><Link to="/login" className="hover:text-gray-300">Sign In </Link></li>
//             <li><Link to="/register" className="hover:text-gray-300">Register</Link></li>
//           </ul> */}
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="bg-blue-500 text-white text-center p-6">
//         <h1 className="text-4xl font-bold mb-4">
//           Predictive Machine Maintenance for Jet Engine
//         </h1>
//         <p className="text-xl mb-8">
//           Utilize AI to prevent downtime and optimize maintenance schedules.
//         </p>
//         <button className="bg-blue-800 text-white font-bold py-2 px-4 rounded">
//           <Link to="/dashboard" className="hover:text-gray-300">
//             Get Started
//           </Link>
//         </button>
//       </div>

//       {/* Features Section */}
//       <div className="py-12">
//         <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Feature 1 */}
//           <div className="text-center bg-white p-6 max-w-sm mx-auto rounded-lg shadow-md">
//             <h2 className="font-bold text-lg">Real-Time Monitoring</h2>
//             <p>
//               Monitor Jet engine systems in real-time to detect issues before
//               they escalate.
//             </p>
//           </div>
//           {/* Feature 2 */}
//           <div className="text-center bg-white p-6 max-w-sm mx-auto rounded-lg shadow-md">
//             <h2 className="font-bold text-lg">Predictive Analysis</h2>
//             <p>
//               Our AI algorithms predict failures and suggest the optimal
//               maintenance schedule.
//             </p>
//           </div>
//           {/* Feature 3 */}
//           <div className="text-center bg-white p-6 max-w-sm mx-auto rounded-lg shadow-md">
//             <h2 className="font-bold text-lg">Cost Reduction</h2>
//             <p>
//               Reduce maintenance costs by preventing unnecessary repairs and
//               downtime.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Info Section */}
//       <div className="py-6 bg-gray-100">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-center font-bold text-2xl mb-4">
//             The Power of AI in Maintenance
//           </h2>
//           <p>
//             By harnessing the power of AI and predictive modeling, our app
//             analyzes data from your jet engine systems to forecast potential
//             issues, ensuring that maintenance can be conducted just in time to
//             prevent failures. This proactive approach guarantees the longevity
//             of your equipment and minimizes downtime.
//           </p>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white text-center py-2 fixed bottom-0 left-0 w-full">
//         <p>&copy; Capstone. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;
// -------------------------------------------------------
// import React from "react";
// import { Link } from "react-router-dom";

// const LandingPage = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen font-sans">
//       {/* Navigation */}
//       <nav className="bg-blue-500 p-4 text-white w-full">
//         <div className="container mx-auto flex justify-between items-center">
//           <div className="text-2xl font-bold">Jet Engine Predictor</div>
//           <ul className="flex space-x-4">
//             <li>
//               <Link to="/" className="hover:text-gray-300">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/login" className="hover:text-gray-300">
//                 Sign In
//               </Link>
//             </li>
//             <li>
//               <Link to="/register" className="hover:text-gray-300">
//                 Register
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="bg-blue-500 text-white text-center p-6">
//         <h1 className="text-4xl font-bold mb-4">
//           Predictive Maintenance for Jet Engines
//         </h1>
//         <p className="text-xl mb-8">
//           Utilize AI to prevent downtime and optimize maintenance schedules.
//         </p>
//         <button className="bg-blue-800 text-white font-bold py-2 px-4 rounded">
//           <Link to="/dashboard" className="hover:text-gray-300">
//             Get Started
//           </Link>
//         </button>
//       </div>

//       {/* Features Section */}
//       <div className="py-12">
//         <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Feature 1 */}
//           <div className="text-center bg-white p-6 max-w-sm mx-auto rounded-lg shadow-md">
//             <h2 className="font-bold text-lg">Real-Time Monitoring</h2>
//             <p>
//               Keep an eye on jet engine performance metrics and detect anomalies
//               instantly.
//             </p>
//           </div>
//           {/* Feature 2 */}
//           <div className="text-center bg-white p-6 max-w-sm mx-auto rounded-lg shadow-md">
//             <h2 className="font-bold text-lg">Predictive Analysis</h2>
//             <p>
//               AI algorithms forecast failures and recommend the best maintenance
//               schedules.
//             </p>
//           </div>
//           {/* Feature 3 */}
//           <div className="text-center bg-white p-6 max-w-sm mx-auto rounded-lg shadow-md">
//             <h2 className="font-bold text-lg">Cost Efficiency</h2>
//             <p>
//               Minimize unnecessary repairs and reduce maintenance costs through
//               smart scheduling.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Info Section */}
//       <div className="py-6 bg-gray-100">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-center font-bold text-2xl mb-4">
//             Harnessing AI for Smarter Maintenance
//           </h2>
//           <p>
//             By leveraging predictive modeling and machine learning, our
//             application processes data from jet engine systems to identify
//             potential issues before they become critical. This proactive
//             approach ensures your engines operate at peak performance and
//             minimizes unexpected downtimes, ultimately extending the lifespan of
//             your valuable assets.
//           </p>
//         </div>
//       </div>

//       {/* Testimonials Section */}
//       <div className="py-12">
//         <h2 className="text-center font-bold text-2xl mb-4">
//           What Our Users Say
//         </h2>
//         <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <p className="italic">
//               "This predictive maintenance tool has transformed how we manage
//               our engines!"
//             </p>
//             <p className="font-bold">- Alex, Maintenance Manager</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <p className="italic">
//               "We’ve seen a significant reduction in downtime since using this
//               application!"
//             </p>
//             <p className="font-bold">- Sarah, Operations Director</p>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white text-center py-2 fixed bottom-0 left-0 w-full">
//         <p>
//           &copy; {new Date().getFullYear()} Jet Engine Predictor. All rights
//           reserved.
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;

//-------------------

import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Navigation */}
      {/* <nav className="bg-navy-700 p-4 text-white w-full">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Jet Engine Predictor</div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gray-300">
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-gray-300">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </nav> */}

      {/* Hero Section */}
      <div className="bg-navy-700 text-white text-center p-6">
        <h1 className="text-4xl font-bold mb-4">
          Predictive Maintenance for Jet Engines
        </h1>
        <p className="text-xl mb-8">
          Utilize AI and ML to prevent downtime and optimize maintenance
          schedules.
        </p>
        <Link to="/auth" className="hover:text-gray-300">
          <button className="bg-navy-900 text-white font-bold py-2 px-4 rounded hover:bg-navy-800">
            Get Started
          </button>
        </Link>
      </div>

      {/* Features Section */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="text-center bg-white p-6 max-w-sm mx-auto rounded-lg shadow-md">
            <h2 className="font-bold text-lg">Real-Time Monitoring</h2>
            <p>
              Keep an eye on engine performance metrics and detect anomalies
              instantly.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="text-center bg-white p-6 max-w-sm mx-auto rounded-lg shadow-md">
            <h2 className="font-bold text-lg">Predictive Analysis</h2>
            <p>
              AI algorithms forecast failures and recommend the best maintenance
              schedules.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="text-center bg-white p-6 max-w-sm mx-auto rounded-lg shadow-md">
            <h2 className="font-bold text-lg">Cost Efficiency</h2>
            <p>
              Minimize unnecessary repairs and reduce maintenance costs through
              smart scheduling.
            </p>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="py-6 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center font-bold text-2xl mb-4">
            Harnessing AI for Smarter Maintenance
          </h2>
          <p>
            By leveraging predictive modeling and machine learning, our
            application processes data from jet engine systems to identify
            potential issues before they become critical. This proactive
            approach ensures your engines operate at peak performance and
            minimizes unexpected downtimes, ultimately extending the lifespan of
            your valuable assets.
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-12">
        <h2 className="text-center font-bold text-2xl mb-4">
          What Our Users Say
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="italic">
              "This predictive maintenance tool has transformed how we manage
              our engines!"
            </p>
            <p className="font-bold">- Alex, Maintenance Manager</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="italic">
              "We’ve seen a significant reduction in downtime since using this
              application!"
            </p>
            <p className="font-bold">- Sarah, Operations Director</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-2 fixed bottom-0 left-0 w-full">
        <p>&copy; {new Date().getFullYear()} Capstone Project.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
