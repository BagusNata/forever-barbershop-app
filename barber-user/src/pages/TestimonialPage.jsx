import "../assets/css/testimonialPage.css";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

//import user information
import { useUserContext } from "../UserContext";

const TestimonialPage = () => {
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const { userData } = useUserContext();

  useEffect(() => {
    const getService = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/testimonies`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setData(await response.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getService();
  }, []);

  function formatDate(dateString) {
    return format(new Date(dateString), "dd MMMM yyyy");
  }

  return (
    <div className="testimonial-page w-100 min-vh-100">
      <Container>
        <Row className="py-5">
          <img
            data-aos="zoom-in-up"
            src="./brand-transparent.webp"
            alt="Forever Barbershop"
            onClick={() => navigate("/")}
          />
        </Row>
        <Row className="header">
          <Col data-aos="zoom-in-up">
            <h1 className="text-center fw-bold">Semua Testimonial</h1>
            <p className="text-center">
              Kesan dan pesan dari konsumen setelah menggunakan jasa layanan
              Forever Barbershop.
            </p>
          </Col>
        </Row>
        <Row className="row-cols-1">
          {data.map((testimonial) => {
            return (
              <Col key={data.id}>
                <Card data-aos="fade-down" className="shadow">
                  <Card.Body>
                    <div>
                      <Col>
                        <Card.Title className="d-flex align-items-center">
                          <p className="m-0">{userData.username}</p>
                        </Card.Title>
                        <Card.Text className="d-flex align-items-center pb-3 detail">
                          {[...Array(testimonial.rating)].map((_, index) => (
                            <i
                              key={index}
                              className="fa-solid fa-star rating"
                            ></i>
                          ))}
                          <i className="fas fa-dot-circle dot"></i>
                          <p>{formatDate(testimonial.date)}</p>
                        </Card.Text>
                      </Col>
                    </div>
                    <Card.Text>{testimonial.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default TestimonialPage;
