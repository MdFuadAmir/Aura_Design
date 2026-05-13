import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import CommonButton from "../../Shared/CommonButton";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const Pricing = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data: pricingData = [], isLoading } = useQuery({
    queryKey: ["pricing-plans"],
    queryFn: async () => {
      const res = await axiosPublic.get("/pricing");
      return res.data;
    },
  });

  if (isLoading) return null;
  return (
    <section className="py-24 bg-[#f2f9f5] dark:bg-[#020a07]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-[#1a1a1a] dark:text-white tracking-tighter uppercase mb-4">
            Our <span className="text-emerald-500 italic">Investment</span>{" "}
            Plans
          </h2>
          <p className="text-gray-500 dark:text-emerald-100/30 font-medium max-w-lg mx-auto">
            Choose the perfect plan that fits your business needs and start
            building your dream project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {pricingData.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-10 rounded-[3.5rem] border flex flex-col transition-all duration-500 ${
                plan.isPopular
                  ? "border-emerald-500 shadow-[0_20px_50px_rgba(52,211,153,0.15)] bg-linear-to-b from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-[#04120c] z-10 scale-105"
                  : "border-emerald-500/10 bg-white dark:bg-[#04120c]"
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg shadow-emerald-500/30">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter mb-2 text-center">
                {plan.title}
              </h3>

              <p className="text-xs text-gray-400 font-medium uppercase text-center mb-6">
                {plan.desc}
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black text-[#1a1a1a] dark:text-white tracking-tighter">
                  ${plan.price}
                </span>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  / project
                </span>
              </div>

              <div className="space-y-4 mb-10 grow">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FaCheckCircle className="text-emerald-500 text-sm mt-1 shrink-0" />
                    <span className="text-sm font-medium text-gray-600 dark:text-emerald-100/70 leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                {/* <CommonButton
                  text="Get Started Now"
                  onClick={() =>
                  navigate("/contact", {
                    state: {
                      message:
                        "I would like to start a project with Aura Design Studio!",
                    },
                  })
                }
                  variant={plan.isPopular ? "primary" : "outline"}
                  className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${
                    plan.isPopular
                      ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/40 hover:bg-emerald-600"
                      : "hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                  }`}
                /> */}
                <CommonButton
  text="Get Started Now"
  onClick={() => {
    // একটি সুন্দর ফরম্যাটেড মেসেজ তৈরি করা
    const formattedMessage = `Project Inquiry for ${plan.title.toUpperCase()} Plan
    
Investment: $${plan.price} / project
Plan Details: ${plan.desc}

Selected Features:
${plan.features.map((f) => `• ${f}`).join("\n")}

I would like to start this project with Aura Design Studio!`;

    navigate("/contact", {
      state: {
        message: formattedMessage,
      },
    });
  }}
  variant={plan.isPopular ? "primary" : "outline"}
  className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${
    plan.isPopular
      ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/40 hover:bg-emerald-600"
      : "hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
  }`}
/>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
