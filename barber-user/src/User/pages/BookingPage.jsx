import "../assets/css/bookingPage.css";
import CalendarComponent from "../components/bookingPage/CalendarComponent";

const BookingPage = () => {
  // Clear localStorage
  localStorage.removeItem("userBooking");

  return (
    <div className="booking-page">
      <CalendarComponent />
    </div>
  );
};

export default BookingPage;
