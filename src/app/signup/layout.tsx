import React, { ReactNode } from "react";

import RestrictedRoutes from "@/Routes/RestrictedRoutes";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <RestrictedRoutes>{children}</RestrictedRoutes>
    </>
  );
}

export default Layout;
