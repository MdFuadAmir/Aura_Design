import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import { useLocation } from "react-router";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const state = location.state;
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!state) return;
    // CASE 1
    if (state.message) {
      setValue("message", state.message);
      return;
    }
  }, [state, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const contactData = {
        ...data,
        status: "unread",
        createdAt: new Date(),
      };
      const response = await axiosPublic.post("/contact", contactData);

      if (response.status === 200) {
        toast.success("Message sent successfully!");
        reset();
      }
    } catch {
      toast.error("Somthing is Worng");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-form"
      className="py-24 bg-[#f2f9f5] dark:bg-[#04120c] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Left Side: Brief & Info */}
          <div className="lg:col-span-5">
            <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">
              The Gateway
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-[#1a1a1a] dark:text-white tracking-tighter leading-none mb-8">
              HAVE A SPECIFIC <br />
              <span className="italic text-emerald-500">INQUIRY?</span>
            </h2>
            <p className="text-gray-500 dark:text-emerald-100/30 text-lg font-medium leading-relaxed mb-12">
              If you have any project ideas or questions, send me a direct
              message. I usually try to reply within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  Email me directly
                </span>
                <a
                  href="mailto:mdfuadamir@gmail.com"
                  className="text-xl font-bold text-[#1a1a1a] dark:text-white hover:text-emerald-500 transition-colors"
                >
                  mdfuadamir@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-[#1a1a1a] dark:text-white uppercase tracking-widest ml-2">
                    Full Name
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    placeholder="John Doe"
                    className={`bg-gray-50 dark:bg-[#061a12] border ${errors.name ? "border-red-500" : "border-emerald-500/10"} focus:border-emerald-500 rounded-2xl px-6 py-4 outline-none transition-all dark:text-white`}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-[10px] font-bold uppercase tracking-tighter ml-2">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-[#1a1a1a] dark:text-white uppercase tracking-widest ml-2">
                    Email Address
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    placeholder="john@example.com"
                    className={`bg-gray-50 dark:bg-[#061a12] border ${errors.email ? "border-red-500" : "border-emerald-500/10"} focus:border-emerald-500 rounded-2xl px-6 py-4 outline-none transition-all dark:text-white`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-[10px] font-bold uppercase tracking-tighter ml-2">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-[#1a1a1a] dark:text-white uppercase tracking-widest ml-2">
                  Subject
                </label>
                <input
                  {...register("subject", { required: "Subject is required" })}
                  type="text"
                  placeholder="Project Discussion"
                  className={`bg-gray-50 dark:bg-[#061a12] border ${errors.subject ? "border-red-500" : "border-emerald-500/10"} focus:border-emerald-500 rounded-2xl px-6 py-4 outline-none transition-all dark:text-white`}
                />
                {errors.subject && (
                  <span className="text-red-500 text-[10px] font-bold uppercase tracking-tighter ml-2">
                    {errors.subject.message}
                  </span>
                )}
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-[#1a1a1a] dark:text-white uppercase tracking-widest ml-2">
                  Your Message
                </label>
                <textarea
                  {...register("message", {
                    required: "Please enter your message",
                  })}
                  rows="8"
                  placeholder="Tell me about your project..."
                  className={`bg-gray-50 dark:bg-[#061a12] border ${errors.message ? "border-red-500" : "border-emerald-500/10"} focus:border-emerald-500 rounded-2xl px-6 py-4 outline-none transition-all dark:text-white resize-none`}
                />
                {errors.message && (
                  <span className="text-red-500 text-[10px] font-bold uppercase tracking-tighter ml-2">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit Button & Status */}
              <div className="flex flex-col md:flex-row items-center gap-6 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-10 py-5 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] rounded-full font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-emerald-500 dark:hover:bg-emerald-500 dark:hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <FaPaperPlane />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
