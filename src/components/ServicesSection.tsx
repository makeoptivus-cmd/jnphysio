import { Zap, Waves, Flame, Activity, Brain, HeartPulse } from "lucide-react";
import { useRef } from "react";

const ServicesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      image: "/img1.png",
      title: "Knee Pain Rehabilitation",
      description: "Reduce pain, improve mobility, and restore knee strength.",
      color: "from-blue-500 to-cyan-400",
    },
    {
      image: "/img2.png",
      title: "Pre- and Post-Surgical Rehabilitation",
      description: "Faster, safer recovery before and after surgery.",
      color: "from-teal-500 to-emerald-400",
    },
    {
      image: "/img3.png",
      title: "Ligament Injury Rehabilitation",
      description: "Stability-focused rehab to heal and prevent re-injury.",
      color: "from-orange-500 to-amber-400",
    },
    {
      image: "/img4.png",
      title: "Shoulder Pain Rehabilitation",
      description: "Relieve stiffness, pain, and restore full shoulder movement.",
      color: "from-orange-500 to-amber-400",
    },
    {
      image: "/img5.png",
      title: "Neck Pain Rehabilitation",
      description: "Targeted care to ease pain and improve posture.",
      color: "from-orange-500 to-amber-400",
    },
    {
      image: "/img6.png",
      title: "Sports Injury and Rehabilitation",
      description: "Performance-driven recovery to get you back in action.",
      color: "from-orange-500 to-amber-400",
    },
    {
      image: "/img7.png",
      title: "Orthopaedic Rehabilitation",
      description: "Comprehensive care for bones, joints, and muscles.",
      color: "from-orange-500 to-amber-400",
    },
    {
      image: "/img8.png",
      title: "Neurological Rehabilitation",
      description: "Improving movement, balance, and daily function.",
      color: "from-orange-500 to-amber-400",
    },
    {
      image: "/img9.png",
      title: "Cardio Wellness",
      description: "Safe exercise programs to improve heart health and stamina",
      color: "from-orange-500 to-amber-400",
    },
    {
      image: "/img10.png",
      title: "Interferential Therapy (IFT)",
      description: "Deep pain relief using targeted electrical currents.",
      color: "from-orange-500 to-amber-400",
    },
    {
      image: "/img11.png",
      title: "Transcutaneous Electrical Nerve Stimulation (TENS)",
      description: "Non-invasive pain control through nerve stimulation.",
      color: "from-orange-500 to-amber-400",
    },
    {
      image: "/img12.png",
      title: "Wax Therapy",
      description: "Heat therapy to reduce stiffness and joint pain.",
      color: "from-orange-500 to-amber-400",
    },
    {
      image: "/img13.png",
      title: "Ultrasound Therapy (UST)",
      description: "Deep tissue healing using therapeutic sound waves.",
      color: "from-orange-500 to-amber-400",
    },
    {
      image: "/img14.png",
      title: "Electrical Muscle Stimulation (EMS)",
      description: "Strengthening weak muscles through electrical activation.",
      color: "from-orange-500 to-amber-400",
    },
    {
      image: "/img15.png",
      title: "Advanced Laser Therapy",
      description: "Fast pain relief and tissue healing with laser technology.",
      color: "from-orange-500 to-amber-400",
    },
    {
      image: "/img16.png",
      title: "Manual Therapy",
      description: "Hands-on techniques to reduce pain and improve mobility.",
      color: "from-orange-500 to-amber-400",
    },{
      image: "/img17.png",
      title: "Geriatric Care Physiotherapy",
      description: "Therapeutic treatment for joint stiffness",
      color: "from-orange-500 to-amber-400",
    }
    
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground">
            Comprehensive Physiotherapy Solutions
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Swipe to explore our evidence-based treatments
          </p>
        </div>

        {/* Horizontal Scroll */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[420px] md:w-[460px] snap-start"
            >
              <div className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-elevated hover:scale-[1.02] transition-all duration-300 h-full">
                
                {/* Image / Icon Header */}
                <div
                  className={`h-44 md:h-52 bg-gradient-to-br ${service.color} relative flex items-center justify-center`}
                >
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full  drop-shadow-lg"
                    />
                  ) : (
                    <service.icon className="w-20 h-20 text-white drop-shadow-lg" />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Swipe Hint */}
        <div className="flex justify-center mt-6">
          <span className="text-xs text-muted-foreground">
            ← Swipe to see more →
          </span>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
