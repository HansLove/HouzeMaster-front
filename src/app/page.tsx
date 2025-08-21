import Listings from "./components/listings";
import Hero from "./components/hero";
import LeadCapture from "./components/lead-capture";

export default function Home() {
  return (
    <>
      <Hero />
      <Listings />
      
      {/* Lead Capture Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-serif font-bold text-neutral-900 mb-6">
              ¿Listo para encontrar tu <span className="text-gradient-primary">hogar ideal</span>?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Nuestros expertos están aquí para ayudarte a encontrar la propiedad perfecta. 
              Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <LeadCapture />
          </div>
        </div>
      </section>
    </>
  );
}
