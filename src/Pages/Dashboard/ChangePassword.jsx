import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import CommonButton from "../../Shared/CommonButton";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

const ChangePassword = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [updating, setUpdating] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPass, setShowPass] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const { register, handleSubmit, reset, control } = useForm({
    mode: "onChange",
  });

  const currentPassValue = useWatch({ control, name: "currentPassword" });
  const newPassValue = useWatch({ control, name: "newPassword" });
  const confirmPassValue = useWatch({ control, name: "confirmPassword" });

  const isValidationLoading =
    !currentPassValue ||
    !newPassValue ||
    !confirmPassValue ||
    newPassValue !== confirmPassValue ||
    newPassValue.length < 6 ||
    updating;

  const sendOTP = async () => {
    setUpdating(true);
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassValue,
      );
      await reauthenticateWithCredential(user, credential);

      await axiosSecure.post("/send-password-otp", { email: user.email });
      setOtpSent(true);
      toast.success("Security OTP sent to your email!");
    } catch (error) {
      console.error(error);
      toast.error("Incorrect current password or system timeout!");
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordUpdate = async (data) => {
    if (!otp || otp.length < 6)
      return toast.error("Please enter full 6-digit OTP");

    setUpdating(true);
    try {
      const verifyRes = await axiosSecure.post("/verify-password-otp", {
        email: user.email,
        otp,
      });

      if (verifyRes.data.success) {
        await updatePassword(user, data.newPassword);
        toast.success("Security updated! Password changed.");
        reset();
        setOtp("");
        setOtpSent(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid OTP or request failed",
      );
    } finally {
      setUpdating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full"
    >
      <div className="bg-white dark:bg-[#04120c] p-8 rounded-[2.5rem] border border-emerald-500/10 shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 text-3xl mb-4">
            <FaShieldAlt />
          </div>
          <h2 className="text-2xl font-black dark:text-white uppercase tracking-tighter">
            Security Firewall
          </h2>
          <p className="text-emerald-500 font-bold text-[10px] tracking-[0.4em] mt-1">
            UPDATE SYSTEM ACCESS
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handlePasswordUpdate)}
          className="space-y-5"
        >
          {/* CURRENT PASSWORD */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/40" />
            <input
              type={showPass.current ? "text" : "password"}
              {...register("currentPassword", { required: true })}
              placeholder="CURRENT SYSTEM PASSWORD"
              className="admin-input"
            />
            <button
              type="button"
              onClick={() =>
                setShowPass({ ...showPass, current: !showPass.current })
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500/40 hover:text-emerald-500 transition-colors"
            >
              {showPass.current ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* NEW PASSWORD */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/40" />
            <input
              type={showPass.new ? "text" : "password"}
              {...register("newPassword", { required: true, minLength: 6 })}
              placeholder="NEW PASSWORD (MIN 6 CHAR)"
              className={`admin-input ${newPassValue?.length > 0 && newPassValue.length < 6 ? "border-red-500/50" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPass({ ...showPass, new: !showPass.new })}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500/40 hover:text-emerald-500"
            >
              {showPass.new ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <FaCheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/40" />
            <input
              type={showPass.confirm ? "text" : "password"}
              {...register("confirmPassword", { required: true })}
              placeholder="RE-TYPE NEW PASSWORD"
              className={`admin-input ${confirmPassValue && newPassValue !== confirmPassValue ? "border-red-500/50" : ""}`}
            />
            <button
              type="button"
              onClick={() =>
                setShowPass({ ...showPass, confirm: !showPass.confirm })
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500/40 hover:text-emerald-500"
            >
              {showPass.confirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* ERROR MESSAGE FOR MISMATCH */}
          {confirmPassValue && newPassValue !== confirmPassValue && (
            <p className="text-[9px] text-red-500 font-black uppercase tracking-widest ml-4">
              Passwords do not match!
            </p>
          )}

          {/* OTP BOXES SECTION */}
          <AnimatePresence>
            {otpSent && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-4 pt-2"
              >
                <div className="flex justify-between gap-2 max-w-75 mx-auto relative">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className={`w-10 h-12 md:w-12 md:h-14 border-2 rounded-xl flex items-center justify-center text-xl font-black transition-all ${
                        otp[index]
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-500"
                          : "border-emerald-500/20 bg-gray-50 dark:bg-[#0f1a17] text-gray-400"
                      }`}
                    >
                      {otp[index] || ""}
                    </div>
                  ))}

                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    className="absolute inset-0 opacity-0 cursor-pointer w-full"
                    autoFocus
                  />
                </div>
                <p className="text-center text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                  Click above boxes to enter security code
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ACTION BUTTONS */}
          {!otpSent ? (
            <button
              type="button"
              onClick={sendOTP}
              disabled={isValidationLoading}
              className={`w-full py-4 rounded-xl font-black text-[11px] tracking-[0.3em] transition-all duration-500 uppercase ${
                isValidationLoading
                  ? "bg-gray-100 dark:bg-emerald-900/5 text-gray-400 cursor-not-allowed border border-dashed border-gray-200 dark:border-emerald-500/10"
                  : "bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.98]"
              }`}
            >
              {updating ? "Processing..." : "Generate Security OTP"}
            </button>
          ) : (
            <CommonButton
              text={updating ? "Verifying..." : "Authorize Password Change"}
              type="submit"
              className="w-full rounded-xl py-4"
              disabled={otp.length < 6 || updating}
            />
          )}
        </form>
      </div>

      <style>{`
        .admin-input { 
          width: 100%; 
          background: #f8fafc; 
          border: 1px solid rgba(16, 185, 129, 0.1); 
          padding: 1.1rem 3.5rem; 
          border-radius: 1.25rem; 
          font-size: 11px; 
          font-weight: 800; 
          letter-spacing: 0.1em; 
          color: #1a1a1a; 
          transition: all 0.3s ease; 
        } 
        .dark .admin-input { 
          background: #0f1a17; 
          border-color: rgba(52, 211, 153, 0.05); 
          color: #fff; 
        } 
        .admin-input:focus { 
          outline: none; 
          border-color: #34d399; 
          background: white; 
          box-shadow: 0 0 20px rgba(52, 211, 153, 0.05);
        }
        .dark .admin-input:focus {
          background: #04120c;
        }
      `}</style>
    </motion.div>
  );
};

export default ChangePassword;
