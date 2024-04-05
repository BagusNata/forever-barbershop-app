import "../assets/css/signInPage.css";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { useUserContext } from "../../UserContext";
import Swal from "sweetalert2";

const SignInPage = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUserData } = useUserContext();

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: values.userName,
              password: values.password,
            }),
          }
        );
        const data = await response.json();
        if (data && data.accessToken) {
          setUserData(data);
          localStorage.setItem("userData", JSON.stringify(data));

          // Show success alert
          if (data.roles.includes("ROLE_ADMIN")) {
            Swal.fire({
              icon: "success",
              title: "Sign in successful!",
              text: "You will be redirected to the admin dashboard.",
              timer: 3000, // 3 seconds
            }).then(() => {
              // Redirect to the admin dashboard
              navigate("/admin/bookings");
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Sign in successful!",
              text: "You will be redirected to the home page.",
              timer: 3000, // 3 seconds
            }).then(() => {
              // Redirect to the home page
              navigate("/");
            });
          }
        } else {
          // Show failed alert
          Swal.fire({
            icon: "error",
            title: "Sign in failed!",
            text: "Please use a registered account or check your username and password!",
            timer: 3000, // 3 seconds
          });
        }
      } catch (error) {
        // Handle sign-in error
        console.error("Error signing in:", error);
        Swal.fire({
          icon: "error",
          title: "Error signing in",
          text: "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="signup w-100 min-vh-100">
      <Container>
        <div className="position-absolute top-50 start-50 translate-middle form-box">
          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex justify-content-center logo-box">
              <div className="logo rounded-circle d-flex justify-content-center">
                <img
                  src="./brand-transparent.webp"
                  width={"75px"}
                  height={"40px"}
                  alt="Forever Barbershop"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                className="form-control"
                autoFocus
                type="text"
                id="userName"
                name="userName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>

            <div className="mb-4">
              <p>
                don&apos;t have account? <a href="/signup"> Sign up</a>
              </p>
            </div>

            <div className="mt-4 d-grid">
              <button
                type="submit"
                className="btn btn-success"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default SignInPage;
