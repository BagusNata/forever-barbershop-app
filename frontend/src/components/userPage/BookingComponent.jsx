import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Calendar from "react-calendar";

const BookingComponent = () => {
  const [date, setDate] = useState(new Date());
  // const [showTime, setShowTime] = useState(false);

  return (
    <div className="booking w-100 min-vh-100">
      <Container>
        <Row>
          <Col data-aos="zoom-in">
            <h1 className="text-center fw-bold mt-5">Booking</h1>
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
