"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../utils/axiosConfig";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwörter stimmen nicht überein!");
      return;
    }

    try {
      await axios.post("/auth/register", { username, password });
      alert("Registrierung erfolgreich! Du kannst dich jetzt anmelden.");
      router.push("/login");
    } catch (err: any) {
      alert(err.response?.data?.error || "Fehler bei der Registrierung");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center text-black">
      <form
        className="bg-white p-6 rounded shadow w-80"
        onSubmit={handleRegister}
      >
        <h1 className="text-2xl font-bold mb-4">Registrieren</h1>
        <input
          type="text"
          placeholder="Benutzername"
          className="w-full border p-2 mb-3 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passwort"
          className="w-full border p-2 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passwort bestätigen"
          className="w-full border p-2 mb-3 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Registrieren
        </button>
        <p className="text-center mt-4 text-sm">
          Bereits registriert?{" "}
          <a href="/login" className="text-blue-500 underline">
            Hier anmelden
          </a>
        </p>
      </form>
    </div>
  );
}
