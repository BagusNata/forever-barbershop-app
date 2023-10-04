import { Container, Row, Col, Card } from "react-bootstrap";
import "../dist/css/homepage.css";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

import { semuaService, dataSwiper } from "../data/index.js";
import FaqComponent from "../components/FaqComponent";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Section Hero */}
      <section id="hero">
        <header className="cover w-100 min-vh-100 d-flex align-items-center">
          <Container>
            <Row className="header-box">
              <Col lg="7">
                <h1 className="mb-4 animate__animated animate__fadeInUp">
                  Wujudkan <br /> <span>Rambut Impianmu</span> <br />
                  Bersama Kami!
                </h1>
                <p className="mb-4 animate__animated animate__fadeInUp animate__delay-0.5s">
                  -Forever barbershop, professional barber-
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
      </section>

      {/* Section Services */}
      <section id="services">
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
                      <Card.Img
                        className="w-100"
                        variant="top"
                        src={service.img}
                      />
                      <Card.Body>
                        <div>
                          <Col className="d-flex justify-content-between fw-bold">
                            <Card.Title className="fw-bold">
                              {service.title}
                            </Card.Title>
                            <Card.Text>{service.price}</Card.Text>
                          </Col>
                        </div>
                        <Card.Text>{service.description} <br/> {service.detail}</Card.Text>
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
      </section>

      {/* Section Testimonial */}
      <section id="testimonial">
        <div className="testimonial">
          <Container>
            <Row>
              <Col data-aos="zoom-in">
                <h1 className="text-center fw-bold">Testimonial</h1>
                <p className="text-center">
                  Kesan dan pesan dari konsumen setelah menggunakan jasa layanan Forever Barbershop.
                </p>
              </Col>
            </Row>
            <Row>
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  992: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                  },
                  1200: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {dataSwiper.map((testimonial) => {
                  return (
                    <SwiperSlide
                      key={testimonial.id}
                      className="shadow-sm rounded-3"
                    >
                      <p className="desc">{testimonial.desc}</p>
                      <div className="people">
                        <img src={testimonial.image} alt={testimonial.name} />
                        <div>
                          <h5 className="mb-1">{testimonial.name}</h5>
                          <p className="m-0 fw-bold">{testimonial.time}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Row>
          </Container>
        </div>
      </section>

      {/* Section FAQ */}
      <section id="faq">
        <FaqComponent />
      </section>
    </div>
  );
};

export default HomePage;
