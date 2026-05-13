import { motion } from "framer-motion";
import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const BlogCard = ({ blog, index }) => {
  const { _id, title, excerpt, blogImage, category, author, createdAt } = blog;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative bg-white dark:bg-[#081d14] rounded-4xl overflow-hidden border border-emerald-500/10 shadow-md hover:shadow-emerald-500/10 transition-shadow duration-300 h-full flex flex-col"
    >
      {/* Image Container - Simplified effects */}
      <div className="relative h-60 overflow-hidden bg-emerald-900/10">
        <img
          src={blogImage}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#061a12]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-5 left-5">
          <span className="px-3 py-1 rounded-lg bg-emerald-500/90 backdrop-blur-md text-white font-bold text-[9px] uppercase tracking-widest shadow-xl">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col grow">
        <div className="flex items-center gap-4 text-[9px] font-bold text-gray-400 dark:text-emerald-500/50 uppercase tracking-widest mb-3">
          <span className="flex items-center gap-1.5">
            <FaCalendarAlt />
            {new Date(createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <FaUser /> {author.split(" ")[0]} {/* Shortened for space */}
          </span>
        </div>

        <h3 className="text-xl font-black text-gray-800 dark:text-white mb-3 leading-snug transition-colors duration-300 group-hover:text-emerald-500 line-clamp-2">
          <Link to={`/blog/${_id}`}>{title}</Link>
        </h3>

        <p className="text-sm text-gray-500 dark:text-emerald-100/30 leading-relaxed mb-6 grow line-clamp-3">
          {excerpt}
        </p>

        {/* Action Button - Simplified with minimal animation */}
        <div className="pt-4 border-t border-emerald-500/5">
          <Link
            to={`/blog/${_id}`}
            className="flex items-center justify-between group/btn text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400"
          >
            <span>Read Full Story</span>
            <div className="p-2 rounded-full bg-emerald-500/5 group-hover/btn:bg-emerald-500 group-hover/btn:text-white transition-all duration-300">
              <FaArrowRight size={10} />
            </div>
          </Link>
        </div>
      </div>

      {/* Luxury Border Hover Effect - Very Light on CPU */}
      <div className="absolute inset-0 border-2 border-emerald-500/0 group-hover:border-emerald-500/20 rounded-4xl transition-colors duration-300 pointer-events-none" />
    </motion.article>
  );
};

export default BlogCard;
