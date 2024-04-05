import "../../assets/adminAdd.css";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../UserContext";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const validate = (values) => {
  const errors = {};
  if (!values.time) {
    errors.time = "Required!";
  } else if (values.time < 10 || values.time > 23) {
    errors.time = "Time must be between 10 and 23";
  }
  return errors;
};

const AdminEditSessionPage = () => {
  const navigate = useNavigate();
  const { userData } = useUserContext();
  const { sessionId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // Form logic
  const formik = useFormik({
    initialValues: {
      time: 0,
    },
    validate,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/sessions/${sessionId}`,
          {
            method: "PUT",
            headers: {
              "x-access-token": userData.accessToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              time: values.time,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.message && data.message.toLowerCase().includes("found")) {
          console.error("Error update session:", 404);
          Swal.fire({
            icon: "error",
            title: "Failed update session",
            text: "Session not found!",
          });
          return;
        }
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Session updated successfully!",
          text: "You will be redirected to the admin session page.",
          timer: 3000, // 3 seconds
        }).then(() => {
          // Redirect to the admin session page
          navigate("/admin/sessions");
        });
      } catch (error) {
        // Handle add session error
        console.error("Error update session:", error);
        Swal.fire({
          icon: "error",
          title: "Error update session",
          text: "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Fetch session data when the component mounts
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/sessions`,
          {
            method: "GET",
            headers: {
              "x-access-token": userData.accessToken,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch session data: ${response.statusText}`
          );
        }
        const data = await response.json();
        if (data && data.length) {
          const currentSession = data.find(
            (value) => value.id === Number(sessionId)
          );
          formik.setValues({ time: currentSession.time });
        }
      } catch (error) {
        console.error("Error fetching session data:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch session data. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessionData();
  }, [sessionId, userData.accessToken]);

  return userData && userData.roles && userData.roles.includes("ROLE_ADMIN") ? (
    <div className="admin-add w-100 min-vh-100">
      <Container>
        <div className="position-absolute top-50 start-50 translate-middle form-box">
          <form onSubmit={formik.handleSubmit}>
            <h3 className="text-center mb-5">Update Sesi Booking</h3>
            <div className="mb-3">
              <label className="form-label">Jam</label>
              <input
                className="form-control"
                type="number"
                placeholder="Contoh : (10 = 10:00, 11 = 11:00, 12 = 12:00)"
                id="time"
                name="time"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.time}
              />
              {formik.touched.time && formik.errors.time ? (
                <div className="error">{formik.errors.time}</div>
              ) : null}
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="btn btn-success"
                disabled={isLoading}
                onClick={formik.handleSubmit}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/sessions")}
                className="btn btn-outline-danger"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  ) : null;
};

export default AdminEditSessionPage;
