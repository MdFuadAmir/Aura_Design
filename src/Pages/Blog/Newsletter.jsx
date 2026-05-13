import { motion } from "framer-motion";
import { FaPaperPlane, FaShieldHalved } from "react-icons/fa6";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import { toast } from "react-toastify";

const Newsletter = () => {
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
  return (
    <section className="py-24 bg-[#f2f9f5] dark:bg-[#04120c] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white dark:bg-[#061a12] rounded-[3.5rem] p-8 md:p-20 border border-emerald-500/5 shadow-2xl shadow-emerald-500/5 overflow-hidden"
        >
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full -ml-32 -mb-32" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div>
              <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">
                The Growth Hub
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-[#1a1a1a] dark:text-white tracking-tighter leading-none mb-8">
                Join the <br />
                <span className="italic text-emerald-500">Inner Circle.</span>
              </h2>
              <p className="text-gray-500 dark:text-emerald-100/40 text-base md:text-lg font-medium leading-relaxed max-w-md">
                Once a week, all the best design tips, coding tricks, and
                exclusive resources delivered straight to your inbox. No spam,
                just value.
              </p>

              <div className="mt-10 flex items-center gap-3 text-[10px] font-bold text-gray-400 dark:text-emerald-500/40 uppercase tracking-widest">
                <FaShieldHalved className="text-emerald-500" />
                Your data is safe. Unsubscribe anytime.
              </div>
            </div>

            {/* Form Side */}
            <div className="relative">
              <form
                onSubmit={handleSubscribe}
                className="relative flex flex-col gap-4"
              >
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-gray-50 dark:bg-[#0a2318] border border-emerald-500/10 focus:border-emerald-500/40 rounded-3xl px-8 py-6 text-sm font-medium outline-none transition-all dark:text-white placeholder:text-gray-400 dark:placeholder:text-emerald-100/10"
                  />
                  <button
                    disabled={loading}
                    className="absolute right-3 top-3 bottom-3 px-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl flex items-center gap-3 transition-all group-hover:shadow-lg group-hover:shadow-emerald-500/20 active:scale-95"
                  >
                    {loading ? (
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <p className="flex items-center gap-2">
                        {" "}
                        <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">
                          Subscribe
                        </span>
                        <FaPaperPlane className="text-sm" />
                      </p>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
