import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";


const BookingComponent = () => {
  let navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  // const [showTime, setShowTime] = useState(false);

  return (
    <div className="w-100 min-vh-100">
      <Container>
        <Row className="py-5">
          <img
            data-aos="zoom-in-up"
            src="./brand-transparent.webp"
            alt="Forever Barbershop"
            onClick={() => navigate("/")}
          />
        </Row>
        <Row>
          <Col data-aos="zoom-in">
            <h1 className="text-center fw-bold mt-3">Booking</h1>
            <p className="text-center">
              Silahkan pilih sesi sesuai jadwal yang sudah disediakan oleh
              Forever Barbershop.
            </p>
          </Col>
        </Row>
        <Row>
          <div className="d-flex justify-content-center">
            <Calendar
              onChange={setDate}
              value={date}
              // onClickDay={() => setShowTime(true)}
            />
          </div>
          <p className="d-flex justify-content-center mt-4">
            <p>Tanggal yang di pilih : </p> &nbsp;
            {date.toDateString()}
          </p>
          {/* <Time showTime={showTime} date={date} /> */}
        </Row>
      </Container>
    </div>
  );
};

export default BookingComponent;
