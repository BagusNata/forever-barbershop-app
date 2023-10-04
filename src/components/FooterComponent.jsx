import { Container, Row, Col } from "react-bootstrap";
import { jadwal } from "../data";

const FooterComponent = () => {
  return (
    <div className="footer py-5">
      <Container>
        <Row className="d-flex justify-content-between">
          <Col lg="5" className="col">
            <h3 className="fw-bold mb-2">Forever Barbershop</h3>
            <div>
              <a
                href="https://www.google.com/maps/place/Forever+Barbershop/@-8.6486785,115.2273298,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd23fe4e56c336f:0x1fab75240672e37!8m2!3d-8.6486785!4d115.2322007!16s%2Fg%2F11s5dmbz23?entry=ttu"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-solid fa-location-dot"></i>
                <p>
                  Jl. WR Supratman No.81, Sumerta, Kec. Denpasar Tim., Kota
                  Denpasar, Bali 80236.
                </p>
              </a>
            </div>
            <div className="phone">
              <a href="https://www.google.com" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-whatsapp"></i>
                <p>0821-4707-6324 (text-only)</p>
              </a>
            </div>
            <div className="email">
              <a href="https://www.google.com" target="_blank" rel="noreferrer">
                <i className="fa-solid fa-envelope"></i>
                <p>person-email@gmail.com</p>
              </a>
            </div>

            <div className="social">
              <h5 className="fw-bold mb-2">Our Socials</h5>
              <div className="socials d-flex">
                <a
                  href="https://www.instagram.com/foreverbarberbali/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa-brands fa-instagram px-2"></i>
                </a>
                <a
                  href="https://www.tiktok.com/@foreverbarberbali"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa-brands fa-tiktok px-2"></i>
                </a>
              </div>
            </div>
          </Col>
          <Col className="d-flex flex-column col-lg-2 col">
            <h5 className="fw-bold mb-2">Menu</h5>
            <a href="#hero">Home</a>
            <a href="#services">Booking</a>
            <a href="#testimonial">Testimonial</a>
            <a href="#faq">FAQ</a>
            <a href="syaratketen">Syarat & Ketentuan</a>
          </Col>
          <Col lg="4" className="col">
            <h5 className="fw-bold mb-2">Jadwal Operasional</h5>
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
          <Col className="text-center py-4">
            <div className="copyright px-md-0 px-3">
              <p>
                &copy; Copyright {new Date().getFullYear()} by{" "}
                <strong>Bagus Nata</strong>, All Right Reserved
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterComponent;
