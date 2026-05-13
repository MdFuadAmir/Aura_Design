import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";
import { motion } from "framer-motion";
import { FaLock, FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import CommonButton from "../Shared/CommonButton";
import useAuth from "../Hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const marqueeText = "AURA_DESIGN CREATIVE STUDIO • BUILDING DIGITAL SOUL • ";
  const from = location.state?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await login(data.email, data.password);
      const loggedUser = result.user;

      const userInfo = {
        email: loggedUser.email,
        name: loggedUser.displayName || "Admin",
      };

      await axiosSecure.put("/users", userInfo);

      toast.success("Welcome Back, Boss!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Invalid Email or Password!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#f2f9f5] dark:bg-[#020a07] flex items-center justify-center p-6 font-['Sora'] relative overflow-hidden transition-colors duration-500">
      {/* --- Animated Background Marquee --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.05] dark:opacity-[0.03] flex items-center justify-center">
        <div className="-rotate-45 scale-150 flex flex-col gap-8 md:gap-16">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: i % 2 === 0 ? -100 : 0 }}
              animate={{ x: i % 2 === 0 ? 0 : -100 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                repeatType: "mirror",
              }}
              className="flex whitespace-nowrap"
            >
              <h2 className="text-[8vw] font-black uppercase tracking-tighter leading-none text-[#1a1a1a] dark:text-emerald-400">
                {marqueeText.repeat(4)}
              </h2>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/80 dark:bg-[#04120c] backdrop-blur-xl border border-emerald-500/10 p-10 rounded-[3rem] shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">
            Admin <span className="text-emerald-500 italic">Access</span>
          </h2>
          <p className="text-emerald-900/40 dark:text-emerald-100/30 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
            Secure Gateway for Aura Design
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/40 text-sm" />
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="ADMIN EMAIL"
                className="w-full bg-emerald-500/5 dark:bg-[#061a12] border border-emerald-500/10 text-[#1a1a1a] dark:text-white py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:border-emerald-500/50 transition-all text-xs font-bold tracking-widest placeholder:text-emerald-900/30"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-[10px] mt-2 ml-2 font-bold uppercase tracking-tighter">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/40 text-sm" />
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                type="password"
                placeholder="PASSWORD"
                className="w-full bg-emerald-500/5 dark:bg-[#061a12] border border-emerald-500/10 text-[#1a1a1a] dark:text-white py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:border-emerald-500/50 transition-all text-xs font-bold tracking-widest placeholder:text-emerald-900/30"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-[10px] mt-2 ml-2 font-bold uppercase tracking-tighter">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <CommonButton
            text="Authorize Entry"
            type="submit"
            loading={loading}
            className="w-full uppercase font-semibold tracking-[0.2em] text-sm rounded-2xl py-5"
          />
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-emerald-800 dark:text-emerald-900 font-black uppercase tracking-[0.2em]">
            Restricted Area • Authorized Personnel Only
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <CommonButton
            text="Back To Home"
            to="/"
            iconLeft={FaArrowLeft}
            className="text-[10px] rounded-full px-6 opacity-70 hover:opacity-100"
            variant="outline"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
