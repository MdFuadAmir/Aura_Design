import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import CommonButton from "../../Shared/CommonButton";
import BlogCard from "../../Shared/BlogCard";

const LatestBlog = () => {
  const axiosPublic = useAxiosPublic();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["latest-blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs");
      return res.data;
    },
  });

  const latestBlogs = blogs
    .filter((blog) => blog.status === "published")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  if (isLoading) return null;

  return (
    <section className="py-24 bg-[#f2f9f5] dark:bg-[#04120c] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="max-w-xl text-center md:text-left">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-emerald-500 font-black text-xs uppercase tracking-[0.5em] mb-4 block"
            >
              Insights & News
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-[#1a1a1a] dark:text-white tracking-tighter leading-[0.9]"
            >
              Latest from <br />
              <span className="italic text-emerald-500">The Blog.</span>
            </motion.h2>
          </div>

          <div className="hidden md:block">
            <CommonButton
              text="View All Posts"
              iconRight={FaArrowRight}
              to={"/blog"}
              variant="outline"
            />
          </div>
        </div>

        {/* Blog Grid - Using Reusable Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map((blog, i) => (
            <BlogCard key={blog._id} blog={blog} index={i} />
          ))}
        </div>

        {/* Mobile Button */}
        <div className="block md:hidden mt-12">
          <div className="flex justify-center">
            <CommonButton
              text="View All Posts"
              iconRight={FaArrowRight}
              to={"/blog"}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
