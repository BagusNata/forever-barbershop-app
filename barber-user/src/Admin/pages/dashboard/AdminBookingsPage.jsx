import { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import BookingsContent from "../../components/BookingsContent";
import { useUserContext } from "../../../UserContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminBookingsPage = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserContext();

  useEffect(() => {
    // Check if user role = admin
    if (userData && userData.roles && userData.roles.includes("ROLE_ADMIN")) {
      // Render admin page
      return;
    } else {
      // Check if user data exists in local storage
      const storedUserData = JSON.parse(localStorage.getItem("userData"));
      if (
        storedUserData &&
        storedUserData.roles &&
        storedUserData.roles.includes("ROLE_ADMIN")
      ) {
        // Update context with stored user data
        setUserData(storedUserData);
      } else {
        // Show restricted message
        Swal.fire({
          icon: "error",
          title: "Restricted to access admin page",
          text: `Your account doesn't have admin role`,
        }).then(() => {
          // Redirect to the home page
          navigate("/");
        });
      }
    }
  }, [userData, navigate, setUserData]);

  // Render admin page only if user has admin role
  return userData && userData.roles && userData.roles.includes("ROLE_ADMIN") ? (
    <div className="d-flex">
      <Sidebar />
      <BookingsContent />
    </div>
  ) : null;
};

export default AdminBookingsPage;
