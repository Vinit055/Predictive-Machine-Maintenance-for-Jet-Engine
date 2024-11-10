import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UserDashboard from "./components/UserDashboard";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./components/NotFound";
import ProfilePage from "./components/ProfilePage";
import CalendarPage from "./components/CalendarPage";
import EngineAnalysisDashboard from "./components/EngineAnalysisDashboard";
import EnginePerformance from "./components/EnginePerformance";
import Feedback from "./components/Feedback";
import AuthForm from "./components/AuthForm";
function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/feedback" element={<Feedback />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/reports" element={<EngineAnalysisDashboard />} />
        {/* <Route path="/performance" element={<EnginePerformance />} /> */}
        <Route path="/auth" element={<AuthForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
