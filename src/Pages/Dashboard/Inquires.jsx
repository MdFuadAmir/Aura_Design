import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaTrash, FaReply, FaCircle, FaCheckDouble } from "react-icons/fa";
import Swal from "sweetalert2";
import ComponentLoader from "../../Shared/ComponentLoader";
import Pagination from "../../Shared/Pagination";

const Inquiries = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["inquiries"],
    queryFn: async () => {
      const res = await axiosSecure.get("/inquiries");
      return res.data;
    },
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMessages = messages.slice(indexOfFirstItem, indexOfLastItem);

  const handleMarkAsRead = async (id) => {
    try {
      const res = await axiosSecure.patch(`/inquiries/${id}`);
      if (res.data.modifiedCount > 0) {
        queryClient.invalidateQueries(["inquiries"]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMsg = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#04120c",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/inquiries/${id}`);
          if (res.data.deletedCount > 0) {
            queryClient.invalidateQueries(["inquiries"]);
            Swal.fire({
              title: "Deleted!",
              icon: "success",
              background: "#04120c",
              color: "#fff",
              confirmButtonColor: "#10b981",
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const handleReply = async (msg) => {
    const { value: text } = await Swal.fire({
      title: `Reply to ${msg.name}`,
      input: "textarea",
      inputPlaceholder: "Type your message here...",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      background: "#04120c",
      color: "#fff",
    });

    if (text) {
      const replyData = {
        email: msg.email,
        name: msg.name,
        replyMessage: text,
      };
      const res = await axiosSecure.post("/inquiries/reply", replyData);
      if (res.data.success) {
        Swal.fire({
          title: "Sent!",
          icon: "success",
          background: "#04120c",
          color: "#fff",
          confirmButtonColor: "#10b981",
        });
      }
    }
  };

  if (isLoading) return <ComponentLoader />;

  return (
    <div className="p-6 md:p-10 bg-[#f8faf9] dark:bg-[#020a07] min-h-screen transition-colors duration-500">
      <header className="mb-10">
        <h2 className="text-3xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">
          Client{" "}
          <span className="text-emerald-500 italic font-light">Inquiries</span>
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="h-px w-8 bg-emerald-500"></span>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide">
            Showing{" "}
            <span className="text-emerald-500 font-bold">
              {messages.length}
            </span>{" "}
            total messages from potential clients
          </p>
        </div>
      </header>

      <div className="grid gap-6">
        {/* currentMessages map kora hoyeche eikhane */}
        {currentMessages.length > 0 ? (
          currentMessages.map((msg) => (
            <div
              key={msg._id}
              onClick={() =>
                msg.status === "unread" && handleMarkAsRead(msg._id)
              }
              className={`relative group p-6 rounded-3xl border transition-all duration-300 ${
                msg.status === "unread"
                  ? "bg-white dark:bg-[#061a12] border-emerald-500 shadow-lg shadow-emerald-500/10"
                  : "bg-gray-50 dark:bg-[#04120c] border-emerald-500/10 opacity-80"
              }`}
            >
              {msg.status === "unread" && (
                <FaCircle className="absolute top-6 right-6 text-emerald-500 text-[10px] animate-pulse" />
              )}

              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="gap-3 mb-2">
                    <h3
                      className={`font-bold ${msg.status === "unread" ? "text-emerald-500" : "text-gray-400"}`}
                    >
                      {msg.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-4">{msg.email}</p>
                    <p className="flex gap-2 dark:text-gray-300">
                      <span className="font-bold">Subject:</span>
                      <span className="text-emerald-500 rounded-full">
                        {msg.subject}
                      </span>
                    </p>
                    <p className="dark:text-gray-300 mt-2">
                      <span className="font-bold">Message:</span>
                      <span className="text-sm dark:text-gray-300 ml-2">
                        {msg.message}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex md:flex-col items-center justify-center gap-3">
                  {msg.status === "unread" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(msg._id);
                      }}
                      className="p-3 bg-white dark:bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-lg"
                    >
                      <FaCheckDouble size={14} />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReply(msg);
                    }}
                    className="p-3 bg-emerald-500 text-white rounded-2xl hover:scale-110 transition-transform"
                  >
                    <FaReply size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMsg(msg._id);
                    }}
                    className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#04120c] rounded-3xl border border-dashed border-emerald-500/20">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
              <FaCircle className="text-emerald-500/20 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest">
              No <span className="text-emerald-500 italic">Inquiries</span>{" "}
              Found
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Your inbox is currently empty.
            </p>
          </div>
        )}
      </div>

      {/* Pagination Component Context */}
      <Pagination
        totalItems={messages.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Inquiries;
