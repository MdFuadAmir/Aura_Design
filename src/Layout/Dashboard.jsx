import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaColumns,
  FaProjectDiagram,
  FaUsers,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaCrown,
  FaParagraph,
  FaQuoteLeft,
} from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router";
import DarkMood from "../Utils/DarkMood";
import Logo from "../Utils/Logo";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const handleLogOut = async () => {
    try {
      await logout();
      toast.success("Logged out from the system");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout");
    }
  };

  const menuItems = [
    { name: "Overview", icon: <FaColumns />, path: "/dashboard" },
    {
      name: "Subscribers",
      icon: <FaUsers />,
      path: "/dashboard/manage-subscribers",
    },
    {
      name: "Projects",
      icon: <FaProjectDiagram />,
      path: "/dashboard/manage-projects",
    },
    {
      name: "Pricing Panel",
      icon: <FaCrown />,
      path: "/dashboard/manage-pricing",
    },
    {
      name: "Blog Posts",
      icon: <FaParagraph />,
      path: "/dashboard/manage-blogs",
    },
    {
      name: "Testmonials",
      icon: <FaQuoteLeft />,
      path: "/dashboard/manage-testmonials",
    },

    {
      name: "Inquiries",
      icon: <FaEnvelope />,
      path: "/dashboard/manage-inquires",
    },
    { name: "Settings", icon: <FaCog />, path: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020a07] flex transition-colors duration-500">
      {/* --- SIDEBAR (Desktop) --- */}
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? "280px" : "80px" }}
        className="hidden lg:flex flex-col  bg-[#e0f2e8] dark:bg-[#071c13] border-r border-emerald-500/5 sticky top-0 h-screen z-50 transition-colors"
      >
        <div className="p-6 flex items-center justify-between">
          {isOpen && <Logo />}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-emerald-500 p-2 hover:bg-emerald-500/10 rounded-xl transition-all"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              end
              key={item.name}
              to={item.path}
              // active state check korar logic
              className={({ isActive }) =>
                `flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-500 border-r-4 border-emerald-500"
                    : "text-gray-500 dark:text-emerald-100/30 hover:bg-emerald-500/10 hover:text-emerald-500"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && (
                <span className="text-sm font-bold uppercase tracking-widest">
                  {item.name}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-emerald-500/5">
          <button
            onClick={handleLogOut}
            className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
          >
            <FaSignOutAlt />
            {isOpen && (
              <span className="text-sm font-bold uppercase tracking-widest">
                Logout
              </span>
            )}
          </button>
        </div>
      </motion.aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-20 bg-[#e0f2e8] dark:bg-[#071c13]  border-b border-emerald-500/5 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-40 transition-colors">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenu(true)}
              className="lg:hidden text-emerald-500 text-xl"
            >
              <FaBars />
            </button>
            <h1 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em]">
              Admin Panel
            </h1>
          </div>
          <DarkMood />
        </header>

        {/* Content View */}
        <div className="bg-[#f2f9f5] dark:bg-[#04120c] h-full">
          {/* {children} */}
          <Outlet />
        </div>
      </main>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isMobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenu(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed top-0 left-0 bottom-0 w-70  bg-[#e0f2e8] dark:bg-[#071c13]  z-101 p-6 lg:hidden"
            >
              <div className="flex items-center justify-between mb-10">
                <Logo />
                <button
                  onClick={() => setIsMobileMenu(false)}
                  className="text-emerald-500"
                >
                  <FaTimes />
                </button>
              </div>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <NavLink
                    end
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenu(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-4 p-4 rounded-2xl transition-all ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "text-gray-500 dark:text-emerald-100/30 hover:bg-emerald-500/10 hover:text-emerald-500"
                      }`
                    }
                  >
                    {item.icon}
                    <span className="text-sm font-bold uppercase tracking-widest">
                      {item.name}
                    </span>
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
