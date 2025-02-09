"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../utils/axiosConfig";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.error || "Fehler beim Login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow w-80" onSubmit={handleLogin}>
        <h1 className="text-2xl font-bold mb-4 text-black">Login</h1>
        <input
          type="text"
          placeholder="Benutzername"
          className="w-full border p-2 mb-3 rounded text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passwort"
          className="w-full border p-2 mb-3 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Anmelden
        </button>
        <p className="text-center mt-4 text-sm text-black">
          Noch keinen Account?{" "}
          <a href="/register" className="text-blue-500 underline">
            Hier registrieren
          </a>
        </p>
      </form>
    </div>
  );
}
