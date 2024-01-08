import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ServicesComponent = () => {
  let navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
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
        setData(await response.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getService();
  }, []);

  const handleClick = () => {
    const accessToken = localStorage.getItem("userData");

    if (accessToken) {
      // If user has accessToken, navigate to bookingPage
      navigate("/booking");
    } else {
      // If user doesn't have accessToken, navigate to loginPage
      navigate("/signin");
    }
  };

  return (
    <div className="services w-100 min-vh-100">
      <Container>
        <Row>
          <Col data-aos="zoom-in">
            <h1 className="text-center fw-bold">Pilihan Paket Layanan</h1>
            <p className="text-center">
              Silahkan pilih paket layanan yang disediakan oleh Forever
              Barbershop sesuai kebutuhan anda.
            </p>
          </Col>
        </Row>
        {data.length === 0 ? (
          "Loading..."
        ) : (
          <Row className="row-col-lg-3 row-col-md-3 row-col-sm-1">
            {data.map((service) => {
              return (
                <Col key={service.id}>
                  <Card data-aos="fade-up" className="shadow">
                    <Card.Img
                      className="w-100"
                      variant="top"
                      src={service.image}
                    />
                    <Card.Body>
                      <div>
                        <Col className="d-flex justify-content-between fw-bold">
                          <Card.Title className="fw-bold">
                            {service.name}
                          </Card.Title>
                          <Card.Text>
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(service.price)}
                          </Card.Text>
                        </Col>
                      </div>
                      <Card.Text>
                        {service.description} <br /> ({service.detail})
                      </Card.Text>
                      <button
                        className="btn btn-dark btn-lg rounded-2 mb-mx-0 mb-2 btn-service-book"
                        type="button"
                        onClick={handleClick}
                      >
                        Book Now
                      </button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default ServicesComponent;