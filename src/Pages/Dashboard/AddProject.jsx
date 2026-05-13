import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import CommonButton from "../../Shared/CommonButton";
import imageCompression from "browser-image-compression";

const InputLabel = ({ label }) => (
  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-2 block">
    {label}
  </label>
);

const AddProject = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const handleImageUpload = async (e, index) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    setUploadingImage(true);

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);

      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      );

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      );

      if (res.data.secure_url) {
        const newUrl = res.data.secure_url;
        const newUrls = [...uploadedUrls];
        newUrls[index] = newUrl;
        setUploadedUrls(newUrls);
      }
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire("Error", "Cloudinary upload failed", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = (index) => {
    const newUrls = [...uploadedUrls];
    newUrls.splice(index, 1);
    setUploadedUrls(newUrls.filter(Boolean));
  };

  const onSubmit = async (data) => {
    if (uploadedUrls.length === 0) {
      return Swal.fire(
        "Warning",
        "Please upload at least one image",
        "warning",
      );
    }
    setLoading(true);
    try {
      const generatedSlug = data.title
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-")
        .trim();
      const projectData = {
        ...data,
        slug: generatedSlug,
        toolsUsed: data.toolsUsed
          ? data.toolsUsed.split(",").map((t) => t.trim())
          : [],
        tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
        projectgallery: uploadedUrls,
        status: "Published",
        createdAt: new Date(),
      };

      const result = await axiosSecure.post("/projects", projectData);
      if (result.data.insertedId) {
        Swal.fire({
          title: "Project Published!",
          icon: "success",
          background: "#061a12",
          color: "#fff",
          confirmButtonColor: "#10b981",
        });
        reset();
        setUploadedUrls([]);
      }
    } catch {
      Swal.fire("Error", "Failed to save project", "error");
    } finally {
      setLoading(false);
    }
  };

  const commonInputClass = `w-full bg-white dark:bg-[#071c13] border border-gray-300 dark:border-emerald-500/20 rounded-xl px-5 py-4 text-sm text-gray-800 dark:text-emerald-50 outline-none focus:border-emerald-500 transition-all duration-300 placeholder:text-gray-500 dark:placeholder:text-emerald-500/40`;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 bg-[#f2f9f5] dark:bg-[#04120c] min-h-screen">
      <div className="bg-white dark:bg-[#061a12] p-6 md:p-10 rounded-3xl border border-emerald-500/5 shadow-2xl">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
            Add New <span className="text-emerald-500">Project</span>
          </h2>
          <div className="h-1 w-20 bg-emerald-500 mt-2 rounded-full"></div>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Input Fields Row 1 */}
          <div>
            <InputLabel label="Project Title" />
            <input
              {...register("title", { required: true })}
              className={commonInputClass}
              placeholder="e.g. Lunexa Branding"
            />
          </div>

          <div>
            <InputLabel label="Subtitle" />
            <input
              {...register("subtitle", { required: true })}
              className={commonInputClass}
              placeholder="A short catchphrase..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <InputLabel label="Category" />
              <select {...register("category")} className={commonInputClass}>
                <option value="Brand Identity">Brand Identity</option>
                <option value="Web Design">Web Design</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Graphics">Graphics Design</option>
              </select>
            </div>
            <div>
              <InputLabel label="Client Name" />
              <input
                {...register("clientName")}
                className={commonInputClass}
                placeholder="Client Name"
              />
            </div>
          </div>

          <div>
            <InputLabel label="Description" />
            <textarea
              {...register("description")}
              rows="4"
              className={`${commonInputClass} resize-none`}
              placeholder="Details..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <InputLabel label="The Challenge" />
              <textarea
                {...register("challenge")}
                rows="3"
                className={`${commonInputClass} resize-none`}
                placeholder="Challenges..."
              />
            </div>
            <div>
              <InputLabel label="The Solution" />
              <textarea
                {...register("solution")}
                rows="3"
                className={`${commonInputClass} resize-none`}
                placeholder="Solutions..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <InputLabel label="Tools" />
              <input
                {...register("toolsUsed")}
                className={commonInputClass}
                placeholder="Figma, AI"
              />
            </div>
            <div>
              <InputLabel label="Duration" />
              <input
                {...register("duration")}
                className={commonInputClass}
                placeholder="2 Weeks"
              />
            </div>
            <div>
              <InputLabel label="Role" />
              <input
                {...register("role")}
                className={commonInputClass}
                placeholder="Designer"
              />
            </div>
            <div>
              <InputLabel label="Live Link" />
              <input
                {...register("projectLink")}
                className={commonInputClass}
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <InputLabel label="Tags" />
            <input
              {...register("tags")}
              className={commonInputClass}
              placeholder="luxury, clean"
            />
          </div>

          {/* Sequential Gallery Upload Section */}
          <div>
            <InputLabel label="Project Gallery (4 Images - Sequential & Fast)" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {[0, 1, 2, 3].map((idx) => {
                const url = uploadedUrls[idx];
                const isLocked = idx > uploadedUrls.length;

                return (
                  <div
                    key={idx}
                    className={`relative h-32 w-full group ${isLocked ? "opacity-40" : "opacity-100"}`}
                  >
                    {url ? (
                      <div className="relative h-full w-full rounded-xl overflow-hidden border-2 border-emerald-500 shadow-lg">
                        <img
                          src={url}
                          className="h-full w-full object-cover"
                          alt="preview"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full"
                        >
                          <FaTimes size={10} />
                        </button>
                      </div>
                    ) : (
                      <label
                        className={`flex flex-col items-center justify-center h-full rounded-xl border-2 border-dashed transition-all duration-300 
                        ${isLocked ? "border-gray-500 cursor-not-allowed" : "border-emerald-500/20 hover:border-emerald-500 cursor-pointer bg-gray-50 dark:bg-[#071c13]"}`}
                      >
                        {uploadingImage && idx === uploadedUrls.length ? (
                          <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-500 mb-1"></div>
                            <span className="text-[8px] text-emerald-500 animate-pulse">
                              Compressing...
                            </span>
                          </div>
                        ) : (
                          <>
                            <FaCloudUploadAlt
                              className={`text-xl ${isLocked ? "text-gray-500" : "text-gray-400 group-hover:text-emerald-500"}`}
                            />
                            <span className="text-[9px] font-bold uppercase mt-1 text-gray-400">
                              {isLocked ? "Locked" : `Upload ${idx + 1}`}
                            </span>
                          </>
                        )}
                        <input
                          type="file"
                          disabled={isLocked || uploadingImage}
                          onChange={(e) => handleImageUpload(e, idx)}
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10">
            <CommonButton
              text="Publish Project"
              type="submit"
              loading={loading || uploadingImage}
              disabled={loading || uploadingImage}
              variant="primary"
              className="w-full h-14 rounded-xl font-bold uppercase tracking-widest"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
