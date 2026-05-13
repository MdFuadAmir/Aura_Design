import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router";

const NextChapterCTA = () => {
  const navugate = useNavigate();
  return (
    <section className="py-20 md:py-24 bg-[#f2f9f5] dark:bg-[#04120c] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
        {/* Compact Line Decoration */}
        <div className="flex justify-center mb-10">
          <div className="w-px h-16 bg-linear-to-b from-emerald-500 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">
            Next Chapter
          </span>

          <h2 className="text-5xl md:text-7xl font-black text-[#1a1a1a] dark:text-white tracking-tighter leading-none mb-10">
            HAVE A <span className="text-emerald-500 italic">PROJECT?</span>
          </h2>

          {/* Compact Optimized Button */}
          <div className="relative inline-block group">
            <button
              onClick={() =>
                navugate("/contact", {
                  state: {
                    message: `
Yes, I’m ready to elevate my brand with Aura Design Studio. I am looking for a high-end digital solution that prioritizes minimalist aesthetics and strategic excellence. 

I’m particularly interested in building a "Digital Soul" for my brand that resonates with a modern audience. Let’s collaborate to turn this vision into a world-class reality!`,
                  },
                })
              }
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 w-36 h-36 md:w-44 md:h-44 rounded-full bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] flex flex-col items-center justify-center transition-colors duration-500 overflow-hidden shadow-xl"
              >
                {/* Background Hover Effect */}
                <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

                {/* Button Content */}
                <div className="relative z-10 flex flex-col items-center">
                  <FaArrowRight className="text-xl md:text-2xl mb-2 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Let's Talk
                  </span>
                </div>
              </motion.div>
            </button>

            {/* Subtle Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] border border-emerald-500/10 rounded-full animate-ping pointer-events-none" />
          </div>
        </motion.div>

        {/* Minimal Footer Info */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-emerald-500/5 pt-12">
          <div className="text-center md:text-left">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
              Email
            </p>
            <a
              href="mailto:mdfuadamir@gmail.com"
              className="text-xs font-bold text-[#1a1a1a] dark:text-white hover:text-emerald-500 transition-colors"
            >
              mdfuadamir@gmail.com
            </a>
          </div>
          <div className="text-center">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
              Location
            </p>
            <p className="text-xs font-bold text-[#1a1a1a] dark:text-white">
              Dhaka, BD
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
              Social
            </p>
            <div className="flex justify-center md:justify-end gap-4 text-[10px] font-bold text-[#1a1a1a] dark:text-white uppercase tracking-tighter">
              <a href="#" className="hover:text-emerald-500 transition-colors">
                Behance
              </a>
              <span className="opacity-10">/</span>
              <a href="#" className="hover:text-emerald-500 transition-colors">
                Dribbble
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextChapterCTA;
