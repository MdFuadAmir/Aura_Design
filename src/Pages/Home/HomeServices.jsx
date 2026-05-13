import { motion } from "framer-motion";
import {
  FaBezierCurve,
  FaBullseye,
  FaLayerGroup,
  FaMagic,
  FaArrowRight,
} from "react-icons/fa";
import CommonButton from "../../Shared/CommonButton";

const services = [
  {
    icon: <FaBezierCurve />,
    title: "Brand Identity",
    desc: "Crafting unique visual identities and logos that capture your brand's core essence.",
    features: ["Custom Logo Design", "Brand Guidelines", "Typography Setup"],
  },
  {
    icon: <FaLayerGroup />,
    title: "Visual Design",
    desc: "Creating high-impact social media assets, posters, and digital marketing materials.",
    features: ["Social Media Kits", "Poster & Banner", "Marketing Assets"],
  },
  {
    icon: <FaBullseye />,
    title: "Ad Creative",
    desc: "Strategic advertisement designs engineered to grab attention and boost conversions.",
    features: ["High-CTR Visuals", "A/B Test Variants", "Copywriting Support"],
  },
  {
    icon: <FaMagic />,
    title: "Print & Media",
    desc: "Premium print-ready designs for business cards, stationery, and brand packaging.",
    features: ["Business Cards", "Packaging Design", "Stationery Sets"],
  },
];
const HomeServices = () => {
  return (
    <section className="py-24 bg-[#f2f9f5] dark:bg-[#04120c] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-24"
        >
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-[0.3em] border border-emerald-500/20">
            Creative Expertise
          </span>

          <h2 className="mt-8 text-4xl md:text-6xl font-black text-[#1a1a1a] dark:text-white leading-[0.95] tracking-tighter">
            Visual Solutions for <br />
            <span className="text-emerald-500 italic">Creative Brands.</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 dark:text-emerald-100/50 leading-relaxed">
            I blend artistic vision with strategic design to craft compelling
            visual identities that communicate and resonate with your audience.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className={`relative p-8 rounded-[2.5rem] overflow-hidden group transition-all duration-500
              bg-white dark:bg-[#061a12] border border-emerald-500/5 dark:border-emerald-500/10 shadow-xl shadow-emerald-900/5
              ${i === 1 ? "md:translate-y-8 xl:translate-y-12" : ""}
              ${i === 2 ? "md:translate-y-0 xl:translate-y-12" : ""}
              ${i === 3 ? "md:translate-y-8 xl:translate-y-0" : ""}`}
            >
              {/* Decorative glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/15 transition-all duration-500" />

              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xl mb-7 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-black text-[#1a1a1a] dark:text-white mb-4 group-hover:text-emerald-500 transition-colors">
                {service.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-emerald-100/60 leading-relaxed mb-8">
                {service.desc}
              </p>
              <div className="space-y-3 mb-8">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-emerald-100/40">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-28"
        >
          <CommonButton
            text="Explore My Portfolio"
            to={"/services"}
            iconRight={FaArrowRight}
            className="rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HomeServices;
