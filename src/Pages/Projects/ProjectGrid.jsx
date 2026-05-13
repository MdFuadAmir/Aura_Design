import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ProjectFilter from "./ProjectFilter";
import ProjectCard from "../../Shared/ProjectCard";
import Pagination from "../../Shared/Pagination";

const ProjectGrid = () => {
  const axiosSecure = useAxiosSecure();

  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: projectsData, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/projects`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
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
      </div>
    );

  const filteredProjects =
    projectsData?.projects?.filter((project) => {
      const isPublished = project.status === "Published";
      const categoryMatch =
        activeCategory === "All Projects" ||
        project.category === activeCategory;

      return isPublished && categoryMatch;
    }) || [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <section className="bg-[#f2f9f5] dark:bg-[#04120c] min-h-screen transition-colors duration-500">
      <ProjectFilter
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {currentProjects.map((project, index) => (
              <motion.div
                layout
                key={project._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* যদি ফিল্টার করার পর কোনো প্রজেক্ট না থাকে */}
        {currentProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 italic">
              No published projects found for "{activeCategory}".
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredProjects.length > itemsPerPage && (
          <div className="mt-20">
            <Pagination
              totalItems={filteredProjects.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectGrid;
