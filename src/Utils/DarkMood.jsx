/* eslint-disable react-hooks/set-state-in-effect */
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdModeNight } from "react-icons/md";

const DarkMood = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const root = document.documentElement;

    root.classList.add("theme-transition");

    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    root.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);

    setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 500);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      className="
    relative
    w-10 h-10
    flex items-center justify-center
    rounded-xl
    /* Hero section-er background-er sathe mil rekhe */
    bg-emerald-500/10 dark:bg-[#061a12] 
    /* Hero-r shapes-er moto  color */
    border border-emerald-500/20 dark:border-emerald-500/10
    hover:border-emerald-500/50
    backdrop-blur-xl shadow-lg overflow-hidden
    transition-all duration-300
  "
    >
      {/* subtle emerald glow - Hero shapes-er vibe-e */}
      <span className="absolute inset-0 bg-emerald-500/5 blur-md"></span>

      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            key="light"
            initial={{ opacity: 0, scale: 0.6, rotate: -60, y: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, rotate: 60, y: -10 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            /* Hero text-er emerald green color */
            className="text-[#34d399] text-xl z-10"
          >
            <CiLight />
          </motion.div>
        ) : (
          <motion.div
            key="dark"
            initial={{ opacity: 0, scale: 0.6, rotate: 60, y: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, rotate: -60, y: -10 }}
            transition={{ duration: 0.3, ease: "backOut" }}
            /* Light mode-e dark forest green vibe */
            className="text-emerald-800 text-xl z-10"
          >
            <MdModeNight />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default DarkMood;
