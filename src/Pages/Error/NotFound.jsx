
import { Link } from "react-router";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#f2f9f5] dark:bg-[#04120c] flex items-center justify-center px-6 overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[20vw] md:text-[25vw] font-black text-emerald-500/3 dark:text-emerald-500/5 select-none">
          404
        </h1>
      </div>

      <div className="max-w-2xl w-full text-center z-10">
        {/* Animated Icon or Small Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6"
        >
          Page Not Found
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-[#0f1a17] dark:text-[#f2f9f5] leading-tight"
        >
          Lost in the <br />
          <span className="text-[#34d399]">Aura Studio?</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-md mx-auto"
        >
          The page you're looking for has drifted away. Let's get you back to
          the showcase.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="px-8 py-4 bg-[#34d399] hover:bg-[#10b981] text-[#04120c] font-bold rounded-xl transition-all duration-300 shadow-xl shadow-emerald-500/20 inline-block"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
    </div>
  );
};

export default NotFound;
