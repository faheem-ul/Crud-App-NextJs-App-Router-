"use client";

import React from "react";

import { useContext } from "react";

import { AuthContext } from "@/context/context";

function Profile() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return <div>Profile</div>;
}

export default Profile;
