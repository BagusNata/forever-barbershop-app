import { Container, Row, Col } from "react-bootstrap";
import "../dist/css/homepage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="cover w-100 min-vh-100 d-flex align-items-center">
        <Container>
          <Row className="header-box">
            <Col lg="7">
              <h1 className="mb-4">
                Wujudkan <br /> <span>Rambut Impianmu</span> <br />
                Bersama Kami!
              </h1>
              <p className="mb-4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Dolore, possimus tenetur. Maiores minus porro dignissimos modi
                repudiandae facere enim optio.
              </p>
              <button className="btn btn-light btn-lg rounded-2 me-2 mb-mx-0 mb-2">
                Book Now!
              </button>
              <button className="btn btn-outline-light btn-lg rounded-2 me-2 mb-mx-0 mb-2">
                Lihat Testimonial
              </button>
            </Col>
          </Row>
        </Container>
      </header>
      <div className="services w-100 min-vh-100 container">
        <h1 className="text-center my-5">Services</h1>
      </div>
    </div>
  );
};

export default HomePage;
