"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="w-full bg-blue-500 p-4 flex justify-between text-white">
      <span className="font-bold">Notizen-App</span>
      <button
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}
