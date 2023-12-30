import { Routes, Route } from "react-router-dom";

//Import Pages
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import TestimonialPage from "./pages/TestimonialPage";
import NotFoundPage from "./pages/NotFoundPage";
import { UserContextProvider } from './UserContext'

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/signin" Component={SignInPage} />
        <Route path="/signup" Component={SignUpPage} />
        <Route path="/" Component={HomePage} />
        <Route path="/booking" Component={BookingPage} />
        <Route path="/testimonial" Component={TestimonialPage} />
        <Route path="*" Component={NotFoundPage} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
