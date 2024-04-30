import React from "react";

function NotFound() {
  return (
    <div className=" h-[100vh] flex justify-center items-center flex-col gap-6">
      <h1 className=" text-3xl font-bold text-red-700">404</h1>
      <h2 className=" text-2xl font-semibold">Page Not Found</h2>
      <p className=" text-xl">The page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;
