import { motion } from "framer-motion";
import { FaSearch, FaPenNib, FaCode, FaRocket } from "react-icons/fa";

const steps = [
  {
    title: "Discovery & Strategy",
    desc: "We start by diving deep into your brand's soul to understand goals, audience, and market positioning.",
    icon: <FaSearch />,
    color: "from-emerald-400 to-emerald-600",
  },
  {
    title: "Creative Concept",
    desc: "Turning ideas into visual sketches and moodboards. We refine the aesthetic until it perfectly fits your vision.",
    icon: <FaPenNib />,
    color: "from-teal-400 to-emerald-500",
  },
  {
    title: "Design & Refinement",
    desc: "Crafting high-fidelity visuals with pixel perfection. Every curve and color is meticulously polished.",
    icon: <FaCode />, // Graphics Focused but using icons that represent precision
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Final Delivery",
    desc: "Handing over all the premium assets and guidelines to ensure your brand shines across all platforms.",
    icon: <FaRocket />,
    color: "from-teal-500 to-emerald-700",
  },
];

const ProcessWorkflow = () => {
  return (
    <section className="py-24 bg-[#f2f9f5] dark:bg-[#04120c] transition-colors duration-500 overflow-hidden relative">
      {/* --- Section Header --- */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-20 md:mb-32">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-emerald-500 font-black text-xs uppercase tracking-[0.5em] mb-4 block"
        >
          The Workflow
        </motion.span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#1a1a1a] dark:text-white  ">
          How Magic <br />
          <span className="text-emerald-500 italic">Happens.</span>
        </h2>
      </div>

      {/* --- Zig-Zag Process Container --- */}
      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Connection Line (Desktop Only) */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1px bg-emerald-500/10 -translate-x-1/2" />

        <div className="space-y-20 md:space-y-40">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative flex flex-col lg:flex-row items-center gap-10 md:gap-20 ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Central Animated Shape (Circle with Icon) */}
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] bg-linear-to-br ${step.color} flex items-center justify-center text-white text-2xl md:text-3xl shadow-2xl shadow-emerald-500/30 animate-morph`}
                >
                  {step.icon}
                </motion.div>
                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] flex items-center justify-center text-[10px] font-black">
                  0{index + 1}
                </div>
              </div>

              {/* Content Card */}
              <div
                className={`w-full lg:w-1/2 text-center ${index % 2 !== 0 ? "lg:text-right" : "lg:text-left"}`}
              >
                <h3 className="text-3xl md:text-5xl font-black text-[#1a1a1a] dark:text-white mb-6 tracking-tighter uppercase">
                  {step.title}
                </h3>
                <p className="text-lg md:text-xl text-gray-500 dark:text-emerald-100/40 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
                  {step.desc}
                </p>

                {/* Decorative Dash Line for Desktop Zig-Zag */}
                <div
                  className={`hidden lg:block mt-8 w-20 h-0.5 bg-emerald-500/20 ${index % 2 !== 0 ? "ml-auto" : "mr-auto"}`}
                />
              </div>

              {/* Ghost Step Label (Background) */}
              <div className="absolute -z-10 opacity-[0.03] dark:opacity-[0.02] hidden lg:block left-1/2 -translate-x-1/2">
                <h4 className="text-[12vw] font-black text-[#1a1a1a] dark:text-white uppercase select-none">
                  STEP_0{index + 1}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- Bottom Glow --- */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes morph {
            0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
            50% { border-radius: 50% 50% 30% 70% / 50% 30% 70% 50%; }
            100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          }
          .animate-morph { animation: morph 6s ease-in-out infinite; }
        `,
        }}
      />
    </section>
  );
};

export default ProcessWorkflow;
