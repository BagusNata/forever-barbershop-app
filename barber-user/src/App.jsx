import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

//Import Pages
//Admin
import AdminBookingsPage from "../src/Admin/pages/dashboard/AdminBookingsPage";
import AdminSessionPage from "../src/Admin/pages/dashboard/AdminSessionPage";
import AdminUsersPage from "../src/Admin/pages/dashboard/AdminUsersPage";
import AdminCapstersPage from "../src/Admin/pages/dashboard/AdminCapstersPage";
import AdminServicesPage from "../src/Admin/pages/dashboard/AdminServicesPage";
import AdminTestimoniesPage from "../src/Admin/pages/dashboard/AdminTestimoniesPage";

//User
import SignInPage from "../src/User/pages/SignInPage";
import SignUpPage from "../src/User/pages/SignUpPage";
import SignOutPage from "./User/pages/SignOutPage";
import HomePage from "../src/User/pages/HomePage";
import BookingPage from "../src/User/pages/BookingPage";
import MyBookingPage from "../src/User/pages/MyBookingPage";
import TestimonialPage from "../src/User/pages/TestimonialPage";
import NotFoundPage from "../src/User/pages/NotFoundPage";
import { useUserContext } from "./UserContext";

function App() {
  const { setUserData } = useUserContext();

  useEffect(() => {
    const userStorage = localStorage.getItem("userData");
    if (userStorage) {
      setUserData(JSON.parse(userStorage));
    }
  }, []);

  return (
    <div>
      <Routes>
        {/* Admin */}
        <Route path="/admin/bookings" Component={AdminBookingsPage} />
        <Route path="/admin/session" Component={AdminSessionPage} />
        <Route path="/admin/users" Component={AdminUsersPage} />
        <Route path="/admin/capsters" Component={AdminCapstersPage} />
        <Route path="/admin/services" Component={AdminServicesPage} />
        <Route path="/admin/testimonies" Component={AdminTestimoniesPage} />

        {/* User */}
        <Route path="/signin" Component={SignInPage} />
        <Route path="/signup" Component={SignUpPage} />
        <Route path="/signout" Component={SignOutPage} />
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
