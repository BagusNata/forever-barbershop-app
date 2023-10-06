import { Routes, Route } from "react-router-dom";

//Import Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import TestimonialPage from "./pages/TestimonialPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/" Component={HomePage} />
        <Route path="/booking" Component={BookingPage} />
        <Route path="/testimonial" Component={TestimonialPage} />
        <Route path="*" Component={NotFoundPage} />
      </Routes>
    </div>
  );
}

export default App;
