import "../dist/css/testimonialPage.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { testimonial } from "../data";

const TestimonialPage = () => {
  let navigate = useNavigate();

  return (
    <div className="testimonial-page">
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
          {testimonial.map((data) => {
            return (
              <Col key={data.id}>
                <Card data-aos="fade-down" className="shadow">
                  <Card.Body>
                    <div>
                      <Col>
                        <Card.Title className="d-flex align-items-center">
                          <img src={data.image} alt={data.name} />
                          <p className="m-0 mx-2">{data.name}</p>
                        </Card.Title>
                        <Card.Text className="d-flex align-items-center pb-3">
                          <i className="fa-solid fa-star rating"></i>
                          <i className="fa-solid fa-star rating"></i>
                          <i className="fa-solid fa-star rating"></i>
                          <i className="fa-solid fa-star rating"></i>
                          <i className="fa-solid fa-star rating"></i>
                          <i className="fa-solid fa-circle titik"></i>
                          {data.time}
                        </Card.Text>
                      </Col>
                    </div>
                    <Card.Text>{data.desc}</Card.Text>
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
