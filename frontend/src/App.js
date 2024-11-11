import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UserDashboard from "./components/UserDashboard";
import Register from "./Register";
import NotFound from "./components/NotFound";
import ProfilePage from "./components/ProfilePage";
import CalendarPage from "./components/CalendarPage";
import EngineAnalysisDashboard from "./components/EngineAnalysisDashboard";
import EnginePerformance from "./components/EnginePerformance";
import Feedback from "./components/Feedback";
import AuthForm from "./components/AuthForm";
import InvalidUser from "./components/InvalidUser";

function isAuthenticated() {
  const authToken = localStorage.getItem("token");
  return authToken !== null && authToken !== undefined;
}

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/feedback" element={<Feedback />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<InvalidUser />} />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated() ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/calendar"
          element={isAuthenticated() ? <CalendarPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/reports"
          element={isAuthenticated() ? <EngineAnalysisDashboard /> : <Navigate to="/login" />}
        />
        {/* <Route
          path="/performance"
          element={isAuthenticated() ? <EnginePerformance /> : <Navigate to="/login" />}
        /> */}
        <Route path="/auth" element={<AuthForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;