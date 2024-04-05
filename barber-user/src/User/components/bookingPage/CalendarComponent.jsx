import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import { useUserContext } from "../../../UserContext";
import { format } from "date-fns";
import Swal from "sweetalert2";

const BookingComponent = () => {
  let navigate = useNavigate();
  const [session, setSession] = useState([]);
  const [service, setService] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedTime, setBookedTime] = useState([]);
  const [showTime, setShowTime] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [syaratKeten, setSyaratKeten] = useState(false);
  const { userData } = useUserContext();

  useEffect(() => {
    const getSession = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/sessions`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setSession(await response.json());
      } catch (error) {
        console.error("Error fetching data:", error);
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

    getSession();
    getService();
  }, []);

  // logic to check past date
  const isPastDate = (selectedDate) => {
    const currentDate = new Date();
    // Subtract one day from the current date
    const pastDate = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - 1);
    return selectedDate < pastDate;
  };

  const getBookingsTime = async (dateSelected) => {
    try {
      // Create a new Date object and add one day
      const newDate = new Date(dateSelected);
      newDate.setDate(newDate.getDate() + 1);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings/time`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: newDate.toISOString(),
          }),
        }
      );
      setBookedTime(await response.json());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // logic to check past time
  const isPastTime = (selectedDate, sessionTime) => {
    const currentDate = new Date();

    // Check if selectedDate is the same as currentDate
    if (
      selectedDate.getDate() === currentDate.getDate() &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    ) {
      // Compare the sessionTime with the current hour
      const currentHour = new Date().getHours() + 1;
      return currentHour > sessionTime;
    } else {
      // If the selectedDate is not the current date, return false
      return false;
    }
  };

  const isSessionFull = (sessionId) => {
    // cek duplicated sessionId di bookedTime array
    const count = bookedTime.reduce((acc, booking) => {
      if (booking.sessionId === sessionId) {
        acc++;
      }
      return acc;
    }, 0);

    return count >= 3;
  };

  // push selected Time & Service data to userBooking
  const handleTimeClick = (selectedTime) => {
    setSelectedTime(selectedTime);

    // Create a new Date object and add one day
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);

    let userBooking = {
      nama: userData.id,
      date: newDate.toISOString(), // Store the date as a string in ISO 8601 format
      sessionId: selectedTime.id,
      serviceId: selectedService ? selectedService.id : null,
    };
    localStorage.setItem("userBooking", JSON.stringify(userBooking));
  };

  const handleServiceClick = (selectedService) => {
    setSelectedService(selectedService);

    // Create a new Date object and add one day
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);

    let userBooking = {
      nama: userData.id ? userData.id : null,
      date: newDate.toISOString(), // Store the date as a string in ISO 8601 format
      sessionId: selectedTime ? selectedTime.id : null,
      serviceId: selectedService.id,
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
      try {
        await addBooking(JSON.parse(localStorage.userBooking));
        setIsLoading(false);

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Your booking has been recorded!",
          text: "You will be redirected to myBooking page.",
          timer: 3000, // 3 seconds
        }).then(() => {
          navigate("/myBooking");
        });
      } catch (error) {
        setIsLoading(false);
        console.error("Failed to submit booking:", error);
      }
    } else {
      // Show failed alert
      Swal.fire({
        icon: "error",
        title: "Failed to add a new booking!",
        text: "Please make sure you have selected the hours and service!",
        timer: 3000, // 3 seconds
      });
    }
  };

  function formatDate(dateString) {
    return format(new Date(dateString), "eeee, dd MMMM yyyy", {
      timeZone: "Asia/Makassar",
    });
  }

  return (
    <div className="booking-page w-100 min-vh-100 d-flex">
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
            <h1 className="text-center fw-bold">Booking</h1>
            <p className="text-center">
              Silahkan pilih sesi sesuai jadwal yang sudah disediakan oleh
              Forever Barbershop.
            </p>
          </Col>
        </Row>
        <Row>
          <div className="d-flex justify-content-center">
            <Calendar
              onChange={(date) => {
                setSelectedDate(date);
                getBookingsTime(date);
                setShowTime(true);
                setSelectedTime(null); // Reset selectedTime when a new date is clicked
              }}
              value={selectedDate}
              tileDisabled={({ date }) => isPastDate(date)} // Disable past dates
            />
          </div>
        </Row>
        <Row className="justify-content-center option-body">
          <Card className="option-content">
            <h6 className="d-flex justify-content-center mt-4 pb-3">
              <span>Tanggal yang dipilih: </span> &nbsp;
              {formatDate(selectedDate.toDateString())}
            </h6>
            {showTime && (
              <div>
                {/* Show booking time */}
                <div className="mt-4 mx-3">
                  <h6>Pilih Jam :</h6>
                  {session.map((data) => (
                    <button
                      key={data.id}
                      className={`btn btn-light me-2 ${
                        selectedTime && selectedTime.id === data.id
                          ? "btn-selected"
                          : ""
                      }`}
                      onClick={() => handleTimeClick(data)}
                      disabled={
                        isPastTime(selectedDate, data.time) ||
                        isSessionFull(data.id)
                      } // Disable buttons for past session times
                    >
                      {data.time}:00
                    </button>
                  ))}
                </div>

                {/* Show service */}
                <div className="mt-5 mx-3">
                  <h6>Pilih service :</h6>
                  {service.map((serviceItem) => (
                    <button
                      key={serviceItem.id}
                      className={`btn btn-light me-2 ${
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

                {/* Show submit button */}
                <div className="form-check syaratKeten mx-3">
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
                <div className="mb-4 mx-3 d-grid">
                  <button
                    type="button"
                    className="btn btn-success btn-success-booking"
                    disabled={!syaratKeten || isLoading}
                    onClick={handleSubmitBooking}
                  >
                    {isLoading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </div>
            )}
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default BookingComponent;
