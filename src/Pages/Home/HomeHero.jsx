import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FaArrowRight, FaDraftingCompass, FaBolt } from "react-icons/fa";
import CommonButton from "../../Shared/CommonButton";

const Hero = () => {
  const marqueeText = "AURA_DESIGN CREATIVE STUDIO • BUILDING DIGITAL SOUL • ";
  const navugate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center pt-28 md:pt-32 lg:pt-24 pb-20 overflow-hidden bg-[#f2f9f5] dark:bg-[#04120c]">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.03] dark:opacity-[0.02] flex items-center justify-center">
        <div className="-rotate-45 scale-150 flex flex-col gap-8 md:gap-16">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: i % 2 === 0 ? -100 : 0 }}
              animate={{ x: i % 2 === 0 ? 0 : -100 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                repeatType: "mirror",
              }}
              className="flex whitespace-nowrap"
            >
              <h2 className="text-[8vw] font-black uppercase tracking-tighter leading-none text-[#1a1a1a] dark:text-emerald-400">
                {marqueeText.repeat(4)}
              </h2>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/5 skew-x-12 origin-right -z-10" />
      <div className="absolute -top-24 -left-24 w-72 md:w-96 h-72 md:h-96 bg-emerald-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Content */}
        <div className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <span className="h-0.5 w-12 bg-emerald-500"></span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-[0.3em]">
                Available for New Projects
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tight text-[#1a1a1a] dark:text-white leading-none">
              Building <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-600">
                Digital Soul.
              </span>
            </h1>

            <p className="mt-6 md:mt-8 text-base md:text-lg text-gray-600 dark:text-emerald-100/60 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We don't just code, we build modern digital experiences for your
              brand. High-converting landing pages with React and Tailwind.
            </p>

            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <CommonButton
                text=" View Works"
                to={"/projects"}
                iconRight={FaArrowRight}
                className="rounded-full"
              />
              <CommonButton
                text="Let's Talk"
                variant="outline"
                onClick={() =>
                  navugate("/contact", {
                    state: {
                      message:
                        "I would like to start a project with Aura Design Studio!",
                    },
                  })
                }
                className="rounded-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Right Image */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative w-64 sm:w-[320px] md:w-96 lg:w-112.5 aspect-4/5 overflow-hidden shadow-2xl rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-morph bg-emerald-500">
              <img
                src="https://i.ibb.co.com/yczy8cYW/img1.jpg"
                alt="Developer"
                className="w-full h-full object-cover "
              />
            </div>

            {/* Floating Card 1 */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-3 left-0 md:-left-8 p-3 md:p-5 backdrop-blur-xl bg-white/70 dark:bg-[#061a12]/80 border border-white/20 rounded-2xl shadow-xl flex items-center gap-3 z-20"
            >
              <div className="bg-emerald-500 p-2 md:p-3 rounded-xl text-white">
                <FaBolt />
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-black dark:text-white text-black">
                  Fast Performance
                </h4>
                <p className="text-[9px] md:text-[10px] text-emerald-600 font-bold uppercase">
                  Optimized Code
                </p>
              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-3 right-0 md:-right-6 p-3 md:p-5 backdrop-blur-xl bg-white/70 dark:bg-[#061a12]/80 border border-white/20 rounded-2xl shadow-xl flex items-center gap-3 z-20"
            >
              <div className="bg-emerald-500 p-2 md:p-3 rounded-xl text-white">
                <FaDraftingCompass />
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-black dark:text-white text-black">
                  Modern UI
                </h4>
                <p className="text-[9px] md:text-[10px] text-emerald-600 font-bold uppercase">
                  Pixel Perfect
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes morph {
            0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
            50% { border-radius: 50% 50% 30% 70% / 50% 30% 70% 50%; }
            100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          }
          .animate-morph { animation: morph 8s ease-in-out infinite; }
        `,
        }}
      />
    </section>
  );
};

export default Hero;
