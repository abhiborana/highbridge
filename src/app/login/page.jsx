"use client";

import useHighbridgeStore from "@/store";
import AppleIcon from "@/svgs/apple";
import FacebookIcon from "@/svgs/facebook";
import GoogleIcon from "@/svgs/google";
import { useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useHighbridgeStore((state) => state.dispatch);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Form submitted:", form);
    dispatch({
      type: "SET_STATE",
      payload: {
        user: { ...form },
      },
    });
  };

  return (
    <div className="h-full w-full bg-[url('/bg-img.png')] bg-cover bg-center bg-no-repeat">
      <div className="w-full h-full bg-gradient-to-bl from-[#42424223] to-[#212121] flex justify-center items-center">
        <div className="max-w-5xl flex justify-between w-full h-full items-center">
          <div className="flex flex-col w-2/5 h-3/5 justify-between text-white pt-20">
            <img
              src="/logo-highbridge.png"
              alt="HighBridge"
              className="w-72 h-auto"
            />
            <div className="flex flex-col gap-6 text-balance">
              <h3 className="text-4xl font-bold">Building the Future...</h3>
              <p className="text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-2/5 bg-gray-50 rounded-t-3xl p-10 mt-auto flex flex-col gap-5 text-sm"
          >
            <div>
              <p className="font-medium leading-5">WELCOME BACK!</p>
              <h4 className="text-2xl font-semibold leading-11">
                Log In to your Account
              </h4>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-normal text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Type here..."
                className="w-full bg-white border border-gray-200 p-3 text-base rounded-md placeholder:text-gray-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-normal text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Type here..."
                className="w-full bg-white border border-gray-200 p-3 text-base rounded-md placeholder:text-gray-300"
              />
            </div>
            <div className="flex w-full justify-between items-center">
              <div className="flex gap-1 items-center">
                <div className="flex h-6 shrink-0 items-center">
                  <div className="group grid size-6 grid-cols-1">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      checked={form.remember}
                      onChange={(e) =>
                        setForm({ ...form, remember: e.target.checked })
                      }
                      className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-[#EE3425] checked:bg-[#EE3425] indeterminate:border-[#EE3425] indeterminate:bg-[#EE3425] focus-visible:outline focus-visible:outline-[#EE3425] disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                    />
                    <svg
                      fill="none"
                      viewBox="0 0 14 14"
                      className="pointer-events-none col-start-1 row-start-1 size-4 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                    >
                      <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-has-[:checked]:opacity-100"
                      />
                      <path
                        d="M3 7H11"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-has-[:indeterminate]:opacity-100"
                      />
                    </svg>
                  </div>
                </div>
                <label htmlFor="remember" className="text-xs text-black">
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-xs font-semibold text-gray-700 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <button
              disabled={!form.email || !form.password}
              type="submit"
              className="py-2 px-12 bg-[#EE3425] text-base font-bold leading-[150%] text-white rounded-lg hover:bg-[#EE5425] disabled:opacity-50 disabled:cursor-not-allowed!"
            >
              Log In
            </button>
            <div className="relative w-full h-px bg-gray-200 flex-shrink-0 my-2">
              <div className="absolute bg-gray-50 font-bold text-sm px-4 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Or
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full text-xs text-gray-600 leading-6">
              <button
                onClick={() => toast.warning("Unable to login via google")}
                className="py-1.5 px-10 flex items-center justify-between rounded-lg border border-gray-200 hover:bg-gray-100"
              >
                <GoogleIcon />
                <p>Log In with Google</p>
                <span className="invisible"></span>
              </button>{" "}
              <button
                onClick={() => toast.warning("Unable to login via facebook")}
                className="py-1.5 px-10 flex items-center justify-between rounded-lg border border-gray-200 hover:bg-gray-100"
              >
                <FacebookIcon />
                <p>Log In with Facebook</p>
                <span className="invisible"></span>
              </button>{" "}
              <button
                onClick={() => toast.warning("Unable to login via apple")}
                className="py-1.5 px-10 flex items-center justify-between rounded-lg border border-gray-200 hover:bg-gray-100"
              >
                <AppleIcon />
                <p>Log In with Apple</p>
                <span className="invisible"></span>
              </button>
            </div>
            <p className="mt-5 text-gray-800 w-full text-center text-xs leading-[100%]">
              New User?{" "}
              <span className="underline font-bold">SIGN UP HERE</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
