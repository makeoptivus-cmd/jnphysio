import { Award, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-muted opacity-60" />
      <div className="absolute top-20 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs font-medium text-primary">Expert Care You Can Trust</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight">
              Your Journey to
              <span className="text-gradient block">Pain-Free Living</span>
              Starts Here
            </h1>

            <p className="text-sm md:text-base text-muted-foreground max-w-lg">
              Experience personalized physiotherapy care with Dr. Kumani J., 
              dedicated to helping you recover, rehabilitate, and reclaim your active lifestyle.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                size="default"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="shadow-elevated hover:shadow-card transition-shadow"
              >
                Our Services
              </Button>
              <a href="tel:+918525860099">
  <Button
    size="default"
    variant="outline"
  >
    Contact Us
  </Button>
</a>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-primary">
                  <Clock className="w-4 h-4" />
                  <span className="text-xl font-bold">4+</span>
                </div>
                <p className="text-xs text-muted-foreground">Years Exp</p>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-primary">
                  <Users className="w-4 h-4" />
                  <span className="text-xl font-bold">4000+</span>
                </div>
                <p className="text-xs text-muted-foreground">Patients</p>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-primary">
                  <Award className="w-4 h-4" />
                  <span className="text-xl font-bold">100%</span>
                </div>
                <p className="text-xs text-muted-foreground">Dedication</p>
              </div>
            </div>
          </div>

          {/* Doctor Card */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="bg-card rounded-2xl shadow-elevated p-6 relative z-10">
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-accent/20 rounded-full blur-2xl" />
              
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full gradient-hero p-1">
                  <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-display font-bold text-primary">KJ</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
                    Dr. Kumani J
                  </h2>
                  <p className="text-primary font-semibold text-sm">Chief Physiotherapist</p>
                  <div className="flex flex-wrap justify-center gap-1.5 pt-1.5">
                    {["BPT", "MPT (Ortho)", "MIAP", "CMFRT"].map((credential) => (
                      <span
                        key={credential}
                        className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
                      >
                        {credential}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground text-xs md:text-sm max-w-xs">
                  Specialized in orthopedic rehabilitation with a patient-first approach 
                  to evidence-based treatment.
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/10 rounded-2xl -rotate-6" />
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent/20 rounded-xl rotate-12" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
