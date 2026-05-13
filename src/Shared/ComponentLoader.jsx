import { motion } from "framer-motion";

const ComponentLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 w-full bg-transparent">
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute w-10 h-10 border-4 border-emerald-500/5 border-t-emerald-400 rounded-full"
        />

        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute w-2 h-2 bg-emerald-500 rounded-full"
        />
      </div>

      <span className="mt-6 text-xs font-bold uppercase tracking-widest text-emerald-500/80">
        Syncing Data
      </span>
    </div>
  );
};

export default ComponentLoader;
