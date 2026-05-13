import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  FaTrashAlt,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
} from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import Pagination from "../../Shared/Pagination";
import ComponentLoader from "../../Shared/ComponentLoader";

const ManageTestmonials = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: testimonials = [], refetch,isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await axiosSecure.get("/testimonials");
      return res.data;
    },
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTestimonials = testimonials.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/testimonials/${id}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0) {
        toast.success(`Status updated to ${newStatus} successfully!`, {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    const proceed = window.confirm(
      "Are you sure you want to delete this review?",
    );

    if (proceed) {
      axiosSecure
        .delete(`/testimonials/${id}`)
        .then((res) => {
          if (res.data.deletedCount > 0) {
            toast.success("Review deleted successfully!", {
              position: "top-right",
              autoClose: 2000,
            });
            refetch();
          }
        })
        .catch((error) => {
          toast.error("Failed to delete the review");
          console.error(error);
        });
    }
  };

  if(isLoading){
    return <ComponentLoader/>
  }

  return (
    <div className="p-6 lg:p-10 bg-[#f2f9f5] dark:bg-[#04120c] min-h-screen">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black uppercase dark:text-white">
            Manage <span className="text-emerald-500">Testimonials</span>
          </h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Total Reviews: {testimonials.length}
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white dark:bg-[#071c13]/40 border border-emerald-500/10 rounded-2xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-emerald-500/10 bg-emerald-500/5 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Role & Rating</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-500/5">
            {currentTestimonials.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-emerald-500/5 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      className="w-10 h-10 rounded-full object-cover border border-emerald-500/20"
                      alt=""
                    />
                    <div>
                      <p className="text-sm font-bold dark:text-white leading-none">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1">
                        {item.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm dark:text-gray-300">
                  <p className="font-medium">{item.role}</p>
                  <div className="flex text-amber-400 text-[10px] mt-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border ${
                      item.status === "active"
                        ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5"
                        : item.status === "pending"
                          ? "text-amber-500 border-amber-500/20 bg-amber-500/5"
                          : "text-red-500 border-red-500/20 bg-red-50"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    {/* Active/Inactive Toggle */}
                    {item.status !== "active" ? (
                      <button
                        onClick={() => handleStatusUpdate(item._id, "active")}
                        className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-all"
                        title="Approve"
                      >
                        <FaCheckCircle size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusUpdate(item._id, "inactive")}
                        className="p-2 text-amber-500 hover:bg-amber-500/10 rounded-lg transition-all"
                        title="Deactivate"
                      >
                        <FaTimesCircle size={16} />
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedReview(item)}
                      className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all"
                      title="View Detail"
                    >
                      <FaEye size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                      title="Delete"
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalItems={testimonials.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* View Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#071c13] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative border border-emerald-500/20">
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            >
              ✕
            </button>

            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={selectedReview.image}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                  alt=""
                />
                <div>
                  <h3 className="text-xl font-black dark:text-white">
                    {selectedReview.name}
                  </h3>
                  <p className="text-emerald-500 text-xs font-bold uppercase tracking-wider">
                    {selectedReview.role}
                  </p>
                </div>
              </div>

              <div className="bg-emerald-500/5 p-5 rounded-2xl mb-6 italic text-sm dark:text-gray-300 border border-emerald-500/5">
                "{selectedReview.text}"
              </div>

              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <p>
                  Date:{" "}
                  {new Date(selectedReview.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-1 text-amber-400">
                  {[...Array(selectedReview.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTestmonials;
