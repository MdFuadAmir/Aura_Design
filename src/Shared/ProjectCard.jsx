import { FaCalendarAlt, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const ProjectCard = ({ project }) => {
  const {
    title,
    category,
    projectgallery,
    toolsUsed,
    status,
    createdAt,
    subtitle,
    projectLink,
  } = project;

  return (
    <div className="group relative bg-white dark:bg-[#0d1117] rounded-3xl overflow-hidden border border-gray-100 dark:border-emerald-500/10 hover:shadow-2xl hover:shadow-emerald-500/10">
      {/* Image Wrapper */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={projectgallery[0]}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Tag */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 dark:bg-emerald-500/20 backdrop-blur-md text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-lg shadow-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
            <FaCalendarAlt size={10} className="text-emerald-500" />
            {new Date(createdAt).toLocaleDateString("en-GB", {
              month: "short",
              year: "numeric",
            })}
          </div>
          <span
            className={`h-2 w-2 rounded-full ${status === "Published" ? "bg-emerald-500" : "bg-amber-500"} animate-pulse`}
            title={status}
          />
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-emerald-500 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
          {subtitle}
        </p>

        {/* Tools Section - Minimalist Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {toolsUsed?.slice(0, 3).map((tool, index) => (
            <span
              key={index}
              className="text-[9px] bg-gray-100 dark:bg-emerald-500/5 text-gray-600 dark:text-emerald-300/70 px-2 py-0.5 rounded-md border border-gray-200 dark:border-emerald-500/10"
            >
              {tool}
            </span>
          ))}
        </div>

        <hr className="border-gray-100 dark:border-emerald-500/5 mb-4" />

        {/* Action Section - No big button */}
        <div className="flex items-center justify-between">
          <Link
            to={`/project-details/${project._id}`}
            className="flex items-center gap-2 text-xs font-bold text-emerald-500 hover:text-emerald-600 transition-all group/link"
          >
            VIEW CASE STUDY
            <FaArrowRight
              className="group-hover/link:translate-x-1"
              size={10}
            />
          </Link>

          <a
            href={projectLink}
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-emerald-500"
          >
            <FaExternalLinkAlt size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
