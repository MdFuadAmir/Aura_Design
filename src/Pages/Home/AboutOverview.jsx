import { motion } from "framer-motion";
import owner from "../../assets/owner1.webP";
import {
  FaCheckCircle,
  FaBezierCurve,
  FaAward,
  FaMagic,
  FaArrowRight,
} from "react-icons/fa";
import CommonButton from "../../Shared/CommonButton";

const AboutOverview = () => {
  const stats = [
    { id: 1, label: "Brands Transformed", value: "80+", icon: <FaMagic /> },
    { id: 2, label: "Design Awards", value: "05+", icon: <FaAward /> },
  ];

  return (
    <section className="py-24 bg-[#f2f9f5] dark:bg-[#04120c] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Side: Creative Image/Visual Block */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              {/* Main Image with decorative border */}
              <div className="flex justify-center">
                <div className="relative rounded-[3.5rem] overflow-hidden border-12 border-white dark:border-[#061a12] shadow-2xl w-full md:w-100 lg:w-full">
                  <img
                    src={owner}
                    alt="Creative Design Process"
                    className="w-full h-full object-cover "
                  />
                </div>
              </div>

              {/* Floating Concept Card */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-8 -right-6 md:right-10 p-4 bg-emerald-500 text-white rounded-3xl shadow-2xl shadow-emerald-500/40 z-20"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-2xl">
                    <FaBezierCurve className="text-2xl" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest leading-tight">
                    Pixel Perfect <br /> Precision
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Background Decorative Element */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -z-10" />
          </div>

          {/* Right Side: Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-[0.3em] border border-emerald-500/20">
                The Creative Mind
              </span>

              <h2 className="mt-8 text-4xl md:text-6xl font-black text-[#1a1a1a] dark:text-white leading-[0.95] tracking-tighter">
                Turning Concepts <br />
                Into{" "}
                <span className="text-emerald-500 italic">
                  Visual Realities.
                </span>
              </h2>

              <p className="mt-8 text-lg text-gray-600 dark:text-emerald-100/50 leading-relaxed">
                Design is more than just aesthetics; it's about communication.
                We specialize in crafting high-impact brand identities and
                minimalist visual systems that help modern businesses stand out
                in a crowded digital landscape.
              </p>

              {/* Features List */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Minimalist Brand Identities",
                  "High-Converting Ad Creatives",
                  "Modern UI/UX Visuals",
                  "Print & Digital Strategy",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <FaCheckCircle className="text-emerald-500" />
                    <span className="text-sm font-bold text-[#1a1a1a] dark:text-white/80">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats & CTA */}
              <div className="mt-12 flex flex-wrap items-center gap-8 border-t border-emerald-500/10 pt-10">
                <div className="flex gap-10">
                  {stats.map((stat) => (
                    <div key={stat.id}>
                      <div className="flex items-center gap-2 text-emerald-500 mb-1">
                        <span className="text-2xl font-black text-[#1a1a1a] dark:text-white">
                          {stat.value}
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <CommonButton
                  text="Learn My Story"
                  to={"/about"}
                  iconRight={FaArrowRight}
                  className="rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOverview;
