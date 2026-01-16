
import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef } from "react";

const cards = [
  {
    title: "Expert-Led Care",
    description: "All patients are first assessed by the chief physiotherapist before beginning physiotherapy treatment.",
  },
  {
    title: "Proven Alternatives to Surgery",
    description: "Many patients advised for surgery have regained full function with our structured treatment protocols and rehabilitation.",
  },
  {
    title: "End-to-End Recovery Pathway",
    description: "From first consultation to full recovery, receive seamless and coordinated care at every stage.",
  },
  {
    title: "Condition-Specific Programmes",
    description: "Customised plans for pain management, injury recovery, post-surgical care, and overall wellness.",
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
  // All cards same size, no scale transform
  return (
    <div className="sticky top-0 flex items-center justify-center">
      <div
        style={{
          top: `calc(-1vh + ${i * 6 + 60}px)`,
          minHeight: '220px',
          maxHeight: '220px',
          minWidth: '350px',
          maxWidth: '350px',
        }}
        className="rounded-3xl relative -top-1/4 flex origin-top flex-col overflow-hidden bg-white shadow-lg p-5"
      >
        <h2 className="font-bold text-lg mb-2 truncate">{title}</h2>
        <p className="text-gray-600 overflow-hidden text-ellipsis line-clamp-4">{description}</p>
      </div>
    </div>
  );
};

const WhyChooseUsSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground">
              Your Trusted Partner in Recovery
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Experience the difference with our dedicated team and proven treatment methods.
            </p>
          </div>
          <main
            ref={container}
            className="relative flex w-full flex-col items-center justify-center pt-[4vh] pb-[10vh]"
          >
            {cards.map((card, i) => (
              <StickyCard
                key={`c_${i}`}
                i={i}
                {...card}
              />
            ))}
          </main>
        </div>
      </section>
    </ReactLenis>
  );
};

export default WhyChooseUsSection;
