import { motion } from "framer-motion";

const BlogHero = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 bg-[#f2f9f5] dark:bg-[#04120c] overflow-hidden">
      {/* --- Background Decorative Elements --- */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-emerald-500/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-20 left-10 opacity-[0.04] dark:opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[15vw] font-black text-[#1a1a1a] dark:text-white leading-none tracking-tighter">
          JOURNAL
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.5em]">
              The Editorial
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-9xl font-black text-[#1a1a1a] dark:text-white tracking-tighter leading-[0.85] mb-8"
          >
            Insights & <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-600 italic">
              Perspectives.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-500 dark:text-emerald-100/30 font-medium max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Exploring the intersection of minimalist design, strategic branding,
            and the future of digital aesthetics.
          </motion.p>

          {/* Featured Stats / Labels */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 md:gap-12 pt-8 border-t border-emerald-500/5 w-full max-w-3xl"
          >
            <div className="flex flex-col items-center">
              <span className="text-emerald-500 font-black text-xs mb-1 uppercase tracking-widest">
                Weekly
              </span>
              <span className="text-[10px] font-bold text-gray-400 dark:text-emerald-100/10 uppercase">
                Updates
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-emerald-500 font-black text-xs mb-1 uppercase tracking-widest">
                Case Studies
              </span>
              <span className="text-[10px] font-bold text-gray-400 dark:text-emerald-100/10 uppercase">
                Deep Dives
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-emerald-500 font-black text-xs mb-1 uppercase tracking-widest">
                Freebies
              </span>
              <span className="text-[10px] font-bold text-gray-400 dark:text-emerald-100/10 uppercase">
                Design Assets
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-linear-to-r from-transparent via-emerald-500/10 to-transparent" />
    </section>
  );
};

export default BlogHero;
