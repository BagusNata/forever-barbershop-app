import { Container, Row, Col } from "react-bootstrap";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

// import image
import { aboutSlider } from "../data/index.js";

const AboutComponent = () => {
  return (
    <div className="about w-100 min-vh-100">
      <Container>
        <Row>
          <Col data-aos="zoom-in" className="col-md-6">
            <h1 className="fw-bold mb-4">About Us</h1>
            <p>
              Forever Barbershop didirikan oleh I Made Rizky Jaya Adi Putra
              sejak tahun 2022, yang resmi beroperasi dari tanggal 29 Juli 2022
              hingga saat ini.
            </p>
            <p>
              Beralamat di{" "}
              <a
                href="https://www.google.com/maps/place/Forever+Barbershop/@-8.6486785,115.2273298,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd23fe4e56c336f:0x1fab75240672e37!8m2!3d-8.6486785!4d115.2322007!16s%2Fg%2F11s5dmbz23?entry=ttu"
                target="_blank"
                rel="noreferrer"
              >
                  Jl. WR Supratman No.81, Sumerta, Kec. Denpasar Tim., Kota
                  Denpasar, Bali 80236.
              </a>
            </p>
            <p>
              Adapun jadwal operasional dari Forever Barbershop yaitu buka
              setiap hari mulai pukul 10:00 WITA sampai 21:00 WITA.
            </p>
          </Col>
          <Col className="col-md-6">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              effect={"fade"}
              navigation={true}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, EffectFade, Navigation, Pagination]}
              className="mySwiper"
            >
              {aboutSlider.map((item) => {
                return (
                  <SwiperSlide key={item.id}>
                    <img
                      src={item.img}
                      width={"100%"}
                      height={"350px"}
                      alt={item.title}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutComponent;
