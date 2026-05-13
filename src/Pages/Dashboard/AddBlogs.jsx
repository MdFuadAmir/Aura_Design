import { useForm, useWatch } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  FaCloudUploadAlt,
  FaSpinner,
  FaPlusCircle,
  FaTimes,
  FaCode,
} from "react-icons/fa";

import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AddBlogs = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const { register, handleSubmit, reset, setValue, control } = useForm();

  const blogImageFile = useWatch({
    control,
    name: "blogImage",
  });

  const handlePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setValue("blogImage", null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const image = data.blogImage[0];

      if (!image) {
        toast.error("Please select an image");
        setLoading(false);
        return;
      }

      // 1. Cloudinary Upload Logic
      const formData = new FormData();
      formData.append("file", image);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      );

      const hostingURL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

      const res = await axios.post(hostingURL, formData);

      if (res.data?.secure_url) {
        const generatedSlug = data.title
          .toLowerCase()
          .replace(/[^\w ]+/g, "")
          .replace(/ +/g, "-")
          .trim();

        // 2. Prepare Blog Data with Hosted Image URL
        const blogInfo = {
          title: data.title,
          slug: generatedSlug,
          subtitle: data.subtitle,
          excerpt: data.excerpt,
          blogImage: res.data.secure_url,
          category: data.category,
          tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
          author: data.author,
          authorRole: data.authorRole,
          readTime: data.readTime,
          status: "published",
          content: data.content,
          createdAt: new Date().toISOString(),
        };

        // 3. Save to MongoDB
        const blogRes = await axiosSecure.post("/blogs", blogInfo);
        if (blogRes.data.insertedId) {
          toast.success("Blog Published Successfully!");
          reset();
          setPreview(null);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Process failed! Check settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-10 bg-[#f2f9f5] dark:bg-[#04120c] min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex items-center gap-4">
          <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500">
            <FaCode size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase dark:text-white leading-none">
              New <span className="text-emerald-500">Blog Post</span>
            </h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
              Fill out the fields to publish your content
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left Column */}
          <div className="md:col-span-6 lg:col-span-4 space-y-6 flex flex-col md:flex-row lg:flex-col gap-6">
            {/* Image Upload Area */}
            <div className="bg-white dark:bg-[#071c13]/40 p-6 rounded-[2.5rem] border border-emerald-500/10 w-full md:w-1/2 lg:w-full ">
              <label className="text-[11px] font-black uppercase text-emerald-500 mb-4 block text-center">
                Featured Image
              </label>

              <div className="relative h-64 w-full bg-emerald-500/5 border-2 border-dashed border-emerald-500/20 rounded-4xl group">
                {preview ? (
                  <div className="relative w-full h-full p-2">
                    <img
                      src={preview}
                      className="w-full h-full object-cover rounded-3xl"
                      alt="Preview"
                    />
                  
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-2.5 rounded-xl shadow-lg hover:bg-red-600 hover:scale-110 transition-all cursor-pointer z-10 border-4 border-[#f2f9f5] dark:border-[#04120c]"
                      title="Remove Image"
                    >
                      <FaTimes size={14} />
                    </button>
                  </div>
                ) : (
                  /* Upload Placeholder */
                  <div className="relative flex flex-col items-center justify-center h-full p-6 text-center overflow-hidden">
                    <FaCloudUploadAlt className="text-4xl text-emerald-500/20 mb-2" />
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                      Upload Thumbnail
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      {...register("blogImage", {
                        required: true,
                        onChange: (e) => handlePreview(e),
                      })}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Author Info */}
            <div className="bg-white dark:bg-[#071c13]/40 p-6 rounded-[2.5rem] border border-emerald-500/10 space-y-4 w-full md:w-1/2 lg:w-full h-fit">
              <input
                {...register("author", { required: true })}
                placeholder="Author Name"
                className="w-full bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 text-xs dark:text-white focus:outline-none focus:border-emerald-500/40"
              />
              <input
                {...register("authorRole", { required: true })}
                placeholder="Author Role"
                className="w-full bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 text-xs dark:text-white focus:outline-none focus:border-emerald-500/40"
              />
              <input
                {...register("readTime", { required: true })}
                placeholder="Read Time (e.g. 5 min)"
                className="w-full bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 text-xs dark:text-white focus:outline-none focus:border-emerald-500/40"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-6 lg:col-span-8">
            <div className="bg-white dark:bg-[#071c13]/40 p-8 md:p-10 rounded-[3rem] border border-emerald-500/10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-emerald-500 ml-1">
                  Title
                </label>
                <input
                  {...register("title", { required: true })}
                  placeholder="Enter blog title"
                  className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 text-sm dark:text-white focus:outline-none focus:border-emerald-500/40"
                />
              </div>

              <select
                {...register("category", { required: true })}
                className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 text-sm dark:text-white focus:outline-none appearance-none cursor-pointer"
              >
                <option value="" className="dark:bg-[#071c13]">
                  Select Category
                </option>
                <option value="Brand Identity" className="dark:bg-[#071c13]">
                  Brand Identity Design
                </option>
                <option value="Logo Design" className="dark:bg-[#071c13]">
                  Logo & Typography
                </option>
                <option value="Visual Arts" className="dark:bg-[#071c13]">
                  Visual Arts & Illustration
                </option>
                <option value="Print Design" className="dark:bg-[#071c13]">
                  Print & Editorial
                </option>
              </select>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-emerald-500 ml-1">
                  Subtitle
                </label>
                <input
                  {...register("subtitle")}
                  placeholder="A brief catchy subtitle"
                  className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 text-sm dark:text-white focus:outline-none focus:border-emerald-500/40"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-emerald-500 ml-1">
                  Excerpt
                </label>
                <textarea
                  {...register("excerpt", { required: true })}
                  className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 text-sm dark:text-white focus:outline-none h-20 resize-none focus:border-emerald-500/40"
                  placeholder="Short description..."
                ></textarea>
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-emerald-500 ml-1">
                  Tags
                </label>
                <input
                  {...register("tags")}
                  placeholder="Design, Creative, Portfolio"
                  className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 text-sm dark:text-white focus:outline-none focus:border-emerald-500/40"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-emerald-500 ml-1">
                  Full Content
                </label>
                <textarea
                  {...register("content", { required: true })}
                  className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-6 text-sm dark:text-white focus:outline-none h-60 resize-none leading-relaxed focus:border-emerald-500/40"
                  placeholder="Write the main blog content..."
                ></textarea>
              </div>

              {/* Submit Button Logic */}
              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  disabled={
                    loading || !blogImageFile || blogImageFile.length === 0
                  }
                  className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 disabled:bg-gray-400/50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" /> Uploading &
                      Publishing...
                    </>
                  ) : (
                    <>
                      <FaPlusCircle /> Publish Blog
                    </>
                  )}
                </button>
                {(!blogImageFile || blogImageFile.length === 0) && (
                  <p className="text-[9px] text-center mt-2 text-gray-400 uppercase tracking-tighter">
                    Please upload an image to enable publishing
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogs;

// <div className="relative h-64 w-full bg-emerald-500/5 border-2 border-dashed border-emerald-500/20 rounded-4xl overflow-hidden group">
//                 {preview ? (
//                   <>
//                     <img
//                       src={preview}
//                       className="w-full h-full object-cover"
//                       alt="Preview"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setPreview(null);
//                         setValue("blogImage", null);
//                       }}
//                       className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
//                     >
//                       <FaTimes />
//                     </button>
//                   </>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center h-full p-6 text-center">
//                     <FaCloudUploadAlt className="text-4xl text-emerald-500/20 mb-2" />
//                     <span className="text-[9px] font-black text-gray-400 uppercase">
//                       Upload Thumbnail
//                     </span>
//                     <input
//                       type="file"
//                       {...register("blogImage", {
//                         required: true,
//                         onChange: (e) => handlePreview(e),
//                       })}
//                       className="absolute inset-0 opacity-0 cursor-pointer"
//                     />
//                   </div>
//                 )}
//               </div>
