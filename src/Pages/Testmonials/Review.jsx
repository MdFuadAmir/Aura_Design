import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCloudUploadAlt, FaStar, FaCircleNotch } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Review = () => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [rating, setRating] = useState(0); 
  const [hover, setHover] = useState(0);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const imgbb_api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    if (rating === 0) return toast.warning("Please select a rating star!");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      const imgRes = await axios.post(imgbb_api, formData);
      const imageUrl = imgRes.data.data.display_url;

      const finalData = {
        name: data.name,
        email: data.email,
        role: data.role,
        text: data.text,
        rating: rating,
        image: imageUrl,
      };

      const res = await axiosSecure.post("/testimonials", finalData);

      if (res.data.insertedId) {
        toast.success("Review submitted! Check your email.");
        reset();
        setPreviewImage(null);
        setRating(0);
      }
    } catch {
      toast.error("Failed to process request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 md:py-28 min-h-screen bg-[#f2f9f5] dark:bg-[#04120c]">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tighter dark:text-white">
            Client <span className="text-emerald-500">Review</span>
          </h2>
          <p className="text-[10px] font-bold text-gray-400 dark:text-emerald-500/40 uppercase tracking-[0.5em] mt-2">
            Experience Matters
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Left: Image & Rating */}
          <div className="lg:col-span-4 flex flex-col items-center space-y-8">
            <div className="relative group w-full max-w-64 aspect-square">
              <div
                className={`w-full h-full rounded-3xl border-2 border-dashed transition-all overflow-hidden flex flex-col items-center justify-center 
                ${errors.image ? "border-red-500 bg-red-50" : "border-emerald-500/20 bg-emerald-500/5 group-hover:border-emerald-500/40"}`}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6 text-emerald-500 opacity-40">
                    <FaCloudUploadAlt size={40} className="mx-auto mb-2" />
                    <p className="text-[9px] font-black uppercase tracking-widest">
                      Profile Photo
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  {...register("image", { required: "Photo is required" })}
                  onChange={handleImagePreview}
                  className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
              </div>
              {errors.image && (
                <p className="text-[9px] text-red-500 font-bold text-center mt-2 uppercase">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Star Rating System */}
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-3">
                Rate Your Experience
              </p>
              <div className="flex gap-2">
                {[...Array(5)].map((_, index) => {
                  const currentRating = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        className="hidden"
                        value={currentRating}
                        onClick={() => setRating(currentRating)}
                      />
                      <FaStar
                        size={24}
                        className="cursor-pointer transition-colors"
                        color={
                          currentRating <= (hover || rating)
                            ? "#10b981"
                            : "#e4e5e9"
                        }
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(0)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Form Details */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                  Full Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className={`w-full bg-white dark:bg-[#071c13]/40 border rounded-xl px-5 py-3.5 outline-none dark:text-white transition-all ${errors.name ? "border-red-500" : "border-emerald-500/10 focus:border-emerald-500"}`}
                  placeholder="Md Fuad Amir"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                  Email Address
                </label>
                <input
                  {...register("email", { required: "Email is required" })}
                  className={`w-full bg-white dark:bg-[#071c13]/40 border rounded-xl px-5 py-3.5 outline-none dark:text-white transition-all ${errors.email ? "border-red-500" : "border-emerald-500/10 focus:border-emerald-500"}`}
                  placeholder="fuad@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                Designation / Role
              </label>
              <input
                {...register("role", { required: "Role is required" })}
                className={`w-full bg-white dark:bg-[#071c13]/40 border rounded-xl px-5 py-3.5 outline-none dark:text-white transition-all ${errors.role ? "border-red-500" : "border-emerald-500/10 focus:border-emerald-500"}`}
                placeholder="CEO at Nexora"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                Your Story
              </label>
              <textarea
                {...register("text", {
                  required: "Testimonial text is required",
                  minLength: 10,
                })}
                rows={5}
                className={`w-full bg-white dark:bg-[#071c13]/40 border rounded-2xl px-5 py-4 outline-none dark:text-white resize-none transition-all ${errors.text ? "border-red-500" : "border-emerald-500/10 focus:border-emerald-500"}`}
                placeholder="How was your experience working with me?"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-black text-[11px] uppercase tracking-[0.3em] py-5 rounded-2xl transition-all flex items-center justify-center gap-3 cursor-pointer
                ${loading ? "bg-gray-200 dark:bg-[#0a2419] text-gray-400" : "bg-emerald-500 text-white hover:bg-black dark:hover:bg-white dark:hover:text-black shadow-xl shadow-emerald-500/20"}`}
            >
              {loading ? (
                <>
                  <FaCircleNotch className="animate-spin" />
                  Uploading Review...
                </>
              ) : (
                <>
                  Submit Feedback <FaStar size={12} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Review;
