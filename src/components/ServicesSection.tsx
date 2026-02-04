import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ServicesSection = () => {
  const scrollRef = useRef(null);

  const services = [
    {
      video: "/video1.mp4",
      title: "Knee Pain Rehabilitation",
      description: "Reduce pain, improve mobility, and restore knee strength.",
      color: "from-blue-500 to-cyan-400",
    },
    {
      video: "/video2.mp4",
      title: "Pre- and Post-Surgical Rehabilitation",
      description: "Faster, safer recovery before and after surgery.",
      color: "from-teal-500 to-emerald-400",
    },
    {
      video: "/video3.mp4",
      title: "Ligament Injury Rehabilitation",
      description: "Stability-focused rehab to heal and prevent re-injury.",
      color: "from-orange-500 to-amber-400",
    },
    {
      video: "/video4.mp4",
      title: "Shoulder Pain Rehabilitation",
      description: "Relieve stiffness, pain, and restore full shoulder movement.",
      color: "from-purple-500 to-pink-400",
    },
    {
      video: "/video5.mp4",
      title: "Neck Pain Rehabilitation",
      description: "Targeted care to ease pain and improve posture.",
      color: "from-indigo-500 to-blue-400",
    },
    {
      video: "/video6.mp4",
      title: "Sports Injury and Rehabilitation",
      description: "Performance-driven recovery to get you back in action.",
      color: "from-red-500 to-orange-400",
    },
    {
      video: "/video7.mp4",
      title: "Orthopaedic Rehabilitation",
      description: "Comprehensive care for bones, joints, and muscles.",
      color: "from-green-500 to-teal-400",
    },
    {
      video: "/video8.mp4",
      title: "Neurological Rehabilitation",
      description: "Improving movement, balance, and daily function.",
      color: "from-violet-500 to-purple-400",
    },
    {
      video: "/video9.mp4",
      title: "Cardio Wellness",
      description: "Safe exercise programs to improve heart health and stamina",
      color: "from-rose-500 to-pink-400",
    },
    {
      video: "/video10.mp4",
      title: "Interferential Therapy (IFT)",
      description: "Deep pain relief using targeted electrical currents.",
      color: "from-cyan-500 to-blue-400",
    },
    {
      video: "/video11.mp4",
      title: "Transcutaneous Electrical Nerve Stimulation (TENS)",
      description: "Non-invasive pain control through nerve stimulation.",
      color: "from-amber-500 to-yellow-400",
    },
    {
      video: "/video12.mp4",
      title: "Wax Therapy",
      description: "Heat therapy to reduce stiffness and joint pain.",
      color: "from-orange-500 to-red-400",
    },
    {
      video: "/video13.mp4",
      title: "Ultrasound Therapy (UST)",
      description: "Deep tissue healing using therapeutic sound waves.",
      color: "from-teal-500 to-cyan-400",
    },
    {
      video: "/video14.mp4",
      title: "Electrical Muscle Stimulation (EMS)",
      description: "Strengthening weak muscles through electrical activation.",
      color: "from-blue-500 to-indigo-400",
    },
    {
      video: "/video15.mp4",
      title: "Advanced Laser Therapy",
      description: "Fast pain relief and tissue healing with laser technology.",
      color: "from-purple-500 to-violet-400",
    },
    {
      video: "/video16.mp4",
      title: "Manual Therapy",
      description: "Hands-on techniques to reduce pain and improve mobility.",
      color: "from-emerald-500 to-green-400",
    },
    {
      video: "/video17.mp4",
      title: "Geriatric Care Physiotherapy",
      description: "Therapeutic treatment for joint stiffness",
      color: "from-pink-500 to-rose-400",
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 420;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="services" className="py-12 md:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <span className="inline-block text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Comprehensive Physiotherapy Solutions
          </h2>
          <p className="text-gray-600 text-base md:text-lg lg:text-xl">
            Evidence-based treatments tailored to your recovery needs
          </p>
        </div>

        {/* Horizontal Scroll - Both Mobile and Desktop */}
        <div className="relative">
          {/* Left Button - Desktop Only */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Right Button - Desktop Only */}
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] md:w-[360px] lg:w-[400px] snap-start"
              >
                <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full hover:shadow-xl hover:scale-[1.02] transition-all duration-300">

                  {/* Video */}
                  <div className={`h-48 md:h-56 lg:h-64 bg-gradient-to-br ${service.color} relative overflow-hidden`}>
                    <video
                      src={service.video}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="none"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/5" />
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-6 lg:p-7">
                    <h3 className="font-bold text-lg md:text-xl lg:text-2xl text-gray-900 mb-2 md:mb-3 line-clamp-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Swipe Hint */}
          <div className="flex justify-center mt-4 md:mt-6">
            <span className="text-xs md:text-sm text-gray-500">
              ← Scroll to see more →
            </span>
          </div>
        </div>

        {/* CTA Button */}

      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;