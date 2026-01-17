import { Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-2">

          {/* LEFT: Logo + Title */}
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

          {/* CENTER: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection("about")}>About</button>
            <button onClick={() => scrollToSection("services")}>Services</button>
            <button onClick={() => scrollToSection("why-us")}>Why Us</button>
            <button onClick={() => scrollToSection("reviews")}>Reviews</button>
          </nav>

          {/* RIGHT: Call + Book Appointment */}
          <div className="flex items-center gap-2">
            <a href="tel:+918525860099">
              <Button size="sm" variant="outline" className="gap-1">
                <Phone className="w-4 h-4" />
                Call
              </Button>
            </a>

            <Button
              size="sm"
              className="gap-1"
              onClick={() => scrollToSection("appointment")}
            >
              <Calendar className="w-4 h-4" />
              Book
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
