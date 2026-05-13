import { motion } from "framer-motion";
import {
  FaArrowDown,
  FaBezierCurve,
  FaPalette,
  FaVectorSquare,
} from "react-icons/fa";

const ServicesHero = () => {
  const marqueeText = "VISUAL IDENTITY • BRAND STRATEGY • MINIMALIST DESIGN • ";

  return (
    <section className="relative md:min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden bg-[#f2f9f5] dark:bg-[#04120c]">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.04] dark:opacity-[0.02] flex items-center justify-center">
        <div className="-rotate-45 scale-150 flex flex-col gap-12">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: i % 2 === 0 ? -100 : 0 }}
              animate={{ x: i % 2 === 0 ? 0 : -100 }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
                repeatType: "mirror",
              }}
              className="flex whitespace-nowrap"
            >
              <h2 className="font-black uppercase tracking-tighter leading-none text-emerald-900 dark:text-emerald-400 text-[7vw] grayscale hover:grayscale-0 transition-all duration-700">
                {marqueeText.repeat(5)}
              </h2>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-[0.4em] border border-emerald-500/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Creative Solutions
          </span>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-[#1a1a1a] dark:text-white tracking-tighter mb-10">
            Design with a <br />
            {/* leading-[0.85] */}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-600 italic">
              Digital Soul.
            </span>
          </h1>

          {/* Description - Focused on Graphic Design */}
          <p className="text-lg md:text-2xl text-gray-500 dark:text-emerald-100/40 font-medium max-w-3xl mx-auto leading-relaxed mb-16">
            Helping modern brands stand out through
            <span className="text-[#1a1a1a] dark:text-emerald-400 font-bold">
              {" "}
              high-end visual identities
            </span>
            and minimalist aesthetics. We transform complex ideas into timeless
            design stories.
          </p>

          {/* Floating Skills Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-10 border-y border-emerald-500/10 dark:border-white/5 max-w-5xl mx-auto backdrop-blur-sm bg-white/5 dark:bg-transparent">
            {[
              {
                icon: <FaBezierCurve />,
                title: "Logo & Branding",
                desc: "Crafting Unique Identities",
              },
              {
                icon: <FaPalette />,
                title: "Visual Arts",
                desc: "Color & Typography Mastery",
              },
              {
                icon: <FaVectorSquare />,
                title: "Digital Assets",
                desc: "Pixel-Perfect Assets",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="flex items-center justify-center gap-4 group cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#061a12] border border-emerald-500/10 flex items-center justify-center text-emerald-500 text-xl shadow-xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">
                    {item.title}
                  </h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-16 flex flex-col items-center gap-4 text-emerald-500/30"
        >
          <span className="text-[9px] font-black uppercase tracking-[0.5em] rotate-90 mb-4">
            Discover
          </span>
          <FaArrowDown />
        </motion.div>
      </div>

      {/* Shapes & Blurs - Adding depth */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] -z-10" />
    </section>
  );
};

export default ServicesHero;
