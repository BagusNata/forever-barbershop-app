import { Routes, Route } from "react-router-dom";

//Import Components
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";

//Import Pages
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import TestimonialPage from "./pages/TestimonialPage";
import FaqPage from "./pages/FaqPage";
import SyaratKetenPage from "./pages/SyaratKetenPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/booking" Component={BookingPage} />
        <Route path="/testimonial" Component={TestimonialPage} />
        <Route path="/faq" Component={FaqPage} />
        <Route path="/syaratketen" Component={SyaratKetenPage} />
        <Route path="*" Component={NotFoundPage} />
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;
