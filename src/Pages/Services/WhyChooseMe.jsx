import { motion } from "framer-motion";
import CommonButton from "../../Shared/CommonButton";
import {
  FaArrowRight,
  FaCheckCircle,
  FaLightbulb,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router";

const stats = [
  {
    number: "100+",
    label: "Visual Identities",
    icon: <FaLightbulb />,
    desc: "Crafting unique brand souls.",
  },
  {
    number: "04+",
    label: "Years of Craft",
    icon: <FaRocket />,
    desc: "Experience in digital evolution.",
  },
  {
    number: "50+",
    label: "Global Clients",
    icon: <FaShieldAlt />,
    desc: "Trusted by brands worldwide.",
  },
  {
    number: "99%",
    label: "Satisfaction",
    icon: <FaCheckCircle />,
    desc: "Commitment to excellence.",
  },
];

const WhyChooseMe = () => {
  const navugate = useNavigate();
  return (
    <section className="py-24 bg-[#f2f9f5] dark:bg-[#04120c] transition-colors duration-500 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Side: The "Why" Text */}
          <div className="lg:col-span-6">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-emerald-500 font-black text-xs uppercase tracking-[0.6em] mb-6 block"
            >
              The Distinction
            </motion.span>
            <h2 className="text-5xl md:text-8xl font-black text-[#1a1a1a] dark:text-white tracking-tighter leading-[0.9] mb-8">
              More than <br />
              just <span className="text-emerald-500 italic">Graphics.</span>
            </h2>
            <p className="text-lg text-gray-500 dark:text-emerald-100/40 font-medium leading-relaxed max-w-lg">
              We blend strategic thinking with artistic excellence to ensure
              your brand doesn't just look good, but communicates effectively in
              the digital landscape.
            </p>

            {/* Strategic Pills */}
            <div className="flex flex-wrap gap-3 mt-10">
              {["Precision", "Minimalism", "Strategy", "Impact"].map(
                (item, i) => (
                  <span
                    key={i}
                    className="px-5 py-2 rounded-full border border-emerald-500/10 dark:border-white/5 text-[#1a1a1a] dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest bg-emerald-500/5"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Right Side: Artistic Stats Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 md:gap-6 relative">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 md:p-12 rounded-4xl border border-emerald-500/10 dark:border-white/5 backdrop-blur-sm  flex flex-col justify-center items-center text-center
                  ${index === 1 || index === 2 ? "bg-emerald-500 text-white dark:text-[#1a1a1a]" : "bg-white dark:bg-[#061a12] text-[#1a1a1a] dark:text-white"}
                `}
              >
                <div
                  className={`text-3xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6
                  ${index === 1 || index === 2 ? "text-white/90" : "text-emerald-500"}
                `}
                >
                  {stat.icon}
                </div>
                <span className="text-4xl md:text-6xl font-black tracking-tighter mb-2">
                  {stat.number}
                </span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] opacity-60">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Huge Bottom Marquee/Signature */}
        <div className="mt-40 border-t border-emerald-500/10 dark:border-white/5 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <p className="text-[10px] font-black text-[#1a1a1a] dark:text-white uppercase tracking-[0.3em]">
                Currently accepting <br /> High-End collaborations
              </p>
            </div>
            <CommonButton
              text="Secure a Spot"
              onClick={() =>
                navugate("/contact", {
                  state: {
                    message:
                      "Hi Aura Design! I'm interested in high-end collaboration for my brand. Let's discuss how we can work together.",
                  },
                })
              }
              className="rounded-full"
              iconRight={FaArrowRight}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMe;
