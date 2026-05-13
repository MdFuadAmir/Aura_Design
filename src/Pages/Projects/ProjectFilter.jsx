import { motion } from "framer-motion";

const categories = [
  "All Projects",
  "Brand Identity",
  "Web Design",
  "UI/UX Design",
  "Graphics Design",
];

const ProjectFilter = ({ activeCategory, setActiveCategory }) => {
  return (
    <nav className="w-full pt-6 md:pt-10 pb-2 md:pb-4 bg-[#f2f9f5] dark:bg-[#04120c] border-b border-emerald-500/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-start md:justify-center gap-6 md:gap-10 overflow-x-auto no-scrollbar pb-4 md:pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="relative group py-2 shrink-0 focus:outline-none cursor-pointer"
            >
              <span
                className={`text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                  activeCategory === category
                    ? "text-emerald-500"
                    : "text-gray-400 hover:text-[#1a1a1a] dark:hover:text-white"
                }`}
              >
                {category}
              </span>

              {/* Active Indicator Line */}
              {activeCategory === category && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `,
        }}
      />
    </nav>
  );
};

export default ProjectFilter;
