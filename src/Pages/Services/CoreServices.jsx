import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    title: "Brand Strategy",
    subtitle: "Visual Identity",
    image: "https://i.ibb.co.com/hRyPK4Cy/img12.jpg",
  },
  {
    title: "UI/UX Design",
    subtitle: "Digital Interfaces",
    image: "https://i.ibb.co.com/7JJSX3tG/img6.jpg",
  },
  {
    title: "Visual Assets",
    subtitle: "Marketing Art",
    image: "https://i.ibb.co.com/MD1sDkqs/img3.jpg",
  },
];

const CoreServices = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 bg-white dark:bg-[#020a07] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 border-b border-emerald-500/10 pb-10">
          <span className="text-emerald-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-3 block">
            Expertise
          </span>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a1a] dark:text-white tracking-tighter uppercase">
            Core <span className="text-emerald-500 italic">Services.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Services List */}
          <div className="lg:col-span-7 space-y-2">
            {services.map((service, index) => (
              <div
                key={index}
                className="border-b border-emerald-500/5 last:border-0"
              >
                <div
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className="group cursor-pointer py-8"
                >
                  <div className="flex items-center gap-6">
                    <span
                      className={`text-xs font-black ${activeIndex === index ? "text-emerald-500" : "text-gray-300 dark:text-white/10"}`}
                    >
                      0{index + 1}
                    </span>
                    <div>
                      <h4
                        className={`text-4xl md:text-6xl font-black tracking-tighter uppercase transition-all duration-500 ${
                          activeIndex === index
                            ? "text-emerald-500 md:translate-x-4"
                            : "text-[#1a1a1a] dark:text-white group-hover:text-emerald-500/50"
                        }`}
                      >
                        {service.title}
                      </h4>
                      <p
                        className={`text-[10px] font-bold uppercase tracking-[0.3em] mt-2 transition-all duration-500 ${
                          activeIndex === index
                            ? "text-gray-400 opacity-100 md:translate-x-4"
                            : "opacity-0"
                        }`}
                      >
                        {service.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Image: Only shows below the active title on small screens */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="block lg:hidden overflow-hidden"
                    >
                      <div className="pb-8">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h64 object-cover rounded-3xl border-4 border-emerald-500/5"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop Image: Sticky on the right side */}
          <div className="hidden lg:block lg:col-span-5 sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative h-full w-full rounded-[3rem] overflow-hidden border-10 border-emerald-500/5 shadow-2xl"
              >
                <img
                  src={services[activeIndex].image}
                  alt={services[activeIndex].title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#020a07]/40 to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
