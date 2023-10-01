import { Routes, Route } from "react-router-dom";

//Import Components
import NavbarComponent from "./components/NavbarComponent";
// import FooterComponent from "./components/FooterComponent";

//Import Pages
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import TestimonialPage from "./pages/TestimonialPage";
import FaqPage from "./pages/FaqPage";
import SyaratKetentuanPage from "./pages/SyaratKetentuanPage";

function App() {
  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/booking" Component={BookingPage} />
        <Route path="/tertimonial" Component={TestimonialPage} />
        <Route path="/faq" Component={FaqPage} />
        <Route path="/syaratdanketentuan" Component={SyaratKetentuanPage} />
      </Routes>
      {/* <FooterComponent /> */}
    </div>
  );
}

export default App;
