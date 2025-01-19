"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();

  // Redirect logged-in users to the dashboard
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
        <div className="relative w-32 h-32">
          {/* Outer Rotating Ring */}
          <div className="absolute inset-0 w-full h-full border-4 border-dotted border-white rounded-full animate-spin"></div>

          {/* Inner Pulsating Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-purple-400 rounded-full animate-pulse"></div>
          </div>

          {/* Expanding Ripple */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-purple-300 rounded-full opacity-50 animate-ripple"></div>
          </div>

          {/* Rotating Circles */}
          <div className="absolute inset-0 flex justify-center items-center animate-rotate">
            <div className="absolute w-4 h-4 bg-blue-400 rounded-full top-0"></div>
            <div className="absolute w-4 h-4 bg-pink-400 rounded-full right-0"></div>
            <div className="absolute w-4 h-4 bg-yellow-400 rounded-full bottom-0"></div>
            <div className="absolute w-4 h-4 bg-green-400 rounded-full left-0"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Section */}
      <div className="flex-1 bg-gradient-to-br from-green-200 to-green-500 text-left p-12 flex flex-col justify-center">
        <h1 className="text-5xl font-extrabold text-gray-800">
          Real-Time Collaborative Whiteboard
        </h1>
        <p className="mt-6 text-lg text-gray-700">
          Collaborate, brainstorm, and share ideas seamlessly with our powerful
          whiteboard solution.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          {/* Google Sign-In */}
          <div className="space-y-4">
            {/* Google Login Button */}
            <button
              onClick={() => signIn("google")}
              className="flex items-center justify-center bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-3 hover:shadow-lg hover:border-gray-400 transition duration-200 w-full"
            >
              <img
                src="/google-icon.svg"
                alt="Google Icon"
                className="w-5 h-5 mr-3"
              />
              <span className="text-sm font-semibold">Sign in with Google</span>
            </button>

            {/* GitHub Login Button */}
            <button
              onClick={() => signIn("github")}
              className="flex items-center justify-center bg-black text-white rounded-lg px-4 py-3 hover:bg-gray-900 transition duration-200 w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-3"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82.64-.18 1.33-.27 2.01-.27.68 0 1.37.09 2.01.27 1.52-1.04 2.2-.82 2.2-.82.44 1.1.16 1.91.08 2.11.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.014 8.014 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span className="text-sm font-semibold">Sign in with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 text-center text-gray-500">OR</div>

          {/* Form */}
          <form>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-600"
                >
                  First Name*
                </label>
                <input
                  type="text"
                  id="first-name"
                  placeholder="First Name"
                  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-purple-500 transition-all px-2 py-1"
                />
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Last Name*
                </label>
                <input
                  type="text"
                  id="last-name"
                  placeholder="Last Name"
                  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-purple-500 transition-all px-2 py-1"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-purple-500 transition-all px-2 py-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password*
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="Your password"
                  className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-purple-500 transition-all px-2 py-1"
                />
                <span className="absolute right-2 top-2 cursor-pointer text-gray-500">
                  👁️
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 text-purple-500 focus:ring focus:ring-purple-200"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="/terms" className="text-purple-500 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="text-purple-500 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all font-bold"
            >
              Create your account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
