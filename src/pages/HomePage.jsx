import "../dist/css/homepage.css";

//Import Components
import NavbarComponent from "../components/NavbarComponent";
import HeroComponent from "../components/HeroComponent";
import ServicesComponent from "../components/ServicesComponent";
import TestimonialComponent from "../components/TestimonialComponent";
import FaqComponent from "../components/FaqComponent";
import FooterComponent from "../components/FooterComponent";


const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <NavbarComponent />

      {/* Section Hero */}
      <section id="hero">
        <HeroComponent />
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
