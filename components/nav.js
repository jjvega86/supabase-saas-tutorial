import Link from "next/link";
import React from "react";
import { useUser } from "../context/user";

const Nav = () => {
  const { user } = useUser();
  return (
    <div className="flex gap-4 flex-row ml-3 mt-2 border-b-2 py-2 pb-4">
      <Link href="/">
        <a className="font-bold text-lg text-amber-600">SASSY</a>
      </Link>
      <Link href="/pricing">
        <a className="font-bold text-lg">PRICING</a>
      </Link>
      <Link href={user ? "/logout" : "/login"}>
        <a className="font-bold text-lg ml-auto mr-2">
          {user ? "LOGOUT" : "LOGIN"}
        </a>
      </Link>
    </div>
  );
};

export default Nav;
