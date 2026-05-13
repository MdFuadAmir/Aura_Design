import { motion } from "framer-motion";
import { 
  FaBezierCurve, 
  FaObjectGroup, 
  FaFigma, 
  FaReact, 
  FaWind, 
  FaMagic 
} from "react-icons/fa";

const skills = [
  { 
    name: "Photoshop", 
    icon: <FaObjectGroup />, // Photoshop এর জন্য Object Group আইকন
    level: "Expert", 
    color: "hover:text-[#31A8FF]" 
  },
  { 
    name: "Illustrator", 
    icon: <FaBezierCurve />, // Illustrator এর জন্য Vector/Bezier আইকন
    level: "Advanced", 
    color: "hover:text-[#FF9A00]" 
  },
  { 
    name: "Figma", 
    icon: <FaFigma />, // Font Awesome এখন Figma সাপোর্ট করে
    level: "Expert", 
    color: "hover:text-[#F24E1E]" 
  },
  { 
    name: "React JS", 
    icon: <FaReact />, 
    level: "Intermediate", 
    color: "hover:text-[#61DAFB]" 
  },
  { 
    name: "Tailwind CSS", 
    icon: <FaWind />, // Tailwind এর জন্য Wind আইকন
    level: "Expert", 
    color: "hover:text-[#06B6D4]" 
  },
  { 
    name: "Framer Motion", 
    icon: <FaMagic />, // Animations এর জন্য Magic/Wand আইকন
    level: "Advanced", 
    color: "hover:text-[#E91E63]" 
  },
];

const SkillsToolkit = () => {
  return (
    <section className="py-24 bg-[#f2f9f5] dark:bg-[#04120c] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header Area */}
        <div className="max-w-3xl mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-emerald-500 font-black text-xs uppercase tracking-[0.5em] mb-4 block"
          >
            The Arsenal
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-[#1a1a1a] dark:text-white tracking-tighter leading-[0.9]"
          >
            Tools I Use to <br />
            <span className="italic text-emerald-500">Shape Ideas.</span>
          </motion.h2>
          <p className="mt-8 text-gray-500 dark:text-emerald-100/40 font-medium max-w-lg">
            I combine world-class design software with modern front-end
            technologies to build seamless digital experiences.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group bg-white dark:bg-[#061a12] p-8 rounded-[2.5rem] border border-emerald-500/10 flex flex-col items-center justify-center text-center shadow-xl shadow-emerald-900/5 transition-all duration-500"
            >
              {/* Glowing Background on Hover */}
              <div className="absolute inset-0 bg-emerald-500/5 rounded-[2.5rem] scale-0 group-hover:scale-100 transition-transform duration-500" />

              {/* Icon */}
              <div
                className={`text-5xl md:text-6xl text-gray-300 dark:text-emerald-500/20 mb-6 transition-all duration-300 ${skill.color} group-hover:scale-110`}
              >
                {skill.icon}
              </div>

              {/* Skill Info */}
              <h3 className="text-sm font-black text-[#1a1a1a] dark:text-white uppercase tracking-widest">
                {skill.name}
              </h3>

              {/* Revealable Skill Level */}
              <motion.span className="mt-2 text-[10px] font-bold text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                {skill.level}
              </motion.span>

              {/* Corner Decorative Dot */}
              <div className="absolute bottom-6 right-6 w-1.5 h-1.5 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors" />
            </motion.div>
          ))}
        </div>

        {/* Technical Progress Bar (Optional Add-on) */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-10 md:p-16 bg-white dark:bg-[#061a12] rounded-[3rem] border border-emerald-500/10 shadow-2xl shadow-emerald-900/5">
          <div>
            <h4 className="text-2xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter mb-4">
              {" "}
              Expertise Area
            </h4>
            <p className="text-sm text-gray-500 dark:text-emerald-100/50 leading-relaxed mb-6">
              Focusing on creating visual consistency across all digital
              touchpoints.
            </p>
            <div className="space-y-6">
              {[
                { label: "Visual Branding", width: "95%" },
                { label: "UI/UX Layouts", width: "88%" },
                { label: "Motion Graphics", width: "75%" },
              ].map((bar, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2">
                    <span>{bar.label}</span>
                    <span>{bar.width}</span>
                  </div>
                  <div className="h-1.5 w-full bg-emerald-500/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: bar.width }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8 bg-[#f2f9f5] dark:bg-[#04120c] rounded-4xl text-center">
                <span className="text-4xl font-black text-emerald-500">
                  10+
                </span>
                <p className="text-[10px] font-bold text-gray-400 uppercase mt-2">
                  Tools Mastery
                </p>
              </div>
              <div className="p-8 bg-[#f2f9f5] dark:bg-[#04120c] rounded-4xl text-center mt-8">
                <span className="text-4xl font-black text-emerald-500">
                  100%
                </span>
                <p className="text-[10px] font-bold text-gray-400 uppercase mt-2">
                  Pixel Perfect
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsToolkit;
