import { Container, Row, Col, Accordion } from "react-bootstrap";
import { faq } from "../../data/index.js";

const FaqComponent = () => {
  return (
    <div className="faq">
      <Container>
        <Row>
          <Col data-aos="zoom-in">
            <h1 className="text-center fw-bold">
              FAQ
            </h1>
            <p className="text-center">
              Pertanyaan yang sering ditanyakan oleh calon konsumen.
            </p>
          </Col>
        </Row>
        <Row className="d-flex row-cols-lg-2 row-cols-1">
          {faq.map((data) => {
            return (
              <Col key={data.id}>
                <Accordion className="shadow-sm mb-3">
                  <Accordion.Item eventKey={data.eventKey}>
                    <Accordion.Header>{data.title}</Accordion.Header>
                    <Accordion.Body>{data.desc}</Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default FaqComponent;
