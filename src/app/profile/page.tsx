"use client";

import React from "react";
import { useContext } from "react";

import { useRouter } from "next/navigation";

import { AuthContext } from "@/context/context";
import { auth } from "../../config/firebaseConfig";

function Profile() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  console.log(user);

  const handleLogOut = () => {
    auth.signOut();
    router.push("/login");
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      <h1 className="text-[30px] text-center py-4 font-bold text-blue-600">
        Profile Page
      </h1>
      <button
        className="p-2 bg-blue-600 rounded-[22px] w-[230px]"
        onClick={handleLogOut}
      >
        Log Out
      </button>
    </div>
  );
}

export default Profile;
