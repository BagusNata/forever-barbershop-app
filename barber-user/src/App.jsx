import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react'

//Import Pages
//Admin
import AdminPage from "../src/Admin/pages/AdminPage";

//User
import SignInPage from "../src/User/pages/SignInPage";
import SignUpPage from "../src/User/pages/SignUpPage";
import HomePage from "../src/User/pages/HomePage";
import BookingPage from "../src/User/pages/BookingPage";
import MyBookingPage from "../src/User/pages/MyBookingPage";
import TestimonialPage from "../src/User/pages/TestimonialPage";
import NotFoundPage from "../src/User/pages/NotFoundPage";
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
        {/* Admin */}
        <Route path="/admin" Component={AdminPage} />

        {/* User */}
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
