"use client";

// import CreateBoard from "@/components/CreateBoard";
import { signOut, useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <main className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold mb-4">Welcome, {session?.user?.name}</h1>
        <p className="mb-6 text-gray-600">You are logged in as {session?.user?.email}</p>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Sign Out
        </button>
        {/* <CreateBoard /> */}
      </div>
    </main>
  );
};

export default DashboardPage;
