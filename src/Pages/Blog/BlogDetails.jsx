import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router";
import { FaCalendarAlt, FaRegClock, FaArrowLeft } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { motion } from "framer-motion";
import ComponentLoader from "../../Shared/ComponentLoader";
import SEO from "../../Utils/SEO";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/blogs/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f2f9f5] dark:bg-[#04120c]">
        <ComponentLoader />
      </div>
    );
  }

  if (!blog)
    return (
      <div className="text-center py-20 dark:text-white">Blog not found!</div>
    );

  return (
    <div className="bg-[#f2f9f5] dark:bg-[#04120c] md:min-h-screen py-24 transition-colors duration-500">
      <SEO
        title={`${blog?.title} | Blog`}
        description={
          blog?.subtitle ||
          "Deep dive into web development and visual design insights."
        }
        url={`/blog/${blog?.id}`}
      />
      {/* Navigation Header */}
      <div className="max-w-4xl mx-auto px-6">
        <Link
          to={-1}
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
          Back to Insights
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-6 mt-6">
        {/* Blog Header Info */}
        <header className="mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-emerald-500 text-white font-bold text-[10px] uppercase tracking-widest mb-6 shadow-lg shadow-emerald-500/20"
          >
            {blog.category}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-[#1a1a1a] dark:text-white tracking-tighter leading-[1.1] mb-6"
          >
            {blog.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl font-medium text-emerald-600/80 dark:text-emerald-400/80 italic mb-8"
          >
            "{blog.subtitle}"
          </motion.p>

          <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-y border-emerald-500/10 py-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px]">
                {blog.author?.charAt(0)}
              </div>
              <span className="dark:text-emerald-100">{blog.author}</span>
            </div>
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="text-emerald-500" />{" "}
              {new Date(blog.createdAt).toDateString()}
            </span>
            <span className="flex items-center gap-2">
              <FaRegClock className="text-emerald-500" /> {blog.readTime} Read
            </span>
          </div>
        </header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative h-75 md:h-125 rounded-4xl overflow-hidden mb-16 shadow-2xl"
        >
          <img
            src={blog.blogImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Blog Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="flex gap-10 flex-col md:flex-row">
            {/* Sidebar info (Optional) */}
            <aside className="md:w-1/4 ">
              <div className="sticky top-24 space-y-8">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-4">
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-bold dark:text-emerald-100/40 border border-emerald-500/10 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-4">
                    Role
                  </h4>
                  <p className="text-[10px] font-bold dark:text-white uppercase">
                    {blog.authorRole}
                  </p>
                </div>
              </div>
            </aside>

            {/* Main Content Body */}
            <div className="md:w-3/4">
              <p className="text-xl font-medium text-gray-600 dark:text-emerald-100/60 leading-relaxed mb-8 first-letter:text-5xl first-letter:font-black first-letter:text-emerald-500 first-letter:mr-3 first-letter:float-left">
                {blog.excerpt}
              </p>
              <div
                className="text-gray-700 dark:text-emerald-50/80 leading-[1.8] text-lg space-y-6 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetails;
