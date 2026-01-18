import { CheckCircle, Heart, Target, Shield } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We treat every patient with empathy and understanding",
    },
    {
      icon: Target,
      title: "Personalized Treatment",
      description: "Customized rehabilitation plans for your specific needs",
    },
    {
      icon: Shield,
      title: "Evidence-Based",
      description: "Using proven techniques backed by scientific research",
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                About Us
              </span>

              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Dedicated to Your Recovery & Well-being
              </h2>

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Every step you take should be free of pain — with us, it can be.
                <br /><br />
                Get proper and expert care at <strong>JN Physiotherapy & Rehabilitation Clinic</strong>,
                a trusted physiotherapy clinic in Chennai. We provide personalised
                treatments for pain relief and long-term pain management.
              </p>
            </div>

            {/* FEATURES LIST */}
            <div className="space-y-4">
              {[
                "State-of-the-art physiotherapy equipment",
                "Comprehensive assessment and diagnosis",
                "One-on-one personalized sessions",
                "Post-treatment exercise programs",
                "Flexible appointment scheduling",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm md:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARDS */}
          <div className="grid gap-5">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-5 shadow-soft hover:shadow-card transition-shadow duration-300 flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>

                <div>
                  <h3 className="font-semibold text-foreground text-base md:text-lg">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
