"use client";

import { ReactNode, useContext, useEffect } from "react";

import { useRouter, usePathname } from "next/navigation";

import { AuthContext } from "./context";
import path from "path";

function PrivateRoutes({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else {
      router.push("/profile");
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return <div>{children}</div>;
}

export default PrivateRoutes;
