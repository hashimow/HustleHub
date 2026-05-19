import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Mentors from "./pages/Mentors";
import MentorProfile from "./pages/MentorProfile";
import MentorDashboard from "./pages/MentorDashboard";
import HustleMentors from "./pages/HustleMentors";
import Books from "./pages/Books";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="mentors" element={<Mentors />} />
          <Route path="mentors/:username" element={<MentorProfile />} />

          <Route path="hustle-mentors" element={<HustleMentors />} />
          <Route path="mentor-dashboard" element={<MentorDashboard />} />

          <Route path="books" element={<Books />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;