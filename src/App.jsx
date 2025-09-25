import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import "./App.css";

import AdminPanel from "./components/AdminPanel/AdminPanel";

async function fetchExcuses(count) {
  const res = await fetch(`https://excuse-generator-45lh.onrender.com//random-excuse`);
  if (!res.ok) throw new Error("Error fetching excuses");
  return res.json();

}

async function addExcuse(data) {
  console.log(JSON.stringify(data))
  const res = await fetch("https://excuse-generator-45lh.onrender.com//excuse-add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error adding excuse");
  return res.json();
}

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-[#212121] flex items-center flex-col rounded-2xl shadow-lg p-6 relative w-152 text-gray-600">
        <button
          className="absolute top-2 right-2 text-amber-50 hover:text-gray-500"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
     
      </div>
    </div>
  );
};


export default function App() {
  const [isOpen, setIsOpen] = useState(false);
   const [author, setAuthor] = useState("");
    const [excuse, setExcuse] = useState("");
    const [count, setCount] = useState(1);
    const [data, setData] = useState([])

    const queryClient = useQueryClient();

    const mutation = useMutation({
      mutationFn: addExcuse,
      onSuccess: () => {
        queryClient.invalidateQueries(["excuses"]);
        setAuthor("");
        setExcuse("");
        alert("Excuse was saved")
      },
      onError:() => {
        alert('Excuse was saved')
      }
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
     <div className="h-screen w-full bg-[#212121] flex flex-col items-center gap-10" style={{ fontFamily: 'Inter', fontStyle: 'italic' }}> 
      
      <header className="w-full h-1/7 border-b-10 border-[#EF8000] flex items-center justify-between p-4">
      
      <img src="/logo.png" alt="logo" className="w-64 h-64 hover:rotate-180 duration-300 " />

      <div className="flex gap-10 items-center justify-center">
        <div className="w-24 h-24 bg-[#EF8000] rounded-full flex items-center justify-center color-black text-6xl hover:bg-[#c06600] hover:border-1 hover:scale-125 duration-300  group transition-all">
        <i class="fa-brands fa-github"></i>
        </div>
        <div className="w-20 h-20 bg-[#EF8000] rounded-full flex items-center justify-center color-black text-6xl hover:bg-[#c06600] hover:border-1 hover:scale-115 duration-300 ease-in-out group transition-all">
        <i class="fa-solid fa-plus" onClick={() => setIsOpen(true)} ></i>
        </div>
      </div>

      </header>

       <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-bold mb-4 text-[#EF8000]">Hello 👋</h2>
        <p className="text-2xl text-[#EF8000]">Send your excuse</p>
         <input type="text" className="bg-black w-full text-gray-600 rounded-2xl p-3 outline-0 border-[#EF8000] border-2 m-2.5" onChange={(e) => setAuthor(e.target.value)}/>
      <input type="text" className="bg-black w-full text-gray-600 rounded-2xl p-3 outline-0 border-[#EF8000] border-2 m-2.5" onChange={(e) => setExcuse(e.target.value)}/>
      <button className="bg-black text-gray-600 rounded-2xl p-3 outline-0 border-[#EF8000] border-2 m-2.5 w-2xs" onClick={() => mutation.mutate({author:author, excuse:excuse})} >Send</button>
      </Popup>
     
{/* 
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
      </div> */}

      
      <div className="w-[80%] h-1/2 border-7 border-[#EF8000] rounded-2xl shadow p-4 flex flex-col gap-3">
        {/* <input
          type="number"
          min={1}
          max={5}
          className="border rounded-lg px-3 py-2"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        /> */}

      

        {mutationx2.isError && (
          <p className="text-red-500">Error fetching excuses</p>
        )}

        {data && (
          <div className="flex flex-col gap-2">
            {
              <div
                key={data._id}
                className="p-3 rounded-xl bg-gray-100 shadow"
              >
                <p className="font-semibold">{data.author}</p>
                <p className="text-gray-700">{data.excuse}</p>
                <p className="text-gray-700">{data.likes}</p>
              
              </div>
            }
          </div>
        )}
      </div>
 <button
          className="w-96 h-24 border-7 rounded-3xl font-bold text-5xl text-[#EF8000] flex items-center justify-center gap-4 active:scale-100 hover:scale-125 duration-300  group transition-all "
          onClick={() => mutationx2.mutate(count)}
          disabled={mutationx2.isLoading}
        >
          {mutationx2.isLoading ? "Loading..." : "Generate"}
          <img src="/generate.png" alt=""  className="w-20 h-20 hover:rotate-360 hover:scale-110 duration-500  group transition-all"/>
        </button>

        <div className="absolute bottom-10 right-10 w-24 h-24 bg-[#EF8000] rounded-full flex items-center justify-center color-black text-6xl hover:bg-[#c06600]  hover:scale-125 duration-300  group transition-all">
        <i class="fa-solid fa-music"></i>
        </div>
    </div>
  );
}