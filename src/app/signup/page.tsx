"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createUserWithEmailAndPassword } from "firebase/auth";

import toast from "react-hot-toast";

import { auth, db } from "../../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

function Signup() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignupFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      toast.error("Please fill all the fields");
    } else {
      try {
        const usercredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const uid = usercredentials.user.uid;

        const user = {
          name,
          email,
          uid,
        };

        await setDoc(doc(db, "signups", uid), user);

        setName("");
        setEmail("");
        setPassword("");

        toast.success("You have created an account successfully");
        router.push("/profile");
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  return (
    <div>
      <h1 className="text-[30px] text-center py-4 font-bold text-blue-600">
        Signup
      </h1>
      <form
        className="flex flex-col gap-3 items-center justify-center"
        onSubmit={handleSignupFormSubmit}
      >
        <input
          className="p-4 text-black rounded-[22px]"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="p-4 text-black rounded-[22px]"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-4 text-black rounded-[22px]"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="p-2 bg-blue-600 rounded-[22px] w-[230px]"
          type="submit"
        >
          Signup
        </button>
        <p>
          Already have an account?{" "}
          <Link href="/login">
            <span className="underline text-blue-500">Login</span>
          </Link>
        </p>
      </form>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
}

export default Signup;
