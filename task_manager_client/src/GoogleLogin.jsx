import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "./Provider/AuthProvider";
import toast from "react-hot-toast"; // ✅ Import react-hot-toast

const GoogleLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("✅ Successfully logged in!"); // ✅ Show success toast
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("❌ Login failed! Please try again."); // ✅ Show error toast
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Task Manager</h1>
        <p className="text-gray-600 mb-6">Manage your tasks efficiently and stay productive.</p>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full bg-gray-100 border border-gray-300 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-5 rounded-lg shadow-md transition duration-300"
        >
          <FcGoogle className="text-2xl mr-2" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;
