import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Disable scroll on body when loader is active
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsDone(true);
      // Let the exit animation finish, then trigger completion callback
      setTimeout(() => {
        document.body.style.overflow = '';
        onComplete();
      }, 800); // matches the duration of container's exit transition
    }, 3200);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, [onComplete]);

  // Framer Motion variants
  const containerVariants = {
    initial: { 
      opacity: 1 
    },
    exit: { 
      opacity: 0,
      scale: 1.08,
      filter: 'blur(8px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const textContainerVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.9, 
      filter: 'blur(10px)' 
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const editorVariants = {
    initial: { 
      opacity: 0, 
      y: 10 
    },
    animate: { 
      opacity: 0.8, 
      y: 0,
      transition: { delay: 0.6, duration: 0.8, ease: 'easeOut' }
    }
  };

  const curveVariants = {
    initial: { 
      pathLength: 0 
    },
    animate: { 
      pathLength: 1,
      transition: { delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const arrowheadVariants = {
    initial: { 
      pathLength: 0, 
      opacity: 0 
    },
    animate: { 
      pathLength: 1,
      opacity: 1,
      transition: { delay: 1.25, duration: 0.3, ease: 'easeOut' }
    }
  };

  const glowVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.8 
    },
    animate: { 
      opacity: 0.35, 
      scale: 1.1,
      transition: { delay: 1.2, duration: 1.5, ease: 'easeOut' }
    }
  };

  const clapperVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.7, 
      y: -15 
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030406] select-none overflow-hidden"
        >
          {/* Subtle Star Particle Background */}
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:200px_200px]" />
          
          {/* Ambient Golden Glow behind logo */}
          <motion.div 
            variants={glowVariants}
            initial="initial"
            animate="animate"
            className="absolute w-[280px] h-[280px] rounded-full bg-accent/10 blur-[90px] pointer-events-none"
          />

          <div className="relative flex flex-col items-center">
            {/* Minimalist Film Clapperboard */}
            <motion.div
              variants={clapperVariants}
              initial="initial"
              animate="animate"
              className="mb-6 z-20 pointer-events-none"
            >
              <svg 
                className="w-16 h-16 text-accent drop-shadow-[0_0_12px_rgba(255,229,0,0.25)]" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Clapperboard Body (bottom part) */}
                <rect x="20" y="44" width="60" height="32" rx="3" fill="#0F1219" stroke="#FFE500" strokeWidth="3.5" />
                
                {/* Body stripes (diagonal) */}
                <path d="M28 44 L36 52 M42 44 L50 52 M56 44 L64 52 M70 44 L78 52" stroke="#FFE500" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Clapperboard Top Bar (clapping part) */}
                <motion.g
                  style={{ originX: "20px", originY: "44px" }}
                  initial={{ rotate: -28 }}
                  animate={{ rotate: 0 }}
                  transition={{ 
                    delay: 0.4, 
                    type: "spring", 
                    stiffness: 420, 
                    damping: 12 
                  }}
                >
                  {/* Clapper top bar */}
                  <rect x="20" y="32" width="60" height="12" rx="2" fill="#0F1219" stroke="#FFE500" strokeWidth="3.5" />
                  {/* Clapper stripes (diagonal) */}
                  <path d="M28 44 L36 32 M42 44 L50 32 M56 44 L64 32 M70 44 L78 32" stroke="#FFE500" strokeWidth="2.5" strokeLinecap="round" />
                </motion.g>
              </svg>
            </motion.div>

            {/* The Text Logo */}
            <motion.div
              variants={textContainerVariants}
              initial="initial"
              animate="animate"
              className="flex flex-col items-center"
            >
              <h1 className="font-azonix text-3xl sm:text-4xl md:text-5xl tracking-[0.25em] text-white font-normal relative z-10 select-none animate-shine pb-1 leading-none">
                PHANENDRA
              </h1>
              
              <motion.div 
                variants={editorVariants}
                initial="initial"
                animate="animate"
                className="mt-2 text-xs sm:text-sm tracking-[0.4em] font-medium text-white/70 uppercase z-10 select-none"
              >
                EDITOR
              </motion.div>
            </motion.div>

            {/* SVG Prime-style Curve under Logo */}
            <div className="w-[160px] sm:w-[200px] md:w-[240px] mt-1 relative z-20 pointer-events-none">
              <svg 
                className="w-full h-auto overflow-visible drop-shadow-[0_2px_8px_rgba(255,229,0,0.35)]" 
                viewBox="0 0 300 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Smile Curve */}
                <motion.path
                  d="M 40 10 Q 150 32 260 10"
                  stroke="#FFE500"
                  strokeWidth="4"
                  strokeLinecap="round"
                  variants={curveVariants}
                  initial="initial"
                  animate="animate"
                />
                {/* Arrowhead */}
                <motion.path
                  d="M 247 5 L 262 10 L 250 20"
                  stroke="#FFE500"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={arrowheadVariants}
                  initial="initial"
                  animate="animate"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
