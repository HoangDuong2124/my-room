
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Home = () => {
  const { data } = useSession();
  return (
    <div className="flex flex-row justify-between">
      <div>
        <Link
          className="underline"
          href="/room"
        >
          Go To My Room
        </Link>

      </div>
      {data?.user && (
        <div className="flex flex-row items-center gap-5">
          <h6>{data?.user?.name}</h6>
          <button onClick={() => signOut()}>
            Logout
          </button>
        </div>
      )}

      {!data?.user && (
        <button onClick={() => signIn()}>
          Login
        </button>
      )}

    </div>
  );
};

export default Home;
