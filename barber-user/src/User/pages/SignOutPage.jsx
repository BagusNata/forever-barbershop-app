import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignOutPage = () => {
  let navigate = useNavigate();

  useEffect(() => {
    try {
      // Clear user session
      localStorage.removeItem("userData");
    } catch (error) {
      console.error("Error occurred while clearing user session:", error);
    } finally {
      // Redirect to the sign in page
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default SignOutPage;
