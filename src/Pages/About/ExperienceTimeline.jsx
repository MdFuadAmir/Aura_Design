import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaGraduationCap,
  FaTrophy,
  FaRocket,
} from "react-icons/fa";

const milestones = [
  {
    year: "2024 - Present",
    title: "Senior Brand Designer",
    company: "StackHive Agency",
    desc: "Leading the creative direction for international brands, focusing on minimalist visual identities and scalable design systems.",
    icon: <FaBriefcase />,
  },
  {
    year: "2022 - 2024",
    title: "Full-Stack Web Developer",
    company: "Nexora Digital",
    desc: "Bridging the gap between design and code by developing high-performance MERN stack applications with pixel-perfect UI.",
    icon: <FaRocket />,
  },
  {
    year: "2021",
    title: "Best Visual Identity Award",
    company: "Designers Community",
    desc: "Recognized for outstanding creative work in the minimalist branding category among 500+ global participants.",
    icon: <FaTrophy />,
  },
  {
    year: "2019 - 2022",
    title: "Graphic Design Degree",
    company: "Creative Arts Institute",
    desc: "Completed professional training in visual communication, typography, and advanced digital illustration techniques.",
    icon: <FaGraduationCap />,
  },
];

const ExperienceTimeline = () => {
  return (
    <section className="py-24 bg-[#f2f9f5] dark:bg-[#05160e] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-emerald-500 font-black text-xs uppercase tracking-[0.5em] mb-4 block"
          >
            The Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-[#1a1a1a] dark:text-white tracking-tighter leading-[0.9]"
          >
            Milestones & <br />
            <span className="italic text-emerald-500">Experience.</span>
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-emerald-500/10 md:-translate-x-1/2" />

          <div className="space-y-12 md:space-y-24">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot & Icon */}
                <div className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full bg-[#1a1a1a] dark:bg-emerald-500 border-4 border-white dark:border-[#05160e] flex items-center justify-center text-white text-xs z-10 -translate-x-2.75 md:-translate-x-1/2 shadow-xl shadow-emerald-500/20 transition-transform group-hover:scale-125">
                  {item.icon}
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                  <div
                    className={`p-8 md:p-10 rounded-[2.5rem] bg-[#dff4e8] dark:bg-[#061a12] border border-emerald-500/5 dark:border-emerald-500/10 shadow-2xl shadow-emerald-900/5 hover:border-emerald-500/30 transition-all duration-500 ${
                      index % 2 === 0 ? "md:mr-16" : "md:ml-16"
                    }`}
                  >
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">
                      {item.year}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-[#1a1a1a] dark:text-white mt-4 mb-2 tracking-tighter">
                      {item.title}
                    </h3>
                    <h4 className="text-sm font-bold text-gray-500 dark:text-emerald-100/30 uppercase tracking-widest mb-6">
                      {item.company}
                    </h4>
                    <p className="text-gray-500 dark:text-emerald-100/50 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Empty Space for Desktop Alignment */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
