import "../assets/css/notFoundPage.css";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  // function to direct users to the home page
  const handleClickAdd = () => {
    navigate("/");
  };

  return (
    <div className="not-found-page w-100 min-vh-100">
      <div className="not-found-content position-absolute top-50 start-50 translate-middle">
        <h1>404 |</h1> <h3>This page could not be found.</h3>
      </div>
      <button
        className="btn btn-light btn-lg rounded-2 position-absolute top-50 start-50 translate-middle"
        onClick={handleClickAdd}
      >
        Back to Homepage
      </button>
    </div>
  );
};

export default NotFoundPage;
