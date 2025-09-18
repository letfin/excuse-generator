import React, { useState } from 'react'

export default function AdminPanel() {
    const [excuses, setExcuses] = useState([
        { id: 1, text: "My dog ate my homework", author: "John" },
        { id: 2, text: "I was stuck in traffic", author: "Jane" },
        { id: 3, text: "I had a family emergency", author: "Doe" }
    ]);

    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    const handleEdit = (excuse) => {
        setEditingId(excuse.id);
        setEditText(excuse.text);
    };

    const handleSave = (id) => {
        setExcuses(excuses.map(excuse => 
            excuse.id === id 
                ? { ...excuse, text: editText }
                : excuse
        ));
        setEditingId(null);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-[#212121] rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold mb-6 text-[#EF8000] text-center">
                Admin Panel
            </h1>
            <ul className="space-y-4 cursor-pointer">
                {excuses.map((excuse) => (
                    <li key={excuse.id} className="bg-[#212121] p-4 rounded-lg border border-[#EF8000] hover:bg-[#EF8000] duration-300 ease-in-out group transition-all relative">
                        <div className="absolute -top-5 right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible flex gap-2 transition-all duration-300 ease-in-out">
                            <button  onClick={() => handleEdit(excuse)} className="w-10 h-10 cursor-pointer bg-blue-500 flex items-center justify-center border-2 border-[#212121] text-[#212121] rounded-full text-sm hover:bg-blue-600 hover:scale-125 duration-300 ease-in-out group transition-all">
                                <i className="fa-solid fa-pencil"></i>
                            </button>
                            <button className="w-10 h-10 cursor-pointer bg-[#b90303] flex items-center justify-center border-2 border-[#212121] text-[#212121] rounded-full text-sm hover:bg-[#8b0303] hover:scale-125 duration-300 ease-in-out group transition-all">
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                        <div className="flex justify-between items-center">
                            {editingId === excuse.id ? (
                                <div className="flex gap-2 items-center">
                                    <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} className="bg-[#212121] text-[#EF8000] border border-[#EF8000] rounded px-2 py-1"/>
                                    <button onClick={() => handleSave(excuse.id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <p className="text-[#EF8000] font-medium group-hover:text-[#212121] transition-all duration-300">
                                    {excuse.text}
                                </p>
                            )}
                            <span className="text-[#EF8000] text-sm bg-[#212121] px-3 py-1 rounded-full group-hover:text-[#212121] group-hover:bg-[#EF8000] transition-all duration-300">
                                {excuse.author}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}