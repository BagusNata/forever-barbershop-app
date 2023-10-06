import { Container, Row, Col, Card } from "react-bootstrap";
import { semuaService } from "../data/index.js";

const ServicesComponent = () => {
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
        <Row className="row-col-lg-3 row-col-md-3 row-col-sm-1">
          {semuaService.map((service) => {
            return (
              <Col key={service.id}>
                <Card data-aos="fade-up" className="shadow">
                  <Card.Img className="w-100" variant="top" src={service.img} />
                  <Card.Body>
                    <div>
                      <Col className="d-flex justify-content-between fw-bold">
                        <Card.Title className="fw-bold">
                          {service.title}
                        </Card.Title>
                        <Card.Text>{service.price}</Card.Text>
                      </Col>
                    </div>
                    <Card.Text>
                      {service.description} <br /> {service.detail}
                    </Card.Text>
                    <button className="btn btn-dark btn-lg rounded-2 mb-mx-0 mb-2 btn-service-book">
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
  );
};

export default ServicesComponent;
