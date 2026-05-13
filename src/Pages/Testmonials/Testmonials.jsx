import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaPlus,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import CommonButton from "../../Shared/CommonButton";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const axiosPublic = useAxiosPublic();
  const [selectedReview, setSelectedReview] = useState(null);

  const { data: allReviews = [], isLoading } = useQuery({
    queryKey: ["activeTestimonials"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/testimonials`);
      return res.data.filter((item) => item.status === "active");
    },
  });

  const next = () => setIndex((prev) => (prev + 1) % allReviews.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + allReviews.length) % allReviews.length);

  if (isLoading)
    return (
      <div className="py-20 text-center text-emerald-500 font-bold">
        Loading Testimonials...
      </div>
    );
  if (allReviews.length === 0) return null;

  const currentReview = allReviews[index];

  return (
    <section className="py-24 bg-[#f2f9f5] dark:bg-[#04120c] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Section Info */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-emerald-500 font-black text-xs uppercase tracking-[0.5em] mb-4 block"
            >
              Testimonials
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black text-[#1a1a1a] dark:text-white tracking-tighter leading-[0.9] mb-8"
            >
              What My <br />
              <span className="italic text-emerald-500">Clients Say.</span>
            </motion.h2>

            <p className="text-gray-500 dark:text-emerald-100/40 font-medium max-w-sm mx-auto lg:mx-0 mb-10 hidden lg:block text-sm">
              Trusted by startups and established brands worldwide to deliver
              excellence in visual storytelling.
            </p>

            <div className="hidden lg:flex gap-4">
              <button
                onClick={prev}
                className="w-14 h-14 rounded-full border border-emerald-500/20 flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={next}
                className="w-14 h-14 rounded-full border border-emerald-500/20 flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
              >
                <FaChevronRight />
              </button>

              <CommonButton
                text="Share Feedback"
                to={"/submit-review"}
                className="rounded-full"
                iconLeft={FaPlus}
              />
            </div>
          </div>

          {/* Review Card & Mobile Controls */}
          <div className="lg:col-span-7 relative">
            <div className="relative min-h-105 md:min-h-112 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview?._id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full bg-white dark:bg-[#061a12] p-8 md:p-14 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl shadow-emerald-900/5 border border-emerald-500/10 relative"
                >
                  <FaQuoteLeft className="text-4xl md:text-5xl text-emerald-500/10 absolute top-8 left-8" />

                  {/* Dynamic Stars based on rating */}
                  <div className="flex gap-1 mb-6 justify-center lg:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${i < currentReview?.rating ? "text-emerald-500" : "text-gray-200 dark:text-gray-800"} text-xs`}
                      />
                    ))}
                  </div>

                  {/* Reduced Text Size for cleaner look */}
                  {/* <p className="text-base md:text-xl font-bold text-[#1a1a1a] dark:text-white leading-relaxed mb-10 text-center lg:text-left italic">
                    "{currentReview?.text}"
                  </p> */}
                  {/* Review Text with Read More logic */}
                  <div className="mb-10 text-center lg:text-left">
                    <p className="text-base md:text-xl font-bold text-[#1a1a1a] dark:text-white leading-relaxed">
                      "
                      {currentReview?.text?.length > 160 ? (
                        <>
                          {currentReview.text.slice(0, 160)}...
                          <button
                            onClick={() => setSelectedReview(currentReview)}
                            className="ml-2 text-emerald-500 font-black uppercase text-[10px] tracking-widest hover:underline cursor-pointer"
                          >
                            Read More
                          </button>
                        </>
                      ) : (
                        currentReview?.text
                      )}
                      "
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-5 justify-center lg:justify-start">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden rotate-3 shadow-lg border-2 border-emerald-500/20">
                      <img
                        src={currentReview?.image}
                        alt={currentReview?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center lg:text-left">
                      <h4 className="text-base font-semibold text-[#1a1a1a] dark:text-white uppercase">
                        {currentReview?.name}
                      </h4>
                      <p className="text-[9px] font-bold text-emerald-500 tracking-[0.2em] uppercase">
                        {currentReview?.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Mobile/MD Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 lg:hidden">
                <div className="flex gap-4">
                  <button
                    onClick={prev}
                    className="w-12 h-12 rounded-full border border-emerald-500/20 flex items-center justify-center text-emerald-500 bg-white dark:bg-[#061a12]"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={next}
                    className="w-12 h-12 rounded-full border border-emerald-500/20 flex items-center justify-center text-emerald-500 bg-white dark:bg-[#061a12]"
                  >
                    <FaChevronRight />
                  </button>
                </div>
                <CommonButton
                  text="Share Your Feedback"
                  to={"/submit-review"}
                  className="rounded-full"
                  iconLeft={FaPlus}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedReview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-999 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-[#071c13] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative border border-emerald-500/20 p-8"
          >
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              ✕
            </button>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedReview.image}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                alt=""
              />
              <div>
                <h3 className="text-xl font-black dark:text-white">
                  {selectedReview.name}
                </h3>
                <p className="text-emerald-500 text-xs font-bold uppercase tracking-wider">
                  {selectedReview.role}
                </p>
              </div>
            </div>
            <div className="bg-emerald-500/5 p-5 rounded-2xl mb-6  text-sm dark:text-gray-300 border border-emerald-500/5 leading-loose">
              "{selectedReview.text}"
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <p>
                Date: {new Date(selectedReview.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-1 text-amber-400">
                {[...Array(selectedReview.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
