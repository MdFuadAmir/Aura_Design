import { motion } from "framer-motion";
import { FaGlobeAmericas, FaArrowDown } from "react-icons/fa"; // Changed to 'fa'

const ContactHero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#f2f9f5] dark:bg-[#04120c] transition-colors duration-500 overflow-hidden">
      {/* Background Subtle Elements */}
      <div className="absolute top-20 right-[-5%] w-[50vw] h-[50vw] bg-emerald-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-20  opacity-[0.03] dark:opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[18vw] font-black text-[#1a1a1a] dark:text-white leading-none tracking-tighter">
          CONNECT
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="flex flex-col items-start">
          {/* Top Status Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/20 px-5 py-2 rounded-full mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.3em]">
              Available for new projects
            </span>
          </motion.div>

          {/* Headline */}
          <div className="max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl lg:text-9xl font-black text-[#1a1a1a] dark:text-white tracking-tighter leading-[0.9] mb-12"
            >
              LET’S BUILD THE <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-emerald-800 italic">
                NEXT BIG THING.
              </span>
            </motion.h1>
          </div>

          {/* Bottom Row: Location & Scroll Indicator */}
          <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mt-10 border-t border-emerald-500/5 pt-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-xl">
                <FaGlobeAmericas />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Based in
                </p>
                <p className="text-sm font-bold text-[#1a1a1a] dark:text-white">
                  Dhaka, Bangladesh — 1216
                </p>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex items-center gap-4 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
            >
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] group-hover:text-emerald-500 transition-colors">
                Drop a Message
              </span>
              <div className="w-10 h-10 rounded-full border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <FaArrowDown />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
