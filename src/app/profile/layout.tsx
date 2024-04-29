import React, { ReactNode } from "react";
import PrivateRoutes from "@/Routes/PrivateRoutes";

function Loyout({ children }: { children: ReactNode }) {
  return (
    <>
      <PrivateRoutes>{children}</PrivateRoutes>
    </>
  );
}

export default Loyout;
