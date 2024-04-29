"use client";
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { signInWithEmailAndPassword } from "firebase/auth";

import toast from "react-hot-toast";

import { auth } from "../../config/firebaseConfig";
function Login() {
  const router = useRouter();
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const handleLoginFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError("");

    if (loginEmail === "" || loginPassword === "") {
      toast.error("please enter all fields");
    } else {
      try {
        const loginUserCredentials = await signInWithEmailAndPassword(
          auth,
          loginEmail,
          loginPassword
        );
        toast.success("Login successful");
        router.push("/profile");
      } catch (err: any) {
        setLoginError(err.message);
      }
    }
  };
  return (
    <div>
      <h1 className="text-[30px] text-center py-4 font-bold text-blue-600">
        Login
      </h1>
      <form
        className="flex flex-col gap-3 items-center justify-center"
        onSubmit={handleLoginFormSubmit}
      >
        <input
          className="p-4 text-black rounded-[22px]"
          type="email"
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          className="p-4 text-black rounded-[22px]"
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button
          className="p-2 bg-blue-600 rounded-[22px] w-[230px]"
          type="submit"
        >
          Login
        </button>
        <p>
          Do not have an account?{" "}
          <Link href="/signup">
            <span className="underline text-blue-500">Sign up</span>
          </Link>
        </p>
      </form>
      {loginError && <p className="text-red-500 text-center">{loginError}</p>}
    </div>
  );
}

export default Login;
