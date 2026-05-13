import { motion } from "framer-motion";
import { FaLayerGroup } from "react-icons/fa";
import { Link } from "react-router";

const ProjectNotFound = () => {
  return (
    <section className="py-24 bg-[#f2f9f5] dark:bg-[#04120c] transition-colors duration-500 overflow-hidden flex items-center justify-center min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          {/* Top Badge */}
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-[0.3em] border border-emerald-500/20">
            Case Study Missing
          </span>

          {/* Floating Icon Container */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-24 h-24 mx-auto mt-10 mb-8 bg-white dark:bg-[#061a12] rounded-[2.5rem] border border-emerald-500/10 shadow-2xl shadow-emerald-900/10 flex items-center justify-center relative"
          >
            <div className="absolute -top-5 -right-5 w-16 h-16 bg-emerald-500/5 rounded-full blur-2xl" />
            <FaLayerGroup className="text-4xl text-emerald-500" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black text-[#1a1a1a] dark:text-white leading-[0.95] tracking-tighter">
            Project Out of <br />
            <span className="text-emerald-500 italic">Sight.</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 dark:text-emerald-100/50 leading-relaxed mb-12">
            The masterpiece you're looking for is either private or under a
            scheduled maintenance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/projects"
              className="px-10 py-4 bg-emerald-500 text-white dark:text-[#04120c] font-black rounded-full shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all duration-300"
            >
              Back to Portfolio
            </Link>

            <Link
              to="/contact"
              className="px-10 py-4 border-2 border-emerald-500/20 text-[#1a1a1a] dark:text-white font-bold rounded-full hover:bg-emerald-500/5 transition-all duration-300"
            >
              Contact Me
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectNotFound;
