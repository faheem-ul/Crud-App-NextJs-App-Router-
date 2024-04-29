import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" flex justify-center items-center h-[100vh] flex-col gap-5">
      <h1 className=" text-[40px] font-bold text-blue-500">Home page</h1>
      <Link href="/login">
        If you already have the account, the please{" "}
        <span className=" underline text-blue-500">Log In</span>
      </Link>
      <Link href="/signup">
        If you donot have the account, the please{" "}
        <span className=" underline text-blue-500">Sign Up</span>
      </Link>
    </div>
  );
}
