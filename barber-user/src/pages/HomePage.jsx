import "../assets/css/homePage.css";

//Import Components
import NavbarComponent from "../components/homePage/NavbarComponent";
import HeroComponent from "../components/homePage/HeroComponent";
import AboutComponent from "../components/homePage/AboutComponent";
import ServicesComponent from "../components/homePage/ServicesComponent";
import TestimonialComponent from "../components/homePage/TestimonialComponent";
import FaqComponent from "../components/homePage/FaqComponent";
import FooterComponent from "../components/homePage/FooterComponent";


const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <NavbarComponent />

      {/* Section Hero */}
      <section id="hero">
        <HeroComponent />
      </section>

      {/* Section About */}
      <section id="about">
        <AboutComponent />
      </section>

      {/* Section Services */}
      <section id="services">
        <ServicesComponent />
      </section>

      {/* Section Testimonial */}
      <section id="testimonial">
        <TestimonialComponent />
      </section>

      {/* Section FAQ */}
      <section id="faq">
        <FaqComponent />
      </section>

      {/* Footer */}
      <FooterComponent />
    </div>
  );
};

export default HomePage;
