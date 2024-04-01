import { Container, Row } from "react-bootstrap";
import "../assets/DashboardContent.css";

const DashboardContent = () => {
  return (
    <div className="w-100 min-vh-100 content-body">
      <Container>
        <Row className="py-5">
          <h1>Testing header</h1>
        </Row>
        <Row>
          <h1>body</h1>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardContent;
