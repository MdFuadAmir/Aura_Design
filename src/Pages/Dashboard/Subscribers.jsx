import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaTrash,
  FaUserShield,
  FaEnvelopeOpenText,
  FaCalendarAlt,
} from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Pagination from "../../Shared/Pagination";
import ComponentLoader from "../../Shared/ComponentLoader";
import Swal from "sweetalert2";

const Subscribers = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: subscribers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/subscribers");
      return res.data;
    },
  });

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentSubscribers = subscribers.slice(firstIndex, lastIndex);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this subscriber? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: document.documentElement.classList.contains("dark")
        ? "#061a12"
        : "#ffffff",
      color: document.documentElement.classList.contains("dark")
        ? "#ecfdf5"
        : "#1a1a1a",
      customClass: {
        popup: "rounded-[2rem] border border-emerald-500/10 shadow-2xl",
        confirmButton:
          "rounded-xl font-bold uppercase tracking-widest text-[10px] px-6 py-3",
        cancelButton:
          "rounded-xl font-bold uppercase tracking-widest text-[10px] px-6 py-3",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/subscribers/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Subscriber has been removed.",
              icon: "success",
              confirmButtonColor: "#10b981",
              background: document.documentElement.classList.contains("dark")
                ? "#061a12"
                : "#ffffff",
              color: document.documentElement.classList.contains("dark")
                ? "#ecfdf5"
                : "#1a1a1a",
            });
            refetch();
          }
        } catch {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete subscriber.",
            icon: "error",
            confirmButtonColor: "#ef4444",
          });
        }
      }
    });
  };
  if (isLoading) return <ComponentLoader />;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col p-4 lg:p-8"
    >
      {/* --- Minimal Header --- */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 px-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-500">
            <FaUserShield size={20} />
            <h2 className="text-xl font-black uppercase tracking-tighter dark:text-white">
              Subscribers
            </h2>
          </div>
          <p className="text-[9px] font-bold text-gray-400 dark:text-emerald-500/40 uppercase tracking-[0.5em]">
            Database management system
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="text-[10px] font-black bg-emerald-500/10 text-emerald-600 px-4 py-2 rounded-lg border border-emerald-500/10 uppercase tracking-widest">
            {subscribers.length} total users
          </span>
        </div>
      </div>

      {/* --- Professional Minimal Table --- */}
      <div className="flex-1 bg-white dark:bg-transparent border border-gray-100 dark:border-emerald-500/10 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto ">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#071c13]/30 border-b border-gray-100 dark:border-emerald-500/10">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-emerald-500/60 w-20">
                  No.
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-emerald-500/60">
                  Email Context
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-emerald-500/60">
                  Subscription Date
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-emerald-500/60 text-right">
                  Operation
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-emerald-500/5">
              {currentSubscribers.length > 0 ? (
                currentSubscribers.map((sub, index) => (
                  <tr
                    key={sub._id}
                    className="hover:bg-gray-50/50 dark:hover:bg-emerald-500/2 transition-all"
                  >
                    <td className="px-6 py-5 text-[11px] font-bold text-gray-400">
                      {(currentPage - 1) * itemsPerPage + index + 1 < 10
                        ? `0${(currentPage - 1) * itemsPerPage + index + 1}`
                        : (currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <FaEnvelopeOpenText
                          className="text-gray-300 dark:text-emerald-500/20"
                          size={14}
                        />
                        <span className="text-[13px] font-medium text-gray-700 dark:text-emerald-50/70">
                          {sub.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-gray-500 dark:text-emerald-100/30">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt
                          size={10}
                          className="text-emerald-500/30"
                        />
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                          {new Date(sub.createdAt).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => handleDelete(sub._id)}
                        className="p-2.5 text-gray-300 hover:text-red-500 dark:hover:bg-red-500/10 rounded-lg transition-all cursor-pointer group"
                        title="Delete Entry"
                      >
                        <FaTrash
                          size={12}
                          className="group-hover:scale-110 transition-transform"
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-20 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]"
                  >
                    No subscribers found in database
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Pagination Footer --- */}
      <div className="mt-auto py-6">
        <Pagination
          totalItems={subscribers.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </motion.div>
  );
};

export default Subscribers;
