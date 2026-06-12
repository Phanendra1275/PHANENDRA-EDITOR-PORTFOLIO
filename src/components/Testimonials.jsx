import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import GlowCard from './GlowCard';

const testimonials = [
  {
    quote: "Phanendra is a pacing genius. He trimmed our narrative short film by 5 minutes while making the emotional beats hit twice as hard. The color grade is movie-theatre ready.",
    author: "Subbu Kamani",
    role: "Director, \"The Destiny\"",
    rating: 5
  },
  {
    quote: "Average retention shot up by 38% after we switched to Phanendra's vertical cuts. His audio pacing, SFX markers, and subtitle style keep viewers locked in.",
    author: "Social Campaign Mgr",
    role: "@viral_campaigns",
    rating: 5
  },
  {
    quote: "Multi-cam switching and clean noise reduction made our podcast feel like a top-tier studio production. Absolute professional who hits deadlines every single time.",
    author: "Creative Dialogues",
    role: "Podcast Host",
    rating: 5
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      filter: 'blur(4px)'
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      filter: 'blur(4px)',
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
  };

  return (
    <section className="relative py-20 md:py-28 px-6 md:px-12 bg-bg-darker overflow-hidden border-t border-white/[0.02]">
      {/* Background ambient light */}
      <div className="glow-element w-[300px] h-[300px] bg-accent/5 top-[50%] right-[10%] blur-[120px]" />

      <div className="max-w-4xl mx-auto z-10 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-accent text-xs font-bold uppercase tracking-widest block mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
            Client Feedback
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[260px] md:min-h-[220px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full absolute"
            >
              <GlowCard className="p-8 md:p-10 w-full bg-bg-card/30 border-white/5 relative">
                {/* Large Accent Quote Icon */}
                <div className="absolute top-6 right-8 text-accent/10 pointer-events-none">
                  <Quote size={80} className="fill-current" />
                </div>

                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-accent fill-current" />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p className="font-serif-italic text-base md:text-lg text-white/90 leading-relaxed max-w-3xl">
                    "{testimonials[activeIndex].quote}"
                  </p>

                  {/* Author Info */}
                  <div className="border-t border-white/5 pt-4 w-full flex items-center justify-between">
                    <div>
                      <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                        {testimonials[activeIndex].author}
                      </h4>
                      <p className="text-[10px] font-mono text-text-secondary uppercase tracking-widest mt-1">
                        {testimonials[activeIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mt-8 relative z-20">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/30 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          
          {/* Indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex ? 'w-6 bg-accent' : 'bg-white/10 hover:bg-white/30'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/30 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
