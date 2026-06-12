import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Clock, User } from 'lucide-react';
import GlowCard from './GlowCard';
import theDestinyThumbnail from '../assets/the_destiny_thumbnail.jpg';
import reelsEditingImg from '../assets/reels_editing.png';
import reelsShowcaseThumbnail from '../assets/reels_showcase_thumbnail.jpg';
import podcastEditingImg from '../assets/podcast_editing.png';

const categories = ['All', 'Short-Form', 'Long-Form'];

const projects = [
  {
    id: 1,
    title: "THE DESTINY | Telugu Short Film",
    category: "Long-Form",
    duration: "30:16",
    thumbnail: theDestinyThumbnail,
    videoUrl: "https://youtu.be/r8Oza1rKjhk",
    client: "Subbu Kamani",
    tools: ['Premiere Pro', 'After Effects', 'Audition'],
    deliverables: ['Cinematic Pacing', 'Dialogue Cleanup', 'Scene Flow', 'Surgical Cuts'],
    description: "Narrative-heavy short film requiring meticulous scene transitions, dialogue matching, and emotional pacing control."
  },
  {
    id: 2,
    title: "Viral Retention Reel - Creative Cuts",
    category: "Short-Form",
    duration: "0:30",
    thumbnail: reelsEditingImg,
    videoUrl: "https://drive.google.com/file/d/1w4R17n3bg6YW-Ry_pTb4veQO8wTLwPxJ/view?usp=sharing",
    client: "Social Media Campaign",
    tools: ['Premiere Pro', 'After Effects', 'CapCut PC'],
    deliverables: ['Under 2s Hooks', 'Dynamic Subtitles', 'Sound Effects', 'Color Grading'],
    description: "A social media campaign reel focused on high viewer retention, micro-hooks, and fast-paced sound design syncs."
  },
  {
    id: 4,
    title: "Horror Short Film",
    category: "Long-Form",
    duration: "0:45",
    thumbnail: reelsShowcaseThumbnail,
    videoUrl: "https://drive.google.com/file/d/1hnZasw2Qm6A58d-cSBa-7TK7ftCUNAqH/view?usp=drive_link",
    client: "Phani / Creator",
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    deliverables: ['Suspense Editing', 'Color Correction', 'Jumpscares Sync', 'Sound Design'],
    description: "Sound-led horror piece utilizing psychological pacing, eerie color tones, and shock sound effects."
  },
  {
    id: 5,
    title: "Professional Podcast Showcase",
    category: "Long-Form",
    duration: "14:22",
    thumbnail: podcastEditingImg,
    videoUrl: "https://drive.google.com/file/d/13uiFOjNVMj1FXxKoE0y7b3C1GN2skDzm/view?usp=drive_link",
    client: "Creative Dialogues",
    tools: ['Premiere Pro', 'Audition'],
    deliverables: ['Multi-Cam Stitching', 'Audio Level Master', 'Noise Reduction', 'Sparsity Cuts'],
    description: "High-fidelity corporate and conversational podcast project featuring multi-camera switching and audio restoration."
  }
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeVideo, setActiveVideo] = useState(null);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="work" className="relative py-24 md:py-32 px-6 md:px-12 bg-bg-darker border-t border-white/[0.02]">
      
      {/* Background ambient light */}
      <div className="glow-element w-[400px] h-[400px] bg-accent/5 bottom-[5%] left-[10%] blur-[130px]" />

      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-accent text-xs font-bold uppercase tracking-widest block mb-4"
            >
              Selected Cuts
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight"
            >
              Cinematic Showcases
            </motion.h2>
          </div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-wrap gap-2 bg-white/[0.02] border border-white/5 p-1 rounded-full w-fit"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.03] ${
                  activeFilter === cat 
                    ? 'bg-accent text-bg-darkest shadow-lg shadow-accent/25 scale-105' 
                    : 'text-text-secondary hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Portfolio Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                key={project.id}
                className="w-full"
              >
                <GlowCard 
                  onClick={() => setActiveVideo(project)}
                  className="aspect-video-cinematic cursor-pointer w-full h-full"
                >
                  {/* Thumbnail Image */}
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.85] group-hover:brightness-[0.4]"
                  />

                  {/* Glassmorphic Play Button Overlay (Visible on Hover) */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/90 via-black/30 to-black/50">
                    <div className="flex justify-between items-center w-full transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                        {project.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-white/70 font-mono">
                        <Clock size={12} />
                        {project.duration}
                      </span>
                    </div>

                    {/* Play Icon Center */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-accent text-bg-darkest flex items-center justify-center shadow-lg shadow-accent/35 scale-75 group-hover:scale-100 transition-transform duration-500">
                      <Play size={20} className="fill-current ml-0.5" />
                    </div>

                    {/* Text Details Bottom */}
                    <div className="text-left transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-text-secondary mb-1">
                        <User size={10} className="text-accent" />
                        {project.client}
                      </p>
                      <h3 className="font-display text-base md:text-lg font-bold text-white leading-tight mb-2">
                        {project.title}
                      </h3>
                      {/* Tools used list */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.tools?.map((tool) => (
                          <span key={tool} className="text-[7.5px] font-mono font-bold uppercase tracking-wider text-white/60 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Cinematic Fullscreen Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 cursor-pointer"
            onClick={() => setActiveVideo(null)}
          >
            {/* Ambient Background Glow behind Modal */}
            <div className="absolute w-full max-w-4xl aspect-video bg-accent/10 rounded-custom blur-[80px] opacity-60 z-0 pointer-events-none" />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 150 }}
              className="relative w-full max-w-5xl bg-bg-darkest rounded-custom overflow-hidden border border-white/10 shadow-2xl flex flex-col z-10 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:px-6 md:py-4 border-b border-white/5 bg-bg-card">
                <div>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{activeVideo.category} // {activeVideo.client}</span>
                  <h3 className="font-display text-sm md:text-base font-bold text-white">{activeVideo.title}</h3>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white hover:text-accent hover:rotate-90 transition-all duration-300 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
                {activeVideo.videoUrl.includes('youtube.com') || activeVideo.videoUrl.includes('youtu.be') ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${(() => {
                      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                      const match = activeVideo.videoUrl.match(regExp);
                      return (match && match[2].length === 11) ? match[2] : '';
                    })()}?autoplay=1`}
                    title={activeVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : activeVideo.videoUrl.includes('drive.google.com') ? (
                  <iframe
                    src={(() => {
                      const regExp = /\/file\/d\/([^\/]+)/;
                      const match = activeVideo.videoUrl.match(regExp);
                      return match ? `https://drive.google.com/file/d/${match[1]}/preview` : '';
                    })()}
                    title={activeVideo.title}
                    frameBorder="0"
                    allow="autoplay"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <video
                    src={activeVideo.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Project Details Panel (Case Study) */}
              <div className="p-5 md:p-6 bg-[#0f1219]/90 border-t border-white/5 flex flex-col md:flex-row gap-6 text-left font-sans">
                {/* Left: Description & Software used */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1.5">Project Overview</h4>
                    <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light">
                      {activeVideo.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Editing Suite:</span>
                    {activeVideo.tools?.map((tool) => (
                      <span key={tool} className="text-[9px] font-mono font-bold uppercase tracking-wider text-accent bg-accent/5 border border-accent/15 px-2 py-0.5 rounded">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Key Deliverables */}
                <div className="w-full md:w-[240px] shrink-0 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                  <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2.5">Production Scope</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeVideo.deliverables?.map((del) => (
                      <span key={del} className="text-[9px] font-semibold text-white/80 bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-full">
                        {del}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
