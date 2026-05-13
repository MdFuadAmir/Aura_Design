import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import {
  FaPlus,
  FaTrashAlt,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Pagination from "../../Shared/Pagination";
import Swal from "sweetalert2";
import ComponentLoader from "../../Shared/ComponentLoader";

const ManageBlogs = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: blogs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blogs");
      return res.data;
    },
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstItem, indexOfLastItem);

  const handleStatusUpdate = async (id, currentStatus) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    try {
      const res = await axiosSecure.patch(`/blogs/${id}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0) {
        toast.success(`Blog status updated to ${newStatus}`);
        refetch();
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this story!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "#071c13",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/blogs/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              toast.success("Article removed from database.");
              refetch();
            }
          })
          .catch(() => {
            toast.error("Something went wrong!");
          });
      }
    });
  };

  if (isLoading) return <ComponentLoader />;

  return (
    <div className="p-6 lg:p-10 bg-[#f2f9f5] dark:bg-[#04120c] min-h-screen">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase dark:text-white">
            Manage <span className="text-emerald-500">Blogs</span>
          </h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
            Total Stories Published: {blogs.length}
          </p>
        </div>

        <Link
          to="/dashboard/add-blog"
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 w-fit"
        >
          <FaPlus /> Add New Blog
        </Link>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white dark:bg-[#071c13]/40 border border-emerald-500/10 rounded-4xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-emerald-500/10 bg-emerald-500/5 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              <th className="px-6 py-5">Blog Content</th>
              <th className="px-6 py-5">Category</th>
              <th className="px-6 py-5">Author</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-500/5">
            {currentBlogs.map((blog) => (
              <tr
                key={blog._id}
                className="hover:bg-emerald-500/5 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={blog.blogImage}
                      className="w-16 h-12 rounded-xl object-cover border border-emerald-500/10"
                      alt=""
                    />
                    <div className="max-w-50 md:max-w-xs">
                      <p className="text-sm font-bold dark:text-white truncate">
                        {blog.title}
                      </p>
                      <p className="text-[9px] text-gray-400 flex items-center gap-1 mt-1 font-bold">
                        <FaCalendarAlt size={8} className="text-emerald-500" />{" "}
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-black text-gray-500 dark:text-emerald-500/60 uppercase tracking-tighter">
                    {blog.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold dark:text-white">
                      {blog.author}
                    </span>
                    <span className="text-[8px] text-emerald-500 uppercase font-black">
                      {blog.authorRole}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-[8px] font-black uppercase px-3 py-1 rounded-lg border ${
                      blog.status === "published"
                        ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5"
                        : "text-amber-500 border-amber-500/20 bg-amber-500/5"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => handleStatusUpdate(blog._id, blog.status)}
                      className={`p-2.5 rounded-xl transition-all ${blog.status === "published" ? "text-amber-500 hover:bg-amber-500/10" : "text-emerald-500 hover:bg-emerald-500/10"}`}
                      title="Toggle Status"
                    >
                      {blog.status === "published" ? (
                        <FaTimesCircle size={14} />
                      ) : (
                        <FaCheckCircle size={14} />
                      )}
                    </button>
                    <button
                      onClick={() => setSelectedBlog(blog)}
                      className="p-2.5 text-blue-500 hover:bg-blue-500/10 rounded-xl transition-all"
                    >
                      <FaEye size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="p-2.5 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                      <FaTrashAlt size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <Pagination
          totalItems={blogs.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* View Details Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-999 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#071c13] w-full max-w-3xl rounded-[3rem] overflow-hidden shadow-2xl relative border border-emerald-500/20 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-6 right-6 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-all z-10"
            >
              ✕
            </button>

            <img
              src={selectedBlog.blogImage}
              className="w-full h-72 object-cover"
              alt=""
            />

            <div className="p-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-[9px] font-black bg-emerald-500 text-white px-4 py-1.5 rounded-full uppercase tracking-widest">
                  {selectedBlog.category}
                </span>
                <span className="text-[9px] font-bold text-gray-400 uppercase flex items-center gap-2">
                  <FaCalendarAlt className="text-emerald-500" />{" "}
                  {new Date(selectedBlog.createdAt).toDateString()}
                </span>
                <span className="text-[9px] font-bold text-gray-400 uppercase">
                  {selectedBlog.readTime}
                </span>
              </div>

              <h3 className="text-3xl font-black dark:text-white mb-2 leading-tight uppercase tracking-tighter">
                {selectedBlog.title}
              </h3>
              <p className="text-emerald-500 font-bold text-xs mb-6 uppercase tracking-widest">
                {selectedBlog.subtitle}
              </p>

              <div className="space-y-4 text-sm text-gray-600 dark:text-emerald-100/70 leading-relaxed whitespace-pre-wrap">
                {selectedBlog.content}
              </div>

              <div className="mt-10 pt-6 border-t border-emerald-500/10 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 font-black">
                  {selectedBlog.author.slice(0, 1)}
                </div>
                <div>
                  <h4 className="text-sm font-black dark:text-white uppercase leading-none">
                    {selectedBlog.author}
                  </h4>
                  <p className="text-[9px] font-bold text-emerald-500 mt-1 uppercase tracking-widest">
                    {selectedBlog.authorRole}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;
