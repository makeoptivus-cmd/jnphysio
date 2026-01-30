import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef } from "react";

const cards = [
  {
    title: "Expert-Led Care",
    description:
      "All patients are first assessed by the chief physiotherapist before beginning physiotherapy treatment.",
  },
  {
    title: "Proven Alternatives to Surgery",
    description:
      "Many patients advised for surgery have regained full function with our structured treatment protocols and rehabilitation.",
  },
  {
    title: "End-to-End Recovery Pathway",
    description:
      "From first consultation to full recovery, receive seamless and coordinated care at every stage.",
  },
  {
    title: "Condition-Specific Programmes",
    description:
      "Customised plans for pain management, injury recovery, post-surgical care, and overall wellness.",
  },
];

const StickyCard = ({
  i,
  title,
  description,
}: {
  i: number;
  title: string;
  description: string;
}) => {
  return (
    <div className="sticky top-0 flex items-center justify-center px-4">
      <div
        style={{ top: `calc(-1vh + ${i * 6 + 60}px)` }}
        className="rounded-2xl md:rounded-3xl relative -top-1/4 flex origin-top flex-col overflow-hidden bg-white shadow-lg p-4 sm:p-5 md:p-6 
        w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[480px]
        min-h-[200px] sm:min-h-[220px] md:min-h-[240px]"
      >
        <h2 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl mb-2 md:mb-3 line-clamp-2">
          {title}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg line-clamp-3 sm:line-clamp-4">
          {description}
        </p>
      </div>
    </div>
  );
};

const WhyChooseUsSection = () => {
  const container = useRef<HTMLDivElement>(null);
  useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <section
        id="why-us"
        className="py-12 sm:py-16 md:py-20 lg:py-24 bg-secondary/30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 space-y-3 md:space-y-4">
            <span className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground px-4">
              Your Trusted Partner in Recovery
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl px-4">
              Experience the difference with our dedicated team and proven
              treatment methods.
            </p>
          </div>

          <main
            ref={container}
            className="relative flex w-full flex-col items-center justify-center pt-[2vh] sm:pt-[3vh] md:pt-[4vh] pb-[6vh] sm:pb-[8vh] md:pb-[10vh]"
          >
            {cards.map((card, i) => (
              <StickyCard key={i} i={i} {...card} />
            ))}
          </main>
        </div>
      </section>
    </ReactLenis>
  );
};

export default WhyChooseUsSection;
