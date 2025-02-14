import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const router = useRouter();
  const { loginWithGoogle } = useAuthStore();
  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (response) => {
      await loginWithGoogle(response.code, () =>
        router.navigate({ to: "/dashboard" })
      );
    },
    onError: (error) => {
      toast.error(`Login failed: ${error?.error ?? "Unknown error"}`, {
        position: "top-center",
        pauseOnHover: false,
      });
      console.error("Google login error:", error);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>
        <div className="mt-8">
          <button
            onClick={() => handleGoogleLogin()}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            <FcGoogle className="h-5 w-5" />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
