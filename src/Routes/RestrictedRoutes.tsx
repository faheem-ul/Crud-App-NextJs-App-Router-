"use client";

import { ReactNode, useContext, useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

import { AuthContext } from "@/context/context";

function RestrictedRoutes({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (
      (!loading && user && pathname === "/login") ||
      (!loading && user && pathname === "/signup")
    ) {
      router.push("/profile");
    }
  }, [user, loading]);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return <>{children}</>;
}

export default RestrictedRoutes;
