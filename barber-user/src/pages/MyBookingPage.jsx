import "../assets/css/myBookingPage.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
import { format } from "date-fns";


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
        setData([])
        console.error("Error fetching data:", error);
      }
    };
    getbookings();
  }, [userData]);

  function formatDate(dateString) {
    return format(new Date(dateString), "dd MMMM yyyy");
  }

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
            You don&apos;t have any ongoing bookings
          </h5>
        ) : (
          <Row className="row-col-lg-3 row-col-md-3 row-col-sm-1">
            {data.map((booking) => {
              if (userData.id === booking.userId) {
                return (
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
                          <div className="d-contents mt-3">
                            <button className="btn btn-danger">
                              Cancel Booking
                            </button>
                          </div>
                        </table>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              } else {
                return null;
              }
            })}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default MyBookingPage;
