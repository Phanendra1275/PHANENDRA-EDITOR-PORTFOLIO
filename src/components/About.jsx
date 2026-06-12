import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Clock } from 'lucide-react';
import phanendraAbout from '../assets/phanendra_about.png';
import GlowCard from './GlowCard';

const stats = [
  { icon: <Clock className="text-accent" size={20} />, value: '1 Year', label: 'Experience' },
  { icon: <Award className="text-accent" size={20} />, value: '30', label: 'Projects Completed' },
];

const tools = [
  'Adobe Premiere Pro',
  'Adobe After Effects',
  'CapCut PC',
  'Figma',
  'Topaz AI',
];

const generateWaveformPath = (startX, offset) => {
  const basePoints = [
    { dx: 0, dy: 10 }, { dx: 3, dy: -15 }, { dx: 6, dy: 5 }, { dx: 9, dy: -25 },
    { dx: 12, dy: 15 }, { dx: 15, dy: -5 }, { dx: 18, dy: 20 }, { dx: 21, dy: -10 },
    { dx: 24, dy: 25 }, { dx: 27, dy: -20 }, { dx: 30, dy: 0 }, { dx: 33, dy: -15 },
    { dx: 36, dy: 10 }, { dx: 40, dy: 5 }
  ];
  return basePoints.map((pt, i) => {
    const x = startX + pt.dx;
    const y = 45 + pt.dy - offset;
    return `${i === 0 ? 'M' : 'L'} ${x},${Math.max(8, Math.min(72, y))}`;
  }).join(' ');
};

