import { motion } from 'framer-motion';
import { Smartphone, Mic, Film, Palette, Check } from 'lucide-react';
import GlowCard from './GlowCard';

const services = [
  {
    icon: <Film className="text-accent" size={24} />,
    title: 'Short Film Editing',
    description: 'Splicing, pacing, and color grading for narrative filmmakers. I preserve director intent while engineering rich visual emotion.',
    features: ['Cinematic Color LUTs', 'Sound FX Design', 'Pacing & Scene Flow']
  },
  {
    icon: <Mic className="text-accent" size={24} />,
    title: 'Podcast Editing',
    description: 'Multi-cam stitching, audio cleanup, dynamic text subtitles, and vertical cuts. High-quality output optimized for viewer retention.',
    features: ['Audio Level Master', 'Multi-cam Switching', 'Social Clips Extraction']
  },
  {
    icon: <Smartphone className="text-accent" size={24} />,
    title: 'Reel Editing',
    description: 'High-velocity vertical hooks, micro-animations, text-tracking graphics, and sound design that increases loops and algorithm engagement.',
    features: ['Under 2s Hook Focus', 'Dynamic Auto-Captions', 'Audio Jump SFX']
  },
  {
    icon: <Palette className="text-accent" size={24} />,
    title: 'Poster Designing',
    description: 'Custom graphics, high-impact typography, digital compositing, and thumbnail art that increases CTR and visually communicates content.',
    features: ['YouTube Thumbnail Art', 'Film Poster Styling', 'High Contrast Typography']
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 px-6 md:px-12 bg-bg-darkest overflow-hidden">
      
      {/* Background glow element */}
      <div className="glow-element w-[400px] h-[400px] bg-accent/5 top-[20%] left-[50%] -translate-x-1/2 blur-[140px]" />

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-accent text-xs font-bold uppercase tracking-widest block mb-4"
          >
            Specializations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight"
          >
            Creative Post-Production Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-text-secondary font-body font-light text-base mt-4"
          >
            Each service is approached through an editor's lens, ensuring high visual quality and tailored post-production.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="w-full h-full"
            >
              <GlowCard className="p-8 h-full">
                <div>
                  {/* Icon Container */}
                  <div className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6 group-hover:scale-115 group-hover:bg-accent/5 group-hover:border-accent/20 transition-all duration-300">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-white tracking-wide mb-3 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm font-body font-light text-text-secondary leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Bullet Features list */}
                <ul className="border-t border-white/[0.04] pt-5 space-y-2.5">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2.5 text-xs font-semibold text-text-muted group-hover:text-text-secondary transition-colors duration-300">
                      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-accent/5 border border-accent/15 text-accent shrink-0">
                        <Check size={9} strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
