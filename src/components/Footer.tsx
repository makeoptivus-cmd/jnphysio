import { Phone, MapPin, Clock, Instagram } from "lucide-react";

const Footer = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Clinic Info & Social */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3 min-w-0">
                {/* Logo */}
                <div className="w-11 h-11 md:w-14 md:h-14 rounded-full gradient-hero flex items-center justify-center shadow-md flex-shrink-0 overflow-hidden">
                  <img
                    src="/logo2.png"
                    alt="JN Physiotherapy Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-display font-semibold text-sm">JN Physiotherapy</h3>
                <p className="text-xs text-primary-foreground/70">& Rehabilitation Clinic</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-xs leading-relaxed max-w-xs">
              Dedicated to restoring your mobility and improving your quality of life through expert physiotherapy care.
            </p>

            {/* Instagram Link */}
            <a
              href="https://www.instagram.com/jn_physioclinic?igsh=c3hyMnU4eGpwdXc3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm">Follow us on Instagram</span>
            </a>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Quick Links</h4>
            <nav className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollToSection("about")}
                className="text-primary-foreground/80 hover:text-primary-foreground text-xs transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-primary-foreground/80 hover:text-primary-foreground text-xs transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("why-us")}
                className="text-primary-foreground/80 hover:text-primary-foreground text-xs transition-colors"
              >
                Why Choose Us
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="text-primary-foreground/80 hover:text-primary-foreground text-xs transition-colors"
              >
                Reviews
              </button>
            </nav>
          </div>
        </div>

        {/* Contact Info - Address & Timing */}
        <div className="mt-8 pt-6 border-t border-primary-foreground/20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Phone */}
            <a
              href="tel:+918525860099"
              className="flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground transition-colors"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">+91 8525860099</span>
            </a>

           {/* Clinic Timing */}
<div className="flex items-center gap-2 text-primary-foreground/90">
  <Clock className="w-4 h-4 flex-shrink-0" />
  <span className="text-sm">
    Mon – Sat: 10:00 AM – 1:00 PM | 5:30 PM – 9:30 PM <br />
    Sun: 10:00 AM – 1:00 PM
  </span>
</div>


            {/* Address */}
            <div className="flex items-start gap-2 text-primary-foreground/90">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="text-sm">No 4, 156/3, East Park Street ,Venkatapuram, Ambattur, Chennai, India, 600053</span>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-6 pt-4 text-center">
          <p className="text-primary-foreground/60 text-xs">
            © {new Date().getFullYear()} JN Physiotherapy and Rehabilitation Clinic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;