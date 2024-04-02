import "../assets/css/bookingPage.css";
import CalendarComponent from "../components/bookingPage/CalendarComponent";
import { useUserContext } from "../../UserContext";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  let navigate = useNavigate();
  const { userData } = useUserContext();

  // Clear localStorage
  localStorage.removeItem("userBooking");

  //format date
  function formatDate(dateString) {
    return format(new Date(dateString), "dd MMMM yyyy, p");
  }

  // Logic to check freezeExpiryDate
  if (
    userData &&
    userData.freezeExpiryDate &&
    new Date(userData.freezeExpiryDate) > new Date()
  ) {
    // User has a freeze expiry date in the future
    // Show restricted message
    Swal.fire({
      icon: "error",
      title: "Restricted to access booking page",
      html: `Your account has been freeze until <strong>${formatDate(
        userData.freezeExpiryDate
      )}</strong>`,
    }).then(() => {
      // Redirect to the home page
      navigate("/");
    });
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
