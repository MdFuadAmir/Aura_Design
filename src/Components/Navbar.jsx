import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import DarkMood from "../Utils/DarkMood";
import Logo from "../Utils/Logo";
import CommonButton from "../Shared/CommonButton";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-100 ${
        scrolled
          ? "py-3 bg-white dark:bg-[#020a07] shadow-xl border-b border-emerald-500/10"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-sm font-bold uppercase tracking-widest transition-colors hover:text-emerald-500 ${
                  location.pathname === link.path
                    ? "text-emerald-500"
                    : "dark:text-gray-300 text-gray-600"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-500"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-5 border-l dark:border-emerald-500/20 border-gray-200 pl-6">
            <DarkMood />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-emerald-500 overflow-hidden"
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-2xl text-emerald-500" />
                  )}
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute right-0 mt-4 w-52 bg-white dark:bg-[#04120c] border border-emerald-500/10 rounded-2xl shadow-2xl p-2"
                    >
                      <Link
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-emerald-500/10 rounded-xl transition-colors"
                      >
                        <MdDashboard className="text-emerald-500 text-lg" />{" "}
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <CommonButton
                text="Login"
                to="/login"
                className="py-2.5 px-6 text-[10px]"
              />
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <DarkMood />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="dark:text-emerald-500 text-black focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay to close menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-110"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-70 bg-white dark:bg-[#020a07] shadow-[-10px_0_30px_rgba(0,0,0,0.3)] lg:hidden z-120 flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-10">
                <Logo />
                <FaTimes
                  size={24}
                  className="text-emerald-500"
                  onClick={() => setIsOpen(false)}
                />
              </div>

              <div className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-black uppercase tracking-tighter transition-colors ${
                      location.pathname === link.path
                        ? "text-emerald-500"
                        : "dark:text-white text-slate-800"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="h-px bg-emerald-500/10 my-4" />

                {user ? (
                  <div className="flex flex-col gap-4">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 text-lg font-bold dark:text-white text-slate-800"
                    >
                      <MdDashboard className="text-emerald-500" /> Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-3 text-lg font-bold text-red-500"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                ) : (
                  <CommonButton
                    text="Login"
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full"
                  />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
