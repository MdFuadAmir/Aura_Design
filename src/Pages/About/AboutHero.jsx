import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import CommonButton from "../../Shared/CommonButton";
import profile from "../../assets/owner2.webP";

const AboutHero = () => {
  const marqueeText = "AURA_DESIGN CREATIVE STUDIO • BUILDING DIGITAL SOUL • ";
  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 bg-[#f2f9f5] dark:bg-[#04120c] overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Content Area */}
          <div className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-[0.4em] border border-emerald-500/20">
                Nice to meet you
              </span>

              <h1 className="mt-8 text-5xl md:text-6xl lg:text-8xl font-black text-[#1a1a1a] dark:text-white leading-[0.9] tracking-tighter">
                I'm the Mind Behind <br />
                <span className="text-emerald-500 italic">The Visuals.</span>
              </h1>

              <p className="mt-8 text-lg md:text-xl text-gray-600 dark:text-emerald-100/50 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                A passionate graphic designer dedicated to crafting minimalist
                brand identities and high-converting visual stories that help
                modern businesses stand out from the noise.
              </p>

              {/* Action Buttons */}
              <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6">
                <a
                  href="https://docs.google.com/document/d/12K2cXFu7bpCguwRwaytDKMEsww5fUsbcZP4UmAU-N6E/export?format=pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <CommonButton
                    text="Download CV"
                    iconLeft={FaDownload}
                    className="rounded-full"
                  />
                </a>
              </div>

              {/* Quick Stats Overlay */}
              <div className="mt-16 pt-10 border-t border-emerald-500/10 grid grid-cols-3 gap-8">
                {[
                  { label: "Experience", value: "05+" },
                  { label: "Happy Clients", value: "120+" },
                  { label: "Projects", value: "350+" },
                ].map((stat, i) => (
                  <div key={i}>
                    <h4 className="text-3xl font-black text-[#1a1a1a] dark:text-white tracking-tighter">
                      {stat.value}
                    </h4>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Image Area */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative mx-auto max-w-100 lg:max-w-none"
            >
              {/* Image Frame with Artistic Border */}
              <div className="relative z-10 rounded-[3rem] overflow-hidden border-12 border-white dark:border-[#061a12] shadow-2xl shadow-emerald-900/10">
                <img
                  src={profile}
                  alt="Designer Profile"
                  className="w-full object-cover"
                />
              </div>

              {/* Floating Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl z-0" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl z-0" />

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -right-4 md:bottom-10 md:-right-10 z-20 bg-emerald-500 p-6 rounded-3xl shadow-2xl rotate-6"
              >
                <p className="text-white font-black text-xs uppercase tracking-widest leading-tight">
                  Available for <br /> Freelance
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
