import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import AdminPanel from "./components/AdminPanel/AdminPanel";

async function fetchExcuses(count) {
  const res = await fetch(`http://localhost:3000/random-excuse/${count}`);
  if (!res.ok) throw new Error("Error fetching excuses");
  return res.json();

}

async function addExcuse(data) {
  const res = await fetch("http://localhost:3000/excuse-add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error adding excuse");
  return res.json();
}


function MainApp() {
  const [author, setAuthor] = useState("");
  const [excuse, setExcuse] = useState("");
  const [count, setCount] = useState(1);
  const [data, setData] = useState([])

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addExcuse,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["excuses"]);
      setAuthor("");
      setExcuse("");
      alert(data.message)
    },
  });

  const mutationx2 = useMutation({
    mutationFn: fetchExcuses,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["excuses", count]);
      setCount(1)
      setData(data)
      console.log(data)
    },
  });

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center p-6 gap-6" >

      <h1 className="text-3xl font-bold text-gray-800">Excuse Generator</h1>

      <div className="w-full max-w-md bg-white rounded-2xl shadow p-4 flex flex-col gap-3">
        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Excuse"
          value={excuse}
          onChange={(e) => setExcuse(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700"
          onClick={() => mutation.mutate({ author, excuse })}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Saving..." : "Add Excuse"}
    
        </button>
      </div>

      
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-4 flex flex-col gap-3">
        <input
          type="number"
          min={1}
          max={5}
          className="border rounded-lg px-3 py-2"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />

        <button
          className="bg-green-600 text-white rounded-lg py-2 hover:bg-green-700"
          onClick={() => mutationx2.mutate(count)}
          disabled={mutationx2.isLoading}
        >
          {mutationx2.isLoading ? "Loading..." : "Get Random Excuses"}
        </button>

        {mutationx2.isError && (
          <p className="text-red-500">Error fetching excuses</p>
        )}

        {data && (
          <div className="flex flex-col gap-2">
            {data.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-gray-100 shadow"
              >
                <p className="font-semibold">{item.author}</p>
                <p className="text-gray-700">{item.excuse}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
function AdminPanelPage() {
  return (
   <div>
      <AdminPanel />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/admin" element={<AdminPanelPage />} />
      </Routes>
    </BrowserRouter>
  );
}