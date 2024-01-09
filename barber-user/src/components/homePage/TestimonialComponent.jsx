import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

//import data swiper
import { dataSwiper } from "../../data/index.js";

const TestimonialComponent = () => {
  let navigate = useNavigate();
  return (
    <div className="testimonial">
      <Container>
        <Row>
          <Col data-aos="zoom-in">
            <h1 className="text-center fw-bold">Testimonial</h1>
            <p className="text-center">
              Kesan dan pesan dari konsumen setelah menggunakan jasa layanan
              Forever Barbershop.
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
                  <div className="position-fixed">
                    <div className="d-flex align-items-center people">
                      <h6 className="mb-1">{testimonial.name}</h6>
                    </div>
                    <div className="d-flex align-items-center pt-2 detail">
                      <i className="fa-solid fa-star rating"></i>
                      <i className="fa-solid fa-star rating"></i>
                      <i className="fa-solid fa-star rating"></i>
                      <i className="fa-solid fa-star rating"></i>
                      <i className="fa-solid fa-star rating"></i>
                      <i className="fa-solid fa-circle titik"></i>
                      <p>{testimonial.time}</p>
                    </div>
                  </div>

                  <p className="desc">{testimonial.desc}</p>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Row>
        <Row>
          <Col className="text-center">
            <button
              className="btn btn-dark btn-lg rounded-3"
              onClick={() => {
                navigate("/testimonial");
              }}
            >
              Lihat Semua Testimonial{" "}
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TestimonialComponent;
