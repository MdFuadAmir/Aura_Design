import { motion } from "framer-motion";

const ProjectsHero = () => {
  const marqueeText =
    "SELECTED WORKS • CASE STUDIES • VISUAL STORIES • 2024-2026 • ";

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#f2f9f5] dark:bg-[#04120c] transition-colors duration-500">
      {/* --- Animated Background Marquee (45 Degree) --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.04] dark:opacity-[0.02] flex items-center justify-center">
        <div className="-rotate-45 scale-150 flex flex-col gap-16">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: i % 2 === 0 ? -100 : 0 }}
              animate={{ x: i % 2 === 0 ? 0 : -100 }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
                repeatType: "mirror",
              }}
              className="flex whitespace-nowrap"
            >
              <h2 className="text-[8vw] font-black uppercase tracking-tighter leading-none text-emerald-900 dark:text-emerald-400">
                {marqueeText.repeat(4)}
              </h2>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Top Badge */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-10 bg-emerald-500/50"></span>
            <span className="text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-[0.5em]">
              The Portfolio
            </span>
            <span className="h-px w-10 bg-emerald-500/50"></span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-[#1a1a1a] dark:text-white tracking-tighter leading-[0.85] mb-10">
            Archive of <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-600 italic">
              Creativity.
            </span>
          </h1>

          {/* Description Focused on Graphic Design Portfolio */}
          <p className="text-lg md:text-2xl text-gray-500 dark:text-emerald-100/40 font-medium max-w-2xl mx-auto leading-relaxed mb-12">
            A curated collection of visual identities, digital assets, and brand
            stories crafted with
            <span className="text-[#1a1a1a] dark:text-emerald-400 font-bold">
              {" "}
              precision and soul.
            </span>
          </p>

          {/* Status Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Work</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-emerald-900" />
              <span>Based in Bangladesh</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Corner Glows */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-emerald-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-teal-500/5 rounded-full blur-[120px] -z-10" />
    </section>
  );
};

export default ProjectsHero;
