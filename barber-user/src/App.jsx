import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react'

//Import Pages
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import MyBookingPage from "./pages/MyBookingPage";
import TestimonialPage from "./pages/TestimonialPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useUserContext } from './UserContext'

function App() {
  const { setUserData } = useUserContext()

  useEffect(() => {
    const userStorage = localStorage.getItem('userData')
    if (userStorage) {
      setUserData(JSON.parse(userStorage))
    }
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/signin" Component={SignInPage} />
        <Route path="/signup" Component={SignUpPage} />
        <Route path="/" Component={HomePage} />
        <Route path="/booking" Component={BookingPage} />
        <Route path="/myBooking" Component={MyBookingPage} />
        <Route path="/testimonial" Component={TestimonialPage} />
        <Route path="*" Component={NotFoundPage} />
      </Routes>
    </div>
  );
}

export default App;
