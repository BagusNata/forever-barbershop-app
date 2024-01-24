import "../assets/css/myBookingPage.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
import { format } from "date-fns";
import Swal from "sweetalert2";


const MyBookingPage = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const { userData } = useUserContext();

  useEffect(() => {
    const getbookings = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/bookings/me`,
          {
            method: "GET",
            headers: {
              "x-access-token": userData.accessToken,
              "Content-Type": "application/json",
            },
          }
        );
        const bookings = await response.json();
        if (bookings && bookings.length) {
          setData(bookings);
        }
      } catch (error) {
        setData([]);
        console.error("Error fetching data:", error);
      }
    };
    getbookings();
  }, [userData]);

  function formatDate(dateString) {
    return format(new Date(dateString), "dd MMMM yyyy");
  }

  const handleCancelBooking = async (bookingId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          "x-access-token": userData.accessToken,
          "Content-Type": "application/json",
        },
      });

      // After successful deletion, update the data state to re-render without the deleted booking
      setData((prevData) =>
        prevData.filter((booking) => booking.id !== bookingId)
      );

      // Show a success notification
      Swal.fire({
        icon: "success",
        title: "Booking canceled successfully!",
        text: "Bookings that you delete will be removed from the list.",
        timer: 3000, // 3 seconds
      });
    } catch (error) {
      console.error("Error deleting booking:", error);
      // Show an error notification
      Swal.fire({
        icon: "error",
        title: "Error canceling booking",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="my-booking w-100 min-vh-100">
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
            <h1 className="text-center fw-bold">My Booking List</h1>
            <p className="text-center">
              Berikut adalah list booking anda yang sedang berlangsung.
            </p>
          </Col>
        </Row>
        {data.length === 0 ? (
          <h5 className="no-booking">
            Anda tidak memiliki daftar booking yang sedang berlangsung
          </h5>
        ) : (
          <Row className="row-col-lg-3 row-col-md-3 row-col-sm-1">
            {data
              .filter((booking) => userData.id === booking.userId)
              .sort((a, b) => {
                const dateComparison =
                  new Date(formatDate(a.date)) - new Date(formatDate(b.date));

                if (dateComparison === 0) {
                  // If the dates are the same, compare the times
                  return new Date(a.time) - new Date(b.time);
                }

                return dateComparison;
              })
              .map((booking) => (
                <Col key={booking.id}>
                  <Card data-aos="fade-up" className="shadow">
                    <Card.Body>
                      <table className="tables">
                        <thead className="title">Bukti Booking</thead>
                        <tbody className="information">
                          <tr>
                            <th scope="row">Nama</th>
                            <td>:</td>
                            <td>{booking.user.username}</td>
                          </tr>
                          <tr>
                            <th scope="row">Tanggal</th>
                            <td>:</td>
                            <td>{formatDate(booking.date)}</td>
                          </tr>
                          <tr>
                            <th scope="row">Jam</th>
                            <td>:</td>
                            <td>{booking.time}:00</td>
                          </tr>
                          <tr>
                            <th scope="row">Service</th>
                            <td>:</td>
                            <td>{booking.service.name}</td>
                          </tr>
                          <tr>
                            <th scope="row">Harga</th>
                            <td>:</td>
                            <td>
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(booking.service.price)}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Detail</th>
                            <td>:</td>
                            <td>{booking.service.detail}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="d-contents mt-3">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Cancel Booking
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default MyBookingPage;
