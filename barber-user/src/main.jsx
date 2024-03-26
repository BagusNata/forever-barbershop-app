import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ScrollToTop from "../src/User/components/homePage/ScrollToTop.jsx";
import { UserContextProvider } from './UserContext.jsx'
import { BrowserRouter } from "react-router-dom";

//Import styling
import "../../barber-user/src/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
