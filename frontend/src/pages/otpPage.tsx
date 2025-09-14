import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LoaderIcon, KeyRoundIcon } from "lucide-react";
import { verifyOtp } from "../lib/api"; // <-- you need to implement this API call

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const { mutate: otpMutation, isPending } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      toast.success("OTP Verified Successfully ✅");
      // redirect or fetch user again
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Invalid OTP");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }
    otpMutation({ otp });
  };

const sendOtp = async () => {
   toast.success("OTP Resent ✅")

}

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-md shadow-xl">
        <div className="card-body p-6 sm:p-8">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Verify Your Account
          </h1>
          <p className="text-center text-sm text-base-content/70 mb-6">
            We’ve sent a 6-digit verification code to your email/phone.
            Please enter it below.
          </p>

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Enter OTP</span>
              </label>
              <input
                type="text"
                name="otp"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="input input-bordered w-full text-center tracking-widest text-lg"
                placeholder="••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              className="btn btn-primary w-full"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <KeyRoundIcon className="size-5 mr-2" />
                  Verify OTP
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Verifying...
                </>
              )}
            </button>

            {/* Resend Link */}
            <div className="text-center mt-4">
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
                onClick={() => sendOtp()}
              >
                Didn’t receive OTP? Resend
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
