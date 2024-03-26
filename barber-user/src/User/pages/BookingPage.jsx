import "../assets/css/bookingPage.css";

//Import Components
import CalendarComponent from "../components/bookingPage/CalendarComponent";
const BookingPage = () => {
  return (
    <div className="booking-page">
      {/* Navigation Bar */}
      <CalendarComponent />
    </div>
  );
};

export default BookingPage;
