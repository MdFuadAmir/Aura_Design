import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  FaPlus,
  FaTrash,
  FaCheckCircle,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ComponentLoader from "../../Shared/ComponentLoader";

const planStructure = [
  { key: "plan1", defaultTitle: "Essential" },
  { key: "plan2", defaultTitle: "Professional" },
  { key: "plan3", defaultTitle: "Enterprise" },
];

const ManagePricing = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editedPlans, setEditedPlans] = useState({});

  const { data: dbPricing = [], isLoading } = useQuery({
    queryKey: ["manage-pricing"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pricing");
      return res.data;
    },
  });

  const plans = useMemo(() => {
    return planStructure.map((struct) => {
      const existing =
        editedPlans[struct.key] ||
        dbPricing.find((p) => p.planKey === struct.key);

      return (
        existing || {
          planKey: struct.key,
          title: struct.defaultTitle,
          price: "0",
          desc: "",
          features: [""],
          isPopular: struct.key === "plan2",
        }
      );
    });
  }, [dbPricing, editedPlans]);

  const handleInputChange = (pIdx, field, value) => {
    const plan = plans[pIdx];

    setEditedPlans((prev) => ({
      ...prev,
      [plan.planKey]: {
        ...plan,
        [field]: value,
      },
    }));
  };

  const addFeature = (pIdx) => {
    const plan = plans[pIdx];

    setEditedPlans((prev) => ({
      ...prev,
      [plan.planKey]: {
        ...plan,
        features: [...plan.features, ""],
      },
    }));
  };

  const removeFeature = (pIdx, fIdx) => {
    const plan = plans[pIdx];

    if (plan.features.length > 1) {
      const updatedFeatures = plan.features.filter(
        (_, index) => index !== fIdx,
      );

      setEditedPlans((prev) => ({
        ...prev,
        [plan.planKey]: {
          ...plan,
          features: updatedFeatures,
        },
      }));
    }
  };

  const handleSave = async (plan) => {
    try {
      const res = await axiosSecure.put("/pricing-manage", plan);
      if (res.data.modifiedCount > 0 || res.data.upsertedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: `${plan.title} updated successfully`,
          icon: "success",
          background: "#04120c",
          color: "#fff",
          confirmButtonColor: "#10b981",
        });
        queryClient.invalidateQueries(["manage-pricing"]);
      }
    } catch {
      Swal.fire("Error!", "Failed to update pricing.", "error");
    }
  };

  if (isLoading) return <ComponentLoader />;

  return (
    <div className="p-4 md:p-10 bg-[#f8faf9] dark:bg-[#020a07] min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h2 className="text-2xl font-black text-[#1a1a1a] dark:text-white uppercase tracking-tighter">
            Pricing <span className="text-emerald-500 italic">Management</span>
          </h2>
          <p className="text-gray-500 dark:text-emerald-100/20 text-xs font-bold uppercase tracking-widest mt-2">
            Configure your investment tiers using dynamic titles
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, pIdx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={plan.planKey}
              className={`relative flex flex-col bg-white dark:bg-[#04120c] rounded-[2.5rem] border ${plan.isPopular ? "border-emerald-500" : "border-emerald-500/10"} shadow-xl overflow-hidden`}
            >
              {/* Card Header */}
              <div className="p-8 pb-0">
                <div className="flex justify-between items-center mb-6">
                  <input
                    className="bg-transparent text-2xl font-black text-emerald-500 uppercase outline-none w-2/3 border-b border-transparent focus:border-emerald-500/30 transition-all"
                    value={plan.title}
                    onChange={(e) =>
                      handleInputChange(pIdx, "title", e.target.value)
                    }
                    placeholder="Enter Title"
                  />
                  {/* Popular Toggle */}
                  <button
                    onClick={() =>
                      handleInputChange(pIdx, "isPopular", !plan.isPopular)
                    }
                    className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter transition-all ${plan.isPopular ? "bg-emerald-500 text-white" : "bg-gray-200 dark:bg-[#020a07] text-gray-400"}`}
                  >
                    {plan.isPopular ? "Popular" : "Set Popular"}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">
                      Price Tag ($)
                    </label>
                    <input
                      type="text"
                      value={plan.price}
                      onChange={(e) =>
                        handleInputChange(pIdx, "price", e.target.value)
                      }
                      className="w-full bg-[#f2f9f5] dark:bg-[#020a07] border border-emerald-500/10 p-4 rounded-2xl dark:text-white font-bold outline-none focus:border-emerald-500/40"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">
                      Short Description
                    </label>
                    <textarea
                      value={plan.desc}
                      onChange={(e) =>
                        handleInputChange(pIdx, "desc", e.target.value)
                      }
                      className="w-full bg-[#f2f9f5] dark:bg-[#020a07] border border-emerald-500/10 p-4 rounded-2xl dark:text-white text-sm h-20 resize-none outline-none focus:border-emerald-500/40"
                    />
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="p-8 grow">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                    Included Features
                  </label>
                  <button
                    onClick={() => addFeature(pIdx)}
                    className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all"
                  >
                    <FaPlus size={10} />
                  </button>
                </div>

                <div
                  id={`feature-container-${pIdx}`}
                  className="space-y-3 max-h-52 overflow-y-auto pr-2 custom-scrollbar"
                >
                  <AnimatePresence>
                    {plan.features.map((feature, fIdx) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={`${plan.planKey}-${fIdx}`}
                        className="flex items-center gap-2 group"
                      >
                        <FaCheckCircle
                          className="text-emerald-500 shrink-0"
                          size={12}
                        />
                        <input
                          value={feature}
                          onChange={(e) => {
                            const plan = plans[pIdx];
                            const updatedFeatures = [...plan.features];
                            updatedFeatures[fIdx] = e.target.value;

                            setEditedPlans((prev) => ({
                              ...prev,
                              [plan.planKey]: {
                                ...plan,
                                features: updatedFeatures,
                              },
                            }));
                          }}
                          className="flex-1 bg-transparent border-b border-transparent group-hover:border-emerald-500/20 py-1 text-sm dark:text-gray-300 outline-none focus:border-emerald-500/40"
                        />
                        <button
                          onClick={() => removeFeature(pIdx, fIdx)}
                          className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 transition-all"
                        >
                          <FaTrash size={10} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-8 pt-0 mt-auto">
                <button
                  onClick={() => handleSave(plan)}
                  className="w-full group bg-[#1a1a1a] dark:bg-emerald-500 hover:bg-emerald-600 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl shadow-emerald-500/10"
                >
                  <FaCloudUploadAlt className="text-lg group-hover:scale-125 transition-transform" />
                  Update {plan.title}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #10b98133; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #10b981; }
      `,
        }}
      />
    </div>
  );
};

export default ManagePricing;
