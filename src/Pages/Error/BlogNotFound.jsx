import { motion } from "framer-motion";
import { FaBookOpen, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const BlogNotFound = () => {
  return (
    <section className="py-24 bg-[#f2f9f5] dark:bg-[#04120c] transition-colors duration-500 overflow-hidden flex items-center justify-center min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          {/* Top Badge */}
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-[0.3em] border border-emerald-500/20">
            Article Missing
          </span>

          {/* Icon with Glow */}
          <div className="relative w-20 h-20 mx-auto mt-10 mb-8 flex items-center justify-center bg-white dark:bg-[#061a12] rounded-3xl border border-emerald-500/10 shadow-xl shadow-emerald-900/5 group">
            <div className="absolute inset-0 bg-emerald-500/5 rounded-3xl blur-xl" />
            <FaBookOpen className="text-3xl text-emerald-500 relative z-10" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-[#1a1a1a] dark:text-white leading-[0.95] tracking-tighter">
            Story Not <br />
            <span className="text-emerald-500 italic">Available.</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 dark:text-emerald-100/50 leading-relaxed mb-12">
            The blog post you are looking for has been moved or doesn't exist anymore in our creative library.
          </p>

          {/* CTA Link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white dark:text-[#04120c] font-black rounded-full shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all duration-300 group"
          >
            Read Other Blogs
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogNotFound;