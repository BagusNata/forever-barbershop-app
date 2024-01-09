import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { format } from "date-fns";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

//import user information
import { useUserContext } from "../../UserContext";

const TestimonialComponent = () => {
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
            {data.map((testimonial) => {
              return (
                <SwiperSlide
                  key={testimonial.id}
                  className="shadow-sm rounded-3"
                >
                  <div className="position-fixed">
                    <div className="d-flex align-items-center people">
                      <h6 className="mb-1">{userData.username}</h6>
                    </div>
                    <div className="d-flex align-items-center pt-2 detail">
                      {[...Array(testimonial.rating)].map((_, index) => (
                        <i key={index} className="fa-solid fa-star rating"></i>
                      ))}
                      <i className="fas fa-dot-circle dot"></i>
                      <p>{formatDate(testimonial.date)}</p>
                    </div>
                  </div>
                  <p className="desc">{testimonial.description}</p>
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
