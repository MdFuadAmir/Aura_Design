import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUserCircle,
  FaClock,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ComponentLoader from "../../Shared/ComponentLoader";
import CommonButton from "../../Shared/CommonButton";
import SEO from "../../Utils/SEO";

const ProjectDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/projects/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <ComponentLoader />;
  if (isError)
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Project Not Found!
      </div>
    );

  const {
    title,
    subtitle,
    category,
    clientName,
    description,
    challenge,
    solution,
    toolsUsed,
    duration,
    role,
    projectLink,
    projectgallery = [],
    createdAt,
  } = project;

  return (
    <div className="min-h-screen bg-[#f2f9f5] dark:bg-[#04120c] py-24 px-6 ">
      <SEO
        title={`${project?.title} | Project Detail`}
        description={
          project?.subtitle ||
          "Detailed overview of my design and development execution."
        }
        image={project?.projectgallery[0]}
        url={`/project/${project?.id}`}
      />
      <div className="max-w-6xl mx-auto">
        {/* Back Button & Header */}
        <div className="mb-12">
          <Link
            to={-1}
            className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest mb-8 hover:gap-4 transition-all"
          >
            <FaArrowLeft /> Back to Projects
          </Link>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-emerald-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4"
          >
            {category}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-[#1a1a1a] dark:text-white mb-6 leading-tight tracking-tighter"
          >
            {title}
            <span className="text-emerald-500">.</span>
          </motion.h1>

          <p className="text-lg text-gray-500 dark:text-gray-400 italic max-w-3xl border-l-2 border-emerald-500/30 pl-6">
            {subtitle}
          </p>
        </div>

        {/* Dynamic Image Gallery Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectgallery.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`group overflow-hidden rounded-2xl md:rounded-[2.5rem] border border-emerald-500/20 shadow-2xl w-full md:h-100 
          `}
              >
                <img
                  src={img}
                  alt={`${title} - ${idx}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </section>
        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          {/* Detailed Description */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-2xl font-black text-[#1a1a1a] dark:text-white mb-6 flex items-center gap-4">
                <span className="w-12 h-1 bg-emerald-500 rounded-full"></span>
                The Brief
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-xl">
                {description}
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 bg-white dark:bg-[#071c13] rounded-[2.5rem] border border-emerald-500/5 shadow-xl">
                <h3 className="text-emerald-500 font-black mb-4 uppercase tracking-widest text-xs">
                  The Challenge
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {challenge}
                </p>
              </div>
              <div className="p-10 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-[2.5rem] border border-emerald-500/20">
                <h3 className="text-emerald-500 font-black mb-4 uppercase tracking-widest text-xs">
                  The Solution
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {solution}
                </p>
              </div>
            </div>
          </div>

          {/* Project Meta Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 p-10 bg-white dark:bg-[#071c13] rounded-[3rem] border border-emerald-500/10 shadow-2xl">
              <h3 className="text-xl font-black text-[#1a1a1a] dark:text-white mb-8">
                Project Insights
              </h3>

              <div className="space-y-8">
                <InfoItem
                  icon={<FaUserCircle />}
                  label="Client"
                  value={clientName}
                />
                <InfoItem
                  icon={<FaClock />}
                  label="Duration"
                  value={duration}
                />
                <InfoItem icon={<FaCheckCircle />} label="Role" value={role} />
                <InfoItem
                  icon={<FaCalendarAlt />}
                  label="Completed"
                  value={new Date(createdAt).toLocaleDateString("en-GB", {
                    month: "long",
                    year: "numeric",
                  })}
                />

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {toolsUsed?.map((tool) => (
                      <span
                        key={tool}
                        className="px-4 py-1.5 bg-gray-100 dark:bg-emerald-500/5 text-gray-600 dark:text-emerald-400 text-[10px] font-black rounded-xl border border-gray-200 dark:border-emerald-500/10"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <CommonButton
                    to={projectLink}
                    text="Visit Project"
                    iconRight={FaExternalLinkAlt}
                    className="w-full rounded-xl"
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

// Reusable Sub-component
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 text-emerald-500 text-lg">{icon}</div>
    <div>
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
        {label}
      </p>
      <p className="text-sm font-bold text-[#1a1a1a] dark:text-emerald-50">
        {value}
      </p>
    </div>
  </div>
);

export default ProjectDetails;
