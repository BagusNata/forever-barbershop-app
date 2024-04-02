import "../assets/css/bookingPage.css";
import CalendarComponent from "../components/bookingPage/CalendarComponent";
import { useUserContext } from "../../UserContext";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const BookingPage = () => {
  let navigate = useNavigate();
  const { userData, setUserData } = useUserContext();

  useEffect(() => {
    // Clear localStorage
    localStorage.removeItem("userBooking");

    // Logic to check freezeExpiryDate
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedUserData &&
      storedUserData.freezeExpiryDate &&
      new Date(storedUserData.freezeExpiryDate) > new Date()
    ) {
      // Update context with stored user data
      setUserData(storedUserData);

      // Show restricted message
      Swal.fire({
        icon: "error",
        title: "Restricted to access booking page",
        html: `Your account has been freeze until <strong>${formatDate(
          storedUserData.freezeExpiryDate
        )}</strong>`,
      }).then(() => {
        // Redirect to the home page
        navigate("/");
      });
    }
  }, [setUserData, navigate]);

  function formatDate(dateString) {
    return format(new Date(dateString), "dd MMMM yyyy, p");
  }

  return (
    <div className="booking-page">
      {/* Render CalendarComponent only if user does not have freezeExpiryDate */}
      {!(
        userData &&
        userData.freezeExpiryDate &&
        new Date(userData.freezeExpiryDate) > new Date()
      ) && <CalendarComponent />}
    </div>
  );
};

export default BookingPage;
