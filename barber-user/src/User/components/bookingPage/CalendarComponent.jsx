import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import { useUserContext } from "../../../UserContext";

const BookingComponent = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [service, setService] = useState([]);
  const [syaratKeten, setSyaratKeten] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const { userData } = useUserContext();

  useEffect(() => {
    const Time = [
      { id: 1, value: 11 },
      { id: 2, value: 12 },
      { id: 3, value: 13 },
    ];

    const getBookingTime = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/bookings/me/time`,
          {
            method: "POST",
            headers: {
              "x-access-token": userData.accessToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ date: date.toISOString() }), // Send selected date to API
          }
        );
        const bookedTime = await response.json();
        // Check if there are already 3 bookings for the selected date
        if (bookedTime.length < 3) {
          setAvailableTimes(Time);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setAvailableTimes([]); // Reset available times on error
      }
    };

    const getService = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/services`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setService(await response.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Run only if accessToken exists and showTime is true
    if (userData.accessToken && showTime) {
      getBookingTime();
      getService();
    }
  }, [userData, date, showTime]);

  const isPastDate = (selectedDate) => {
    const currentDate = new Date();
    return selectedDate < currentDate;
  };

  // push selected Time & Service data to userBooking
  const handleServiceClick = (selectedService) => {
    setSelectedService(selectedService); // Set selected service
    let userBooking = {
      nama: userData.id ? userData.id : null,
      date: date.toDateString() ? date.toDateString() : null,
      time: selectedTime.value ? selectedTime.value : null,
      serviceId: selectedService.id,
    };
    localStorage.setItem("userBooking", JSON.stringify(userBooking));
  };

  // push selected Time & Service data to userBooking
  const handleTimeClick = (selectedTime) => {
    setSelectedTime(selectedTime); // Set selected time
    let userBooking = {
      nama: userData.id,
      date: date.toDateString(),
      time: selectedTime.value,
      serviceId: selectedService ? selectedService.id : null,
    };
    localStorage.setItem("userBooking", JSON.stringify(userBooking));
  };

  const handleSyaratKetenChange = (event) => {
    setSyaratKeten(event.target.checked);
  };

  // Function post data to db. booking
  const addBooking = async (bookingData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "x-access-token": userData.accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to add booking");
      }
    } catch (error) {
      console.error("Error adding booking:", error);
      throw error;
    }
  };

  const handleSubmitBooking = async () => {
    if (syaratKeten && selectedTime && selectedService) {
      setIsLoading(true);
      console.log("Submitting booking...");
      try {
        const response = await addBooking(JSON.parse(localStorage.userBooking));
        setIsLoading(false);
        console.log("Booking submitted successfully:", response);
        navigate("/myBooking");
      } catch (error) {
        setIsLoading(false);
        console.error("Failed to submit booking:", error);
      }
    }
  };

  return (
    <div className="booking-page w-100 min-vh-100">
      <Container>
        <Row className="py-5">
          <img
            data-aos="zoom-in-up"
            src="./brand-transparent.webp"
            alt="Forever Barbershop"
            onClick={() => navigate("/")}
          />
        </Row>
        <Row>
          <Col data-aos="zoom-in">
            <h1 className="text-center fw-bold mt-3">Booking</h1>
            <p className="text-center">
              Silahkan pilih sesi sesuai jadwal yang sudah disediakan oleh
              Forever Barbershop.
            </p>
          </Col>
        </Row>
        <Row>
          <div className="d-flex justify-content-center">
            <Calendar
              onChange={setDate}
              value={date}
              onClickDay={() => setShowTime(true)}
              tileDisabled={({ date }) => isPastDate(date)} // Disable past dates
            />
          </div>
          <p className="d-flex justify-content-center mt-4">
            <span>Tanggal yang dipilih: </span> &nbsp;
            {date.toDateString()}
          </p>
          {showTime && (
            <div>
              {/* Show service */}
              <div className="d-flex justify-content-center mt-4">
                {service.map((serviceItem) => (
                  <button
                    key={serviceItem.id}
                    className={`btn btn-primary me-2 ${
                      selectedService && selectedService.id === serviceItem.id
                        ? "btn-selected"
                        : ""
                    }`}
                    onClick={() => handleServiceClick(serviceItem)}
                  >
                    {serviceItem.name}
                  </button>
                ))}
              </div>

              {/* Show booking time */}
              <div className="d-flex justify-content-center mt-4 py-2">
                {availableTimes.map((time) => (
                  <button
                    key={time.id}
                    className={`btn btn-primary me-2 ${
                      selectedTime && selectedTime.id === time.id
                        ? "btn-selected"
                        : ""
                    }`}
                    onClick={() => handleTimeClick(time)}
                    disabled={isPastDate(date)} // Disable time buttons for past dates
                  >
                    {time.value}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Row>
        <Row>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="syaratKetentuan"
              value={syaratKeten}
              onChange={handleSyaratKetenChange}
              checked={syaratKeten}
            />
            <label className="form-check-label" htmlFor="syaratKetentuan">
              Syarat dan ketentuan berlaku
            </label>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="btn btn-success"
              disabled={!syaratKeten || isLoading}
              onClick={handleSubmitBooking}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default BookingComponent;
