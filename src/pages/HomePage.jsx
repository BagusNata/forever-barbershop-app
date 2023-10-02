import { Container, Row, Col, Card } from "react-bootstrap";
import "../dist/css/homepage.css";

import { semuaService } from "../data/index.js";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Section Header */}
      <header className="cover w-100 min-vh-100 d-flex align-items-center">
        <Container>
          <Row className="header-box">
            <Col lg="7">
              <h1 className="mb-4 animate__animated animate__fadeInUp">
                Wujudkan <br /> <span>Rambut Impianmu</span> <br />
                Bersama Kami!
              </h1>
              <p className="mb-4 animate__animated animate__fadeInUp animate__delay-0.5s">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Dolore, possimus tenetur. Maiores minus porro dignissimos modi
                repudiandae facere enim optio.
              </p>
              <div className="animate__animated animate__fadeInUp animate__delay-0.7s">
                <button className="btn btn-light btn-lg rounded-2 me-2 mb-mx-0 mb-2">
                  Book Now
                </button>
                <button className="btn btn-outline-light btn-lg rounded-2 me-2 mb-mx-0 mb-2">
                  Lihat Testimonial
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Section Services */}
      <div className="services w-100 min-vh-100">
        <Container>
          <Row>
            <Col data-aos="zoom-in" data-aos-duration="500">
              <h1 className="text-center fw-bold">Pilihan Paket Layanan</h1>
              <p className="text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae, itaque?
              </p>
            </Col>
          </Row>
          <Row>
            {semuaService.map((service) => {
              return (
                <Col key={service.id}>
                  <Card data-aos="fade-up">
                    <Card.Img
                      className="w-100"
                      variant="top"
                      src={service.img}
                    />
                    <Card.Body>
                      <Card.Title className="fw-bold">
                        {service.title}
                      </Card.Title>
                      <Card.Text>{service.description}</Card.Text>
                      <button className="btn btn-dark btn-lg rounded-2 me-2 mb-mx-0 mb-2 btn-service-book">
                        Book Now
                      </button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
