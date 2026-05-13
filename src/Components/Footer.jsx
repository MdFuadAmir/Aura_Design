import {
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaArrowUp,
  FaPaperPlane,
} from "react-icons/fa";
import Logo from "../Utils/Logo";
import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const axiosPublic = useAxiosPublic();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter a valid email");

    setLoading(true);
    try {
      const res = await axiosPublic.post("/subscribe", { email });

      if (res.data.success) {
        toast.success("Thanks for subscribing! Check your email.");
        setEmail("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#e2f6ed] dark:bg-[#020d08] pt-24 pb-12 transition-colors duration-500 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-6">
            <Logo />
            <p className="text-gray-600 dark:text-emerald-100/40 text-base font-medium max-w-md mb-10 leading-relaxed mt-4">
              Crafting impactful visual identities that bring brands to life.
              Let’s design something unforgettable together.
            </p>

            {/* Newsletter Input */}
            <form onSubmit={handleSubscribe} className="relative max-w-sm">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Join the newsletter"
                className="w-full bg-white dark:bg-[#041a10] border border-emerald-500/10 dark:border-emerald-500/5 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 transition-all text-sm dark:text-white"
              />
              <button
                type="submit"
                disabled={loading}
                title="Subscribe"
                className="absolute right-2 top-2 bottom-2 px-6 bg-emerald-500 text-white rounded-xl hover:bg-[#1a1a1a] dark:hover:bg-white dark:hover:text-[#020d08] transition-all cursor-pointer flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <FaPaperPlane size={14} />
                )}
              </button>
            </form>
          </div>

          {/* Useful Links - Using navLinks array */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-[0.4em] mb-8">
              Navigation
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-sm font-bold text-gray-700 dark:text-emerald-50/40 hover:text-emerald-500 transition-colors uppercase tracking-widest"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Presence */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end">
            <h4 className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-[0.4em] mb-8">
              Social Presence
            </h4>
            <div className="flex gap-3 mb-10">
              {[
                { icon: <FaLinkedinIn />, url: "#" },
                { icon: <FaGithub />, url: "#" },
                { icon: <FaTwitter />, url: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white dark:bg-[#041a10] border border-emerald-500/10 dark:border-emerald-500/5 flex items-center justify-center text-gray-600 dark:text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all duration-500 shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-4 bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#1a1a1a] dark:hover:bg-white dark:hover:text-black transition-all shadow-xl shadow-emerald-500/20 group cursor-pointer"
            >
              Back to Top{" "}
              <FaArrowUp className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Legal & Status */}
        <div className="pt-10 border-t border-emerald-500/10 dark:border-emerald-500/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-gray-500 dark:text-emerald-100/30 uppercase tracking-[0.3em]">
            © {currentYear} — Md Fuad Amir — HANDCRAFTED WITH PRECISION
          </p>

          <div className="flex items-center gap-6">
            <a
              href="mailto:mdfuadamir@gmail.com"
              className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest hover:underline transition-all"
            >
              mdfuadamir@gmail.com
            </a>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <span className="text-[9px] font-black text-gray-500 dark:text-emerald-100/30 uppercase tracking-widest underline decoration-emerald-500/20">
                Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
