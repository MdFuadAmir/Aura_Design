import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import BlogCard from "../../Shared/BlogCard";
import ComponentLoader from "../../Shared/ComponentLoader";
import Pagination from "../../Shared/Pagination";

const ArticleGrid = () => {
  const axiosPublic = useAxiosPublic();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: blogsData, isLoading } = useQuery({
    queryKey: ["all-articles", currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs");
      const publishedBlogs = res.data.filter(
        (blog) => blog.status === "published",
      );

      return {
        allBlogs: publishedBlogs,
        total: publishedBlogs.length,
      };
    },
    keepPreviousData: true,
  });

  if (isLoading) {
    return <ComponentLoader />;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs =
    blogsData?.allBlogs?.slice(indexOfFirstItem, indexOfLastItem) || [];

  return (
    <section className="py-24 bg-[#f2f9f5] dark:bg-[#04120c] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">
              The Knowledge Base
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-[#1a1a1a] dark:text-white tracking-tighter uppercase leading-none">
              Latest <span className="italic text-emerald-500">Articles.</span>
            </h2>
          </div>
          <p className="text-gray-400 dark:text-emerald-100/20 text-sm font-medium max-w-xs md:text-right">
            Deep dives into design systems, development workflows, and creative
            strategy by Fuad Amir.
          </p>
        </div>

        {/* Grid Layout using BlogCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          <AnimatePresence mode="popLayout">
            {currentBlogs.map((blog, index) => (
              <motion.div
                layout
                key={blog._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
              >
                <BlogCard blog={blog} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Blogs Found State */}
        {currentBlogs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 uppercase font-black tracking-widest">
              No articles found at the moment.
            </p>
          </div>
        )}

        {/* Custom Pagination Integration */}
        {blogsData?.total > itemsPerPage && (
          <div className="mt-24">
            <Pagination
              totalItems={blogsData.total}
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

export default ArticleGrid;
