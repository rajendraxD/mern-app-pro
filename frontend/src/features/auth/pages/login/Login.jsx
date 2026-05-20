import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
  const [email, setEmail] = useState("leila57@gmail.com");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      setIsLoading(true);
      try {
        // Send token to your backend for verification
        const response = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: credentialResponse.access_token }),
        });

        if (response.ok) {
          const data = await response.json();
          // Store token and redirect
          localStorage.setItem("authToken", data.token);
          window.location.href = "/dashboard";
        }
      } catch (error) {
        console.error("Google login failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      console.error("Google login failed");
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Add login logic here
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="relative min-h-screen md:min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center p-0 md:p-4 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-40 pointer-events-none hidden md:block">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path d="M 50 50 Q 100 20 150 50 Q 130 100 150 150 Q 100 130 50 150 Q 70 100 50 50" fill="none" stroke="#e0e7ff" strokeWidth="2" />
          <polygon points="100,30 110,60 140,60 115,80 125,110 100,90 75,110 85,80 60,60 90,60" fill="#e0e7ff" />
        </svg>
      </div>

      <div className="absolute top-1/4 right-10 opacity-50 pointer-events-none hidden md:block">
        <svg width="120" height="120" viewBox="0 0 120 120" className="text-lime-400">
          <polygon points="60,20 100,100 20,100" fill="currentColor" opacity="0.3" />
          <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
        </svg>
      </div>

      <div className="absolute bottom-20 left-10 opacity-30 pointer-events-none hidden md:block">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" fill="none" stroke="#6366f1" strokeWidth="2" />
          <path d="M 50 20 Q 65 35 50 50 Q 35 65 50 80" fill="none" stroke="#6366f1" strokeWidth="2" />
        </svg>
      </div>

      <div className="absolute bottom-10 right-5 opacity-20 pointer-events-none hidden md:block">
        <div className="w-16 h-16 bg-pink-300 rounded-lg transform rotate-45"></div>
      </div>

      {/* Logo */}
      {/* <div className="mb-12 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">✦</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Scholarly</h1>
        </div>
      </div> */}

      {/* Main Card */}
      <div className="w-full h-screen md:h-auto md:max-w-sm bg-white md:rounded-2xl rounded-none shadow-none md:shadow-lg p-6 md:p-8 relative z-10 flex flex-col md:flex md:flex-col justify-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Sign in</h2>
        <p className="text-slate-500 text-center mb-8 text-sm">Enter details to get sign in to your account.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 text-sm font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">

            <div className="flex justify-between border-slate-200">
              <Label htmlFor="password" className="text-slate-700 text-sm font-medium">Password</Label>
              <a href="#" className="text-blue-600 hover:text-blue-700 text-center block text-sm font-medium">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                required
              />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        {/* Social Login Divider */}
        <div className="mt-8 mb-6 flex items-center gap-3">
          <div className="flex-1 border-t border-slate-200"></div>
          <span className="text-slate-400 text-xs font-medium">OR</span>
          <div className="flex-1 border-t border-slate-200"></div>
        </div>

        {/* Google Login Button */}
        <Button
          onClick={() => handleGoogleLogin()}
          className="w-full bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0">
            <path fill="#1F2937" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </Button>

      </div>

      {/* Footer */}
      {/* <div className="mt-8 text-center text-xs text-slate-500 relative z-10">
        <p>@Scholarly 2022 • <a href="#" className="hover:text-slate-700">Privacy Policy</a> • <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a></p>
      </div> */}
    </div>
  )
}
