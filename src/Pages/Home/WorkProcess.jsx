import { motion } from "framer-motion";
import { FaBezierCurve, FaSearch, FaPalette, FaRocket } from "react-icons/fa";

const steps = [
  {
    num: "01",
    title: "Insight & Research",
    desc: "Understanding the soul of your brand to create a strategic design foundation.",
    icon: <FaSearch />,
    rotate: "-2deg",
  },
  {
    num: "02",
    title: "Visual Concept",
    desc: "Sketching and moodboarding ideas that bridge the gap between vision and reality.",
    icon: <FaPalette />,
    rotate: "3deg",
  },
  {
    num: "03",
    title: "Design Magic",
    desc: "Transforming concepts into high-fidelity visuals with pixel-perfect precision.",
    icon: <FaBezierCurve />,
    rotate: "-3deg",
  },
  {
    num: "04",
    title: "Final Launch",
    desc: "Delivering ready-to-use assets that empower your brand across all platforms.",
    icon: <FaRocket />,
    rotate: "2deg",
  },
];

const WorkProcess = () => {
  return (
    <section className="py-24 bg-[#f2f9f5] dark:bg-[#04120c] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Modern Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-24 gap-6">
          <div className="max-w-xl text-left">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-emerald-500 font-black text-xs uppercase tracking-[0.5em] mb-4 block"
            >
              The Blueprint
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-[#1a1a1a] dark:text-white tracking-tighter leading-[0.9]"
            >
              How I Bring <br />
              <span className="italic text-emerald-500">Ideas to Life.</span>
            </motion.h2>
          </div>
          <div className="hidden md:block pb-2">
            <p className="text-gray-500 dark:text-emerald-100/40 font-medium max-w-62.5 text-sm">
              A structured approach to ensure your brand stands out in the
              digital noise.
            </p>
          </div>
        </div>

        {/* Dynamic Overlap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-24 md:gap-x-12 lg:gap-x-20">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ rotate: "0deg", scale: 1.02 }}
              style={{ rotate: step.rotate }}
              className="relative p-10 bg-white dark:bg-[#061a12] rounded-[3rem] border border-emerald-500/10 shadow-2xl shadow-emerald-900/5 group transition-all duration-500"
            >
              {/* Background Large Number */}
              <span className="absolute -top-12 -left-6 md:-left-10 text-[10rem] font-black text-emerald-500/5 dark:text-emerald-500/3 select-none group-hover:text-emerald-500/10 transition-colors">
                {step.num}
              </span>

              <div className="relative z-10">
                {/* Floating Icon Box */}
                <div className="w-16 h-16 bg-[#1a1a1a] dark:bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-2xl mb-8 shadow-xl shadow-emerald-500/20 group-hover:-translate-y-2 transition-transform duration-300">
                  {step.icon}
                </div>

                <h3 className="text-3xl font-black text-[#1a1a1a] dark:text-white mb-4 tracking-tighter">
                  {step.title}
                </h3>

                <p className="text-gray-600 dark:text-emerald-100/60 leading-relaxed text-base font-medium">
                  {step.desc}
                </p>

                {/* Step Marker */}
                <div className="mt-8 flex items-center gap-3">
                  <div className="w-10 h-0.5 bg-emerald-500/30" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
                    Phase {step.num}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
