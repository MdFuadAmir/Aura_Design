import { motion } from "framer-motion";
import { FaFingerprint, FaLightbulb, FaRocket } from "react-icons/fa";

const MyPhilosophy = () => {
  const philosophies = [
    {
      icon: <FaFingerprint />,
      title: "Unique Identity",
      desc: "Every brand has a story. I create visual fingerprints that are impossible to forget.",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: <FaLightbulb />,
      title: "Simple is Smart",
      desc: "Minimalism isn't just about less; it's about making every element count.",
      color: "from-emerald-400 to-emerald-600",
    },
    {
      icon: <FaRocket />,
      title: "Future Ready",
      desc: "Designs that remain functional and aesthetic for years to come.",
      color: "from-teal-400 to-emerald-500",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#020a07] overflow-hidden transition-colors duration-500 relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-teal-500/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Sticky Text Content */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-0.5 bg-emerald-500"></span>
                <span className="text-emerald-500 font-bold text-xs uppercase tracking-[0.3em]">
                  The Methodology
                </span>
              </div>
              <h2 className="text-5xl md:6xl lg:text-7xl font-black text-[#1a1a1a] dark:text-white leading-[0.85] tracking-tighter mb-8">
                CREATIVE <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-400">
                  MINDSET.
                </span>
              </h2>
              <div className="relative p-6 border-l-2 border-emerald-500/30 bg-emerald-500/5 rounded-r-2xl">
                <p className="text-lg md:text-xl text-gray-600 dark:text-emerald-100/60 font-medium leading-relaxed italic">
                  "I don't just decorate screens; I engineer emotional
                  experiences through strategic simplicity."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Interactive Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {philosophies.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative p-px rounded-4xl overflow-hidden ${
                  index === 1 ? "md:mt-12" : ""
                } ${index === 2 ? "md:col-span-2" : ""}`}
              >
                {/* Border linear Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-emerald-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative h-full p-8 md:p-10 rounded-4xl bg-[#f8fafc] dark:bg-[#061a12] border border-emerald-500/5 group-hover:border-emerald-500/20 transition-all duration-500 shadow-sm">
                  {/* Icon with Glowing background */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-linear-to-br ${item.color} flex items-center justify-center text-white text-3xl mb-8 shadow-lg shadow-emerald-500/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}
                  >
                    {item.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 dark:text-emerald-100/40 leading-relaxed text-base font-medium">
                    {item.desc}
                  </p>

                  {/* Decorative number or tag */}
                  <div className="absolute top-8 right-8 text-4xl font-black text-emerald-500/5 group-hover:text-emerald-500/10 transition-colors">
                    0{index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPhilosophy;
