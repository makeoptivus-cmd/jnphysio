import { Menu, X, Calendar, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-2">

          {/* LEFT: Logo + Title (UNCHANGED) */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 md:w-14 md:h-14 rounded-full overflow-hidden shadow-md">
              <img
                src="/logo2.png"
                alt="JN Physiotherapy Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="truncate">
              <h1 className="font-bold text-sm md:text-lg text-primary truncate">
                JN Physiotherapy
              </h1>
              <p className="text-[10px] md:text-xs text-muted-foreground truncate">
                & Rehabilitation Clinic
              </p>
            </div>
          </div>

          {/* CENTER: Desktop Nav (UNCHANGED) */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection("about")}>About</button>
            <button onClick={() => scrollToSection("services")}>Services</button>
            <button onClick={() => scrollToSection("why-us")}>Why Us</button>
            <button onClick={() => scrollToSection("reviews")}>Reviews</button>
          </nav>

          {/* RIGHT: Call + Book Appointment + Menu (NEW but SAME PLACE) */}
          <div className="flex items-center gap-2">

            {/* Call Button */}
            <a href="tel:+918525860099">
              <Button size="sm" variant="outline" className="gap-1">
                <Phone className="w-4 h-4" />
                Call
              </Button>
            </a>

            {/* Book Appointment Button */}
            <Button
              size="sm"
              className="gap-1"
              onClick={() => scrollToSection("appointment")}
            >
              <Calendar className="w-4 h-4" />
              Book
            </Button>

            {/* Mobile Menu Icon */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu (UNCHANGED) */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border py-3 px-4">
            <nav className="flex flex-col gap-2">
              <button onClick={() => scrollToSection("about")} className="py-2">
                About
              </button>
              <button onClick={() => scrollToSection("services")} className="py-2">
                Services
              </button>
              <button onClick={() => scrollToSection("why-us")} className="py-2">
                Why Us
              </button>
              <button onClick={() => scrollToSection("reviews")} className="py-2">
                Reviews
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
