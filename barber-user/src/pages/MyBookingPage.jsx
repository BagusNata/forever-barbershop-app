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
    const getTestimonies = async () => {
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
        setData(await response.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getTestimonies();
  }, []);

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
          "Loading..."
        ) : (
          <Row className="row-col-lg-3 row-col-md-3 row-col-sm-1">
            {data.map((booking) => {
              if (userData.id === booking.userId) {
                return (
                  <Col key={booking.id}>
                    <Card data-aos="fade-up" className="shadow">
                      <Card.Body>
                        <div>
                          <Col className="d-grid justify-content-between fw-bold">
                            <Card.Title className="fw-bold">
                              No. Booking : {booking.id}
                            </Card.Title>
                            <Card.Text>
                              Nama : {userData.username} <br />
                              Tanggal : {formatDate(booking.date)} <br />
                              Jam : {booking.time}
                            </Card.Text>
                          </Col>
                        </div>
                        <Card.Text>
                          Service : ({booking.serviceId})
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              } else {
                <div>u dont have booking</div>;
              }
            })}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default MyBookingPage;
