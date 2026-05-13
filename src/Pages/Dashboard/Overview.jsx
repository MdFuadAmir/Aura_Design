import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

import {
  FaProjectDiagram,
  FaBlog,
  FaUsers,
  FaEnvelope,
  FaEnvelopeOpenText,
  FaStar,
} from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ComponentLoader from "../../Shared/ComponentLoader";

const Overview = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading) return <ComponentLoader />;

  const statsCards = [
    {
      id: 1,
      label: "Total Projects",
      value: stats.projectsCount,
      icon: <FaProjectDiagram />,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      id: 2,
      label: "Total Blogs",
      value: stats.blogsCount,
      icon: <FaBlog />,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      id: 3,
      label: "Subscribers",
      value: stats.subscribersCount,
      icon: <FaUsers />,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      id: 4,
      label: "Total Review",
      value: stats.totalReview,
      icon: <FaStar />,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      id: 5,
      label: "Total Messages",
      value: stats.totalMessages,
      icon: <FaEnvelope />,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      id: 6,
      label: "New Messages",
      value: stats.newMessagesCount,
      icon: <FaEnvelopeOpenText />,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
  ];

  return (
    <div className="p-6 md:p-10">
      <div className="space-y-10 md:p-0">
        <header>
          <h2 className="text-2xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">
            Dashboard <span className="text-emerald-500 italic">Overview</span>
          </h2>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Analysis of your portfolio's performance.
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {statsCards.map((stat) => (
            <motion.div
              key={stat.id}
              whileHover={{ y: -5 }}
              className="p-5 bg-white dark:bg-[#04120c] rounded-3xl border border-emerald-500/5 shadow-sm"
            >
              <div
                className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center text-lg mb-4`}
              >
                {stat.icon}
              </div>
              <h3 className="text-2xl font-black text-[#1a1a1a] dark:text-white tracking-tighter">
                {stat.value || 0}
              </h3>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white dark:bg-[#04120c] rounded-4xl border border-emerald-500/5 overflow-hidden">
          <div className="p-6 border-b border-emerald-500/5 flex justify-between items-center">
            <h3 className="text-xs font-black text-[#1a1a1a] dark:text-white uppercase tracking-widest">
              Recent 5 Inquiries
            </h3>
            <button
              onClick={() => navigate("/dashboard/manage-inquires")}
              className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-emerald-500/5 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                  <th className="px-6 py-4">Sender</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-500/5">
                {stats.recentMessages?.map((msg) => (
                  <tr
                    key={msg._id}
                    onClick={() => navigate("/dashboard/manage-inquires")}
                    className="hover:bg-emerald-500/5 transition-all cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-[#1a1a1a] dark:text-white group-hover:text-emerald-500 transition-colors">
                        {msg.name}
                      </p>
                      <p className="text-[10px] text-gray-400">{msg.email}</p>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 dark:text-emerald-100/40 font-medium">
                      {msg.subject}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 text-[8px] font-black uppercase rounded-full ${
                          msg.status === "unread"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-emerald-500/10 text-emerald-500"
                        }`}
                      >
                        {msg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {stats.recentMessages?.length === 0 && (
              <p className="p-10 text-center text-xs text-gray-500 uppercase font-bold tracking-widest">
                No Recent Messages
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
