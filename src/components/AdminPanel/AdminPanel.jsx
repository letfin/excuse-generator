import React, { useState } from 'react'

export default function AdminPanel() {
    const [excuses, setExcuses] = useState([
        { id: 1, text: "My dog ate my homework", author: "John" },
        { id: 2, text: "I was stuck in traffic", author: "Jane" },
        { id: 3, text: "I had a family emergency", author: "Doe" },
        { id: 4, text: "I forgot", author: "Smith" },
        { id: 5, text: "I was sick", author: "Emily" },
        { id: 6, text: "My alarm didn't go off", author: "Michael" },
        { id: 7, text: "I had to work late", author: "Sarah" },
        { id: 8, text: "I lost track of time", author: "David" },
        { id: 9, text: "I was helping a friend", author: "Anna" },
        { id: 10, text: "I had car trouble", author: "Chris" },
    ]);

    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const handleDelete = (id) => {
        setDeleteConfirmId(id);
    };

    const confirmDelete = () => {
        setExcuses(excuses.filter(excuse => excuse.id !== deleteConfirmId));
        setDeleteConfirmId(null);
    };

    const cancelDelete = () => {
        setDeleteConfirmId(null);
    };
    
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

    const excuseToDelete = excuses.find(excuse => excuse.id === deleteConfirmId);

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-[#212121] rounded-lg shadow-xl" style={{ fontFamily: 'Comfortaa' }}>
            <h1 className="text-3xl font-bold mb-6 text-[#EF8000] text-center">
                Admin Panel
            </h1>
            {deleteConfirmId && (
                <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn">
                    <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" onClick={cancelDelete}></div>
                    <div className="relative bg-[#212121] p-8 rounded-2xl border-2 border-[#EF8000] shadow-2xl max-w-md w-full mx-4 animate-slideIn">
                        <h3 className="text-xl font-bold text-[#EF8000] text-center mb-4">
                            Підтвердження видалення
                        </h3>
                        <p className="text-[#EF8000] text-center mb-2">
                            Ви впевнені, що хочете видалити це виправдання?
                        </p>
                        {excuseToDelete && (
                            <div className="bg-[#2a2a2a] p-3 rounded-lg border border-[#EF8000] mb-6">
                                <p className="text-[#EF8000] text-center italic">
                                    "{excuseToDelete.text}"
                                </p>
                                <p className="text-[#EF8000] text-center text-sm mt-1">
                                    — {excuseToDelete.author}
                                </p>
                            </div>
                        )}
                        <div className="flex gap-4 justify-center">
                            <button onClick={confirmDelete} className="bg-[#b90303] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8b0303] hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl">
                                Так, видалити
                            </button>
                            <button onClick={cancelDelete} className="bg-[#EF8000] text-[#212121] px-6 py-3 rounded-lg font-semibold hover:bg-[#cf6f00] hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl">
                                Скасувати
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ul className="flex flex-col gap-4">
                {excuses.map((excuse) => (
                    <li key={excuse.id} className="bg-[#212121] p-4 rounded-lg border border-[#EF8000] hover:bg-[#EF8000] hover:scale-101 duration-300 ease-in-out group transition-all relative">
                        <div className="absolute -top-5 right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible flex gap-2 transition-all duration-300 ease-in-out">
                            <button onClick={() => handleEdit(excuse)} className="w-10 h-10 bg-blue-500 flex items-center justify-center border-2 border-[#212121] text-[#212121] rounded-full text-sm hover:bg-blue-600 hover:scale-125 duration-300 ease-in-out group transition-all">
                                <i className="fa-solid fa-pencil"></i>
                            </button>
                            <button onClick={() => handleDelete(excuse.id)} className="w-10 h-10 bg-[#b90303] flex items-center justify-center border-2 border-[#212121] text-[#212121] rounded-full text-sm hover:bg-[#8b0303] hover:scale-125 duration-300 ease-in-out group transition-all">
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

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideIn {
                    from { 
                        opacity: 0; 
                        transform: translateY(-20px) scale(0.95); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0) scale(1); 
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }
            `}</style>
        </div>
    )
}