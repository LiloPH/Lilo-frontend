import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import { Button2 } from "@/components/ui/button2";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import logo from "@/assets/icon.png";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const { refresh } = useAuthStore.getState();

    await refresh(() => {});
  },
  component: Index,
});

function Index() {
  const router = useRouter();
  const { loginWithGoogle, isAuthenticated } = useAuthStore();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setShowAlert(true);
    }
  }, [isAuthenticated]);

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

  const handleGotoDashboard = () => {
    router.navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-yellow-50 p-2 md:p-0">
      {showAlert && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <Alert className="bg-white border-amber-500 shadow-lg">
            <AlertDescription className="flex items-center gap-4">
              You're already logged in!
              <Button2
                variant="outline"
                size="sm"
                onClick={handleGotoDashboard}
                className="border-amber-500 hover:bg-amber-50"
              >
                Go to Dashboard
              </Button2>
            </AlertDescription>
          </Alert>
        </div>
      )}

      <Card className="max-w-md w-full shadow-2xl border-gray-300 bg-white">
        <CardHeader className="text-center space-y-1">
          <center>
            <img src={logo} alt="logo" className="w-10 h-10" />
          </center>
          <CardTitle className="text-2xl font-bold">
            Welcome to Lilo Admin Portal
          </CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button2
            variant="outline"
            size="lg"
            onClick={handleGoogleLogin}
            className="w-full gap-3 hover:bg-gray-100 transition-all duration-200"
          >
            <FcGoogle className="size-16" />
            Continue with Google
          </Button2>
        </CardContent>
      </Card>
    </div>
  );
}
