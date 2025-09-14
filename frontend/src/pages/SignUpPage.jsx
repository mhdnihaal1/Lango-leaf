import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sendOtp , verifyOtp} from "../lib/api";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
   const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");

  // This is how we did it at first, without using our custom hook
  // const queryClient = useQueryClient();
  // const {
  //   mutate: signupMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: signup,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  // This is how we did it using our custom hook - optimized version
  const { signupMutation, isPending, error } = useSignUp();

    const { mutate: sendOtpMutation } = useMutation({
        mutationFn: sendOtp,
        onSuccess: () => {
          toast.success("Otp sended successfully");
         },
    
        onError: (error) => {
          console.log(error);
          toast.error("Failed to send Otp");
        },
      });

      
         const { mutate: verifyOtpMutation } = useMutation({
        mutationFn: verifyOtp,
          onSuccess: (response) => {
     console.log(111111111,response)
     if (response?.success == true) {
      toast.success("Otp verified successfully");
      console.log(signupData)
      signupMutation(signupData)
      setShowOtpModal(false);
    } else {
      toast.error("Invalid OTP, please try again");
    }
  },
    
        onError: (error) => {
          console.log(error);
          toast.error("Failed to verify Otp");
        },
      });

      const verifyOtpSubmit = (otp) => {
    verifyOtpMutation({
    otp,                 // OTP code entered by user
    email: signupData.email, // Email from signup form
  });
setOtp("")
      }
  const handleSignup = (e) => {
    e.preventDefault();
   sendOtpMutation(signupData)
   setShowOtpModal(true); // ✅ show modal after sending OTP
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
  

      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          {/* ERROR MESSAGE IF ANY */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join Streamify and start your language learning adventure!
                  </p>
                </div>

                <div className="space-y-3">
                  {/* FULLNAME */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered w-full"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  {/* EMAIL */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@gmail.com"
                      className="input input-bordered w-full"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </div>
                  {/* PASSWORD */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      className="input input-bordered w-full"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                    <p className="text-xs opacity-70 mt-1">
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox checkbox-sm" required />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">terms of service</span> and{" "}
                        <span className="text-primary hover:underline">privacy policy</span>
                      </span>
                    </label>
                  </div>
                </div>

                <button className="btn btn-primary w-full" type="submit">
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* SIGNUP FORM - RIGHT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/i.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
           {/* OTP Modal */}
{showOtpModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-2xl w-96 border border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-center text-green-400">
        🔑 Verify Your OTP
      </h2>
 
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="border border-gray-600 bg-gray-800 text-white rounded-lg p-3 w-full mb-5 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

 
        <div className="flex justify-between gap-3">
        <button
          className="flex-1 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-200"
          onClick={() => setShowOtpModal(false)}
        >
          Cancel
        </button>
        <button
          className="flex-1 px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-500 transition duration-200 shadow-lg hover:shadow-green-500/50"
          onClick={() => verifyOtpSubmit(otp)}
        >
          Verify
        </button>
        
      </div>
       <span className="text-xs flex justify-center text-gray-400 italic">
    ⚠️ Going back now could cancel your signup.
  </span>
    </div>
  </div>
)}
    </div>
  );
};

export default SignUpPage;
