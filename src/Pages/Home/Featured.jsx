import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ComponentLoader from "../../Shared/ComponentLoader";
import CommonButton from "../../Shared/CommonButton";
import ProjectCard from "../../Shared/ProjectCard";

const Featured = () => {
  const axiosSecure = useAxiosSecure();

  const { data: projectsData, isLoading } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: async () => {
      const res = await axiosSecure.get("/projects");
      return res.data;
    },
  });
  if (isLoading) return <ComponentLoader />;
  const latestPublishedProjects =
    projectsData?.projects
      ?.filter((project) => project.status === "Published")
      ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      ?.slice(0, 3) || [];

  return (
    <section className="py-24 bg-[#f2f9f5] dark:bg-[#04120c] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-[0.4em] mb-4"
            >
              Selected Works
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-[#1a1a1a] dark:text-white tracking-tighter"
            >
              Featured{" "}
              <span className="italic text-emerald-500">Projects.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="w-fit hidden md:block"
          >
            <CommonButton
              text="View All Projects"
              to={"/projects"}
              iconRight={FaArrowRight}
              variant="outline"
            />
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPublishedProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="block md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center w-full mt-12"
          >
            <CommonButton
              text="View All Projects"
              to={"/projects"}
              iconRight={FaArrowRight}
              className="rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
