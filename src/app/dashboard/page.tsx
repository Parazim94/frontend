"use client";

import { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }

    const fetchNotes = async () => {
      try {
        const res = await axios.get("/notes");
        setNotes(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotes();
  }, [router]);

  const addNote = async () => {
    if (!title || !content) return;
    try {
      const res = await axios.post("/notes", { title, content });
      setNotes([...notes, res.data]);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await axios.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6">📝 Dashboard</h1>
      <div className="bg-white p-6 rounded shadow w-96">
        <input
          className="w-full border p-2 mb-2 rounded"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2 mb-2 rounded"
          placeholder="Inhalt"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={addNote}
        >
          Notiz hinzufügen
        </button>
      </div>
      <ul className="mt-6 w-96">
        {notes.map((note: any) => (
          <li
            key={note._id}
            className="bg-white p-4 mb-2 rounded shadow flex justify-between"
          >
            <div>
              <h3 className="font-bold">{note.title}</h3>
              <p>{note.content}</p>
            </div>
            <button
              className="text-red-500"
              onClick={() => deleteNote(note._id)}
            >
              Löschen
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