export default function About() {
  const [colorPos, setColorPos] = useState({ x: 0, y: 0 }); // -1 to 1 range
  const [isGrading, setIsGrading] = useState(false);
  
  const wheelRef = useRef(null);

  const handleWheelMove = (clientX, clientY) => {
    if (!wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const radius = rect.width / 2;
    
    // Calculate normalized offset from center, cap it at 1.0 (radius limit)
    const distance = Math.sqrt(dx * dx + dy * dy);
    const cappedDistance = Math.min(radius - 6, distance);
    const angle = Math.atan2(dy, dx);
    
    const newX = (Math.cos(angle) * cappedDistance) / radius;
    const newY = (Math.sin(angle) * cappedDistance) / radius;
    
    setColorPos({ x: newX, y: newY });
  };

  const handleWheelMouseDown = (e) => {
    setIsGrading(true);
    handleWheelMove(e.clientX, e.clientY);
  };

  const handleWheelTouchStart = (e) => {
    setIsGrading(true);
    if (e.touches && e.touches[0]) {
      handleWheelMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isGrading) {
        handleWheelMove(e.clientX, e.clientY);
      }
    };
    const handleGlobalTouchMove = (e) => {
      if (isGrading && e.touches && e.touches[0]) {
        handleWheelMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleGlobalMouseUp = () => {
      setIsGrading(false);
    };

    if (isGrading) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchend', handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isGrading]);

  const redPath = generateWaveformPath(10, colorPos.x * 20);
  const greenPath = generateWaveformPath(70, -colorPos.y * 20);
  const bluePath = generateWaveformPath(130, -colorPos.x * 20);

  return (
    <section id="about" className="relative py-24 md:py-32 px-6 md:px-12 bg-bg-darker overflow-hidden border-t border-white/[0.02]">
      
      {/* Background ambient glow */}
      <div className="glow-element w-[450px] h-[450px] bg-accent/5 bottom-[5%] left-[5%] blur-[130px]" />
      <div className="glow-element w-[350px] h-[350px] bg-white/[0.02] top-[10%] right-[10%] blur-[120px]" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Cinema Projector Split-Screen Slider */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center">
            
            {/* Outermost Card */}
            <div className="relative w-full max-w-[420px] rounded-custom border border-white/10 bg-[#0F1219]/90 shadow-2xl p-4 flex flex-col items-center select-none">
              
              {/* 35mm Film Frame */}
              <div className="relative w-full aspect-[3/4] bg-black border border-white/10 rounded-lg overflow-hidden flex items-center justify-center p-2">
                
                {/* Left Sprocket Column */}
                <div className="absolute inset-y-0 left-2 w-3 flex flex-col justify-between py-4 select-none opacity-40 z-20 pointer-events-none">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="w-2.5 h-4 bg-bg-darkest rounded border border-white/10" />
                  ))}
                </div>
                {/* Right Sprocket Column */}
                <div className="absolute inset-y-0 right-2 w-3 flex flex-col justify-between py-4 select-none opacity-40 z-20 pointer-events-none">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="w-2.5 h-4 bg-bg-darkest rounded border border-white/10" />
                  ))}
                </div>

                {/* Film Strip Text Metadata */}
                <div className="absolute top-2 inset-x-0 text-center text-[7px] font-mono text-amber-600/60 uppercase tracking-[0.25em] select-none pointer-events-none">
                  KODAK 500T 5074
                </div>
                <div className="absolute bottom-2 left-10 text-[7px] font-mono text-amber-600/60 uppercase tracking-[0.25em] select-none pointer-events-none">
                  ▶ 08
                </div>
                <div className="absolute bottom-2 right-10 text-[7px] font-mono text-amber-600/60 uppercase tracking-[0.25em] select-none pointer-events-none">
                  SAFETY FILM
                </div>

                {/* Main Image Viewport Area (padded to clear sprocket holes) */}
                <div className="relative w-full h-full px-6 flex items-center justify-center">
                  <div className="relative w-full h-[90%] bg-bg-darkest rounded overflow-hidden">
                    
                    {/* Raw Photo with real-time CSS grading filters */}
                    <img
                      src={phanendraAbout}
                      alt="Phanendra Cinematic"
                      className={`w-full h-full object-cover select-none pointer-events-none ${
                        isGrading ? 'transition-none' : 'transition-all duration-300'
                      }`}
                      style={{
                        filter: `brightness(${0.72 - Math.max(0, -colorPos.y) * 0.15}) contrast(${0.90 + Math.sqrt(colorPos.x*colorPos.x + colorPos.y*colorPos.y) * 0.25}) saturate(${0.92 + colorPos.y * 0.35})`
                      }}
                    />

                    {/* Warm Color Grading Filter Overlay (Red-Yellow) */}
                    <div 
                      className={`absolute inset-0 bg-amber-500 mix-blend-color pointer-events-none ${
                        isGrading ? 'transition-none' : 'transition-opacity duration-300'
                      }`}
                      style={{ opacity: colorPos.x > 0 ? colorPos.x * 0.35 : 0 }}
                    />
                    
                    {/* Cool Color Grading Filter Overlay (Cyan-Blue) */}
                    <div 
                      className={`absolute inset-0 bg-cyan-600 mix-blend-color pointer-events-none ${
                        isGrading ? 'transition-none' : 'transition-opacity duration-300'
                      }`}
                      style={{ opacity: colorPos.x < 0 ? -colorPos.x * 0.35 : 0 }}
                    />

                    {/* Magenta Color Grading Filter Overlay */}
                    <div 
                      className={`absolute inset-0 bg-pink-500 mix-blend-color pointer-events-none ${
                        isGrading ? 'transition-none' : 'transition-opacity duration-300'
                      }`}
                      style={{ opacity: colorPos.y > 0 ? colorPos.y * 0.25 : 0 }}
                    />

                    {/* Green Color Grading Filter Overlay */}
                    <div 
                      className={`absolute inset-0 bg-emerald-500 mix-blend-color pointer-events-none ${
                        isGrading ? 'transition-none' : 'transition-opacity duration-300'
                      }`}
                      style={{ opacity: colorPos.y < 0 ? -colorPos.y * 0.25 : 0 }}
                    />

                    {/* Constant Widescreen Film Grain Overlay */}
                    <div 
                      className="absolute inset-0 z-20 pointer-events-none opacity-[0.06] bg-repeat"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                      }}
                    />

                    {/* Letterbox widescreen cinema crop (fixed) */}
                    <div className="absolute inset-x-0 top-0 h-6 bg-black z-30" />
                    <div className="absolute inset-x-0 bottom-0 h-6 bg-black z-30" />

                    {/* Viewfinder guides */}
                    <div className="absolute inset-[8%] border border-white/5 border-dashed pointer-events-none z-15 rounded" />
                  </div>
                </div>

              </div>

              {/* DaVinci Resolve-style Color Wheel & Parade Panel */}
              <div className="w-full mt-6 bg-[#090B10] border border-white/5 rounded-xl p-5 flex flex-col xl:flex-row gap-6 items-center justify-between">
                
                {/* Color Wheel */}
                <div className="flex flex-col items-center gap-2 select-none shrink-0">
                  <span className="text-[9px] font-mono text-text-secondary uppercase tracking-[0.2em] font-bold">Gamma / Midtones</span>
                  <div 
                    ref={wheelRef}
                    onMouseDown={handleWheelMouseDown}
                    onTouchStart={handleWheelTouchStart}
                    className="relative w-24 h-24 rounded-full border border-white/10 bg-[#080A0E] flex items-center justify-center cursor-crosshair select-none overflow-hidden"
                  >
                    {/* Conic Color Spectrum Ring */}
                    <div className="absolute inset-1.5 rounded-full bg-[conic-gradient(from_0deg,#ff4545,#ffdf00,#00ff4c,#00ffff,#3b4eff,#ff00ee,#ff4545)] opacity-40 filter blur-[1px] pointer-events-none" />
                    <div className="absolute inset-4 rounded-full bg-[#080A0E] border border-white/5 pointer-events-none" />
                    
                    {/* Center Crosshair indicator grid */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                      <div className="w-full h-[1px] bg-white" />
                      <div className="h-full w-[1px] bg-white" />
                    </div>
                    
                    {/* Draggable target selector dot */}
                    <div 
                      className={`absolute w-3.5 h-3.5 rounded-full border-2 border-white bg-accent shadow-[0_0_8px_rgba(255,229,0,0.4)] pointer-events-none ${
                        isGrading ? 'transition-none' : 'transition-all duration-300'
                      }`}
                      style={{ 
                        left: `calc(50% + ${colorPos.x * 48}px - 7px)`, 
                        top: `calc(50% + ${colorPos.y * 48}px - 7px)` 
                      }}
                    />
                  </div>
                </div>

                {/* RGB Parade Monitor */}
                <div className="flex flex-col items-center gap-2 select-none w-full max-w-[200px] shrink-0">
                  <span className="text-[9px] font-mono text-text-secondary uppercase tracking-[0.2em] font-bold">RGB Parade Monitor</span>
                  <div className="relative w-full h-24 rounded border border-white/5 bg-[#030406] overflow-hidden flex items-center justify-center p-1 shadow-inner">
                    {/* Scope CRT grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none p-1">
                      <div className="w-full h-[1px] bg-white border-dashed border-b" />
                      <div className="w-full h-[1px] bg-white border-dashed border-b" />
                      <div className="w-full h-[1px] bg-white border-dashed border-b" />
                    </div>
                    <div className="absolute inset-y-0 left-1/3 w-[1px] bg-white/5 pointer-events-none" />
                    <div className="absolute inset-y-0 right-1/3 w-[1px] bg-white/5 pointer-events-none" />
                    {/* SVG Waveforms */}
                    <svg className="w-full h-full" viewBox="0 0 180 80">
                      {/* Red Channel Path */}
                      <path d={redPath} fill="none" stroke="#ef4444" strokeWidth="1.2" className="opacity-80" />
                      {/* Green Channel Path */}
                      <path d={greenPath} fill="none" stroke="#22c55e" strokeWidth="1.2" className="opacity-80" />
                      {/* Blue Channel Path */}
                      <path d={bluePath} fill="none" stroke="#3b82f6" strokeWidth="1.2" className="opacity-80" />
                    </svg>
                  </div>
                </div>
                
                {/* Calibration Metrics */}
                <div className="w-full xl:flex-1 flex flex-col gap-2.5 font-mono">
                  <div className="flex items-center justify-between text-[10px] select-none">
                    <span className="text-text-secondary uppercase">Temp</span>
                    <span className={`font-semibold ${colorPos.x > 0 ? 'text-amber-400' : colorPos.x < 0 ? 'text-cyan-400' : 'text-white'}`}>
                      {colorPos.x > 0 ? `+${Math.round(colorPos.x * 50)}K` : colorPos.x < 0 ? `-${Math.round(-colorPos.x * 50)}K` : '0K'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] select-none">
                    <span className="text-text-secondary uppercase">Tint</span>
                    <span className={`font-semibold ${colorPos.y > 0 ? 'text-pink-400' : colorPos.y < 0 ? 'text-emerald-400' : 'text-white'}`}>
                      {colorPos.y > 0 ? `+${Math.round(colorPos.y * 50)}` : colorPos.y < 0 ? `-${Math.round(-colorPos.y * 50)}` : '0'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] select-none">
                    <span className="text-text-secondary uppercase">Contrast</span>
                    <span className="font-semibold text-white">
                      {(0.90 + Math.sqrt(colorPos.x*colorPos.x + colorPos.y*colorPos.y) * 0.25).toFixed(2)}
                    </span>
                  </div>
                  
                  {/* Reset trigger */}
                  <button
                    onClick={() => setColorPos({ x: 0, y: 0 })}
                    disabled={colorPos.x === 0 && colorPos.y === 0}
                    className="mt-1 w-full py-1.5 rounded bg-white/5 border border-white/10 hover:border-accent/30 hover:bg-accent/5 hover:text-accent text-[9px] font-mono uppercase tracking-widest text-text-secondary transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    Reset Color Grade
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Right Side: Creative Vision, Narrative & Software Suite */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-10">
            
            {/* Header / Vision */}
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-accent text-xs font-bold uppercase tracking-widest block mb-4"
              >
                Philosophy
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-none tracking-tight"
              >
                Pacing is everything. <br />
                Sound is half the picture. <br />
                Storytelling is <span className="text-accent">the soul.</span>
              </motion.h2>
            </div>

            {/* Director's / Editor's Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative border-l-2 border-accent pl-6 py-2 bg-white/[0.01] rounded-r p-4 border-y border-r border-white/5"
            >
              <p className="font-serif-italic text-lg md:text-xl text-white/90 leading-relaxed font-light">
                "In the cutting room, we don't just glue shots together. We compose a visual symphony where every frame is a beat, and every cut is a breath."
              </p>
              <span className="text-[10px] uppercase font-mono tracking-widest text-text-muted mt-2.5 block font-bold">
                — Editor's Note / Creative Director
              </span>
            </motion.div>

            {/* Narrative text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-text-secondary font-body font-light text-base md:text-lg leading-relaxed"
            >
              <p>
                I am a visual video editor specializing in high-retention pacing, surgical sound design, and seamless color grading. 
                I collaborate directly with creators and brands to elevate raw footage into scroll-stopping cinematic stories.
              </p>
            </motion.div>

            {/* Stat Counters Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full"
                >
                  <GlowCard className="p-5 w-full h-full">
                    <div className="w-10 h-10 rounded-full bg-white/[0.02] flex items-center justify-center border border-white/5 mb-4 shrink-0">
                      {stat.icon}
                    </div>
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                        {stat.value}
                      </h3>
                      <p className="text-[10px] md:text-xs font-semibold text-text-secondary uppercase tracking-wider mt-1">
                        {stat.label}
                      </p>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>

            {/* Editing Software Suite */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="pt-8 border-t border-white/[0.04]"
            >
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6">
                Post-Production Pipeline Tools
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 rounded-full text-xs font-semibold bg-white/[0.02] border border-white/5 hover:border-accent/20 hover:bg-accent/5 hover:scale-105 transition-all duration-300 text-text-secondary hover:text-accent cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
