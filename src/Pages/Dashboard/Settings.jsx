import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FaUser,
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaUserCog,
  FaLocationArrow,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import CommonButton from "../../Shared/CommonButton";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { updateProfile } from "firebase/auth";
import ChangePassword from "./ChangePassword";

const Settings = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [updating, setUpdating] = useState(false);

  const { data: profileData, refetch } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile/${user?.email}`);
      return res.data.data;
    },
  });

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (profileData) {
      reset({
        name: profileData.name || "",
        phone: profileData.phone || "",
        address: profileData.address || "",
        email: profileData.email || "",
      });
    }
  }, [profileData, reset]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData,
      );
      if (res.data.success) {
        setUploadedImage(res.data.data.display_url);
        toast.success("Image uploaded!");
      }
    } catch {
      toast.error("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    setUpdating(true);
    try {
      const updatedData = {
        name: data.name,
        phone: data.phone,
        address: data.address,
        photoURL: uploadedImage || profileData?.photoURL,
      };

      const res = await axiosSecure.patch(
        `/users/update-profile/${user.email}`,
        updatedData,
      );
      if (res.data.success) {
        await updateProfile(user, {
          displayName: data.name,
          photoURL: updatedData.photoURL,
        });
        toast.success("Profile updated successfully!");
        refetch();
      }
    } catch {
      toast.error("Update failed!");
    } finally {
      setUpdating(false);
    }
  };
  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto p-6 md:p-8 space-y-10"
    >
      {/* header */}
      <div className="bg-white dark:bg-[#04120c] p-8 rounded-[2.5rem] border border-emerald-500/10 shadow-xl flex flex-col md:flex-row items-center gap-8">
        <div className="relative group">
          <input type="file" id="avatar" hidden onChange={handleImageUpload} />
          <label htmlFor="avatar" className="cursor-pointer block relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-500/20">
              <img
                src={
                  uploadedImage ||
                  profileData?.photoURL ||
                  user?.photoURL ||
                  "/default-avatar.png"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
              {uploading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
              ) : (
                <FaCamera className="text-white text-2xl" />
              )}
            </div>
          </label>
        </div>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-3xl font-black dark:text-white uppercase tracking-tighter">
            {profileData?.name}
          </h2>
          <p className="text-emerald-500 font-bold text-xs tracking-[0.3em] mt-1 uppercase">
            Manage your profile identity
          </p>
        </div>
      </div>
      {/*  */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#04120c] p-8 rounded-[2.5rem] border border-emerald-500/10 shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 text-3xl mb-4">
              <FaUserCog />
            </div>
            <h2 className="text-2xl font-bold dark:text-white uppercase">
              Profile Information
            </h2>
            <p className="text-emerald-500 font-bold text-[10px] tracking-[0.4em] mt-1">
              UPDATE PROFILE INFORMATION
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/40" />
                <input
                  {...register("name", { required: true })}
                  placeholder="FULL NAME"
                  className="admin-input"
                />
              </div>
              <div className="relative md:col-span-2">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/40" />
                <input
                  {...register("phone")}
                  placeholder="PHONE NUMBER"
                  className="admin-input"
                />
              </div>
              <div className="relative md:col-span-2">
                <FaLocationArrow className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/40" />
                <input
                  {...register("address")}
                  placeholder="ADDRESS"
                  className="admin-input"
                />
              </div>
              <div className="relative opacity-60">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/40" />
                <input
                  {...register("email")}
                  disabled
                  className="admin-input cursor-not-allowed"
                />
              </div>
            </div>
            <CommonButton
              text={updating ? "UPDATING..." : "SAVE PROFILE CHANGES"}
              type="submit"
              disabled={updating}
              className="w-full rounded-xl"
            />
          </form>
        </div>
        <ChangePassword />
      </div>

      {/* Styles are kept same as your provided code */}
      <style>{`.admin-input { width: 100%;  border: 1px solid rgba(16, 185, 129, 0.1); padding: 1rem 3rem; border-radius: 1rem; font-size: 11px; font-weight: 800; letter-spacing: 0.1em; color: #1a1a1a; transition: all 0.3s ease; } .dark .admin-input { background: #0f1a17; border-color: rgba(52, 211, 153, 0.05); color: #fff; } .admin-input:focus { outline: none; border-color: #34d399;  }`}</style>
    </motion.div>
  );
};

export default Settings;
