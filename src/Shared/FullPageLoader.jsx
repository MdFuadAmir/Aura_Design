import { motion } from "framer-motion";
import Logo from "../Utils/Logo";

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-white dark:bg-[#020a07]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="mb-8"
      >
        <Logo />
      </motion.div>
      <div className="w-48 h-1 bg-gray-200 dark:bg-emerald-900/30 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ left: "-100%" }}
          animate={{ left: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 bg-emerald-500 shadow-[0_0_15px_#10b981]"
        />
      </div>

      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/60 animate-pulse">
        Initializing Aura...
      </p>
    </div>
  );
};

export default FullPageLoader;
