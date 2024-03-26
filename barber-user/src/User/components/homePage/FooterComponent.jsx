import { Container, Row, Col } from "react-bootstrap";
import { jadwal } from "../../data/index";

const FooterComponent = () => {
  return (
    <div className="footer py-5">
      <Container>
        <Row className="d-flex justify-content-between">
          <Col lg="5">
            <h3 className="fw-bold mb-3">Forever Barbershop</h3>
            <div className="address">
              <a
                href="https://www.google.com/maps/place/Forever+Barbershop/@-8.6486785,115.2273298,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd23fe4e56c336f:0x1fab75240672e37!8m2!3d-8.6486785!4d115.2322007!16s%2Fg%2F11s5dmbz23?entry=ttu"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-solid fa-location-dot"></i>
                <p className="m-0 mb-2 mx-2">
                  Jl. WR Supratman No.81, Sumerta, Kec. Denpasar Tim., Kota
                  Denpasar, Bali 80236.
                </p>
              </a>
            </div>
            <div className="phone">
              <a
                href="https://wa.me/+6282147076324?text=Hallo,%20saya%20ingin%20reservasi%20di%20Forever%20Barbershop"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-whatsapp"></i>
                <p className="m-0 mb-2 mx-2">0821-4707-6324 (text-only)</p>
              </a>
            </div>
            <div className="instagram">
              <a
                href="https://www.instagram.com/foreverbarberbali/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-instagram"></i>
                <p className="m-0 mb-2 mx-2">Foreverbarberbali</p>
              </a>
            </div>
            <div className="tiktok">
              <a
                href="https://www.tiktok.com/@foreverbarberbali"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-tiktok"></i>
                <p className="m-0 mb-2 mx-2">Foreverbarberbali</p>
              </a>
            </div>
          </Col>
          <Col className="d-flex flex-column col-lg-2 col mt-lg-0 mt-5">
            <h5 className="fw-bold mb-3">Menu</h5>
            <a href="#hero">Home</a>
            <a href="#about">About Us</a>
            <a href="#services">Services</a>
            <a href="/booking">Booking</a>
            <a href="#testimonial">Testimonial</a>
            <a href="#faq">FAQ</a>
          </Col>
          <Col lg="4" className="mt-lg-0 mt-5">
            <h5 className="fw-bold mb-3">Jadwal Operasional</h5>
            <table>
              <thead className="d-none">
                <tr>
                  <th>Days</th>
                  <th>Open</th>
                  <th> - </th>
                  <th>Close</th>
                </tr>
              </thead>
              <tbody>
                {jadwal.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td className="hari">{data.hari}</td>
                      <td className="buka">{data.buka}</td>
                      <td className="dash">{data.dash}</td>
                      <td className="tutup">{data.tutup}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="d-flex justify-content-center px-md-0 px-3">
              &copy; Copyright {new Date().getFullYear()} by
              <a
                href="https://www.instagram.com/bagusnataa/"
                target="_blank"
                rel="noreferrer"
              >
                Bagus Nata
              </a>
              , All Right Reserved
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterComponent;
