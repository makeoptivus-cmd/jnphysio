import { Menu, X, Calendar, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Floating Call Button */}
<div className="fixed top-3 right-3 md:top-20 md:right-6 z-[60]">
  <a href="tel:+918525860099" className="block">
    <Button
      size="sm"
      className="shadow-elevated gap-1.5 text-xs md:text-sm w-full"
    >
      <span className="hidden sm:inline">Book Appointment</span>
      <span className="sm:hidden">Book Appointment</span>
    </Button>
  </a>
</div>


      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2 md:gap-0">
          <div className="flex items-center gap-3 min-w-0">
            {/* Logo */}
<div className="flex items-center gap-3 min-w-0">
  {/* Logo */}
  <div className="w-11 h-11 md:w-14 md:h-14 rounded-full gradient-hero flex items-center justify-center shadow-md flex-shrink-0 overflow-hidden">
    <img
      src="/logo.png"
      alt="JN Physiotherapy Logo"
      className="w-full h-full object-cover rounded-full"
    />
  </div>
</div>

            <div className="truncate">
              <h1 className="font-display font-bold text-sm md:text-lg text-primary leading-tight truncate">
                JN Physiotherapy
              </h1>
              <p className="text-[10px] md:text-xs text-muted-foreground truncate">& Rehabilitation Clinic</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("why-us")}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Why Us
            </button>
            <button
              onClick={() => scrollToSection("reviews")}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Reviews
            </button>
          </nav>


          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border py-3 px-4 animate-fade-in">
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("why-us")}
                className="text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              >
                Why Us
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              >
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
