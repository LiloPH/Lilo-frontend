import { createLazyFileRoute } from "@tanstack/react-router";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (response) => {
      console.log("Server Auth Code:", response.code);
    },
    onError: () => {
      console.log("Login failed");
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
            onClick={() => login()}
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
