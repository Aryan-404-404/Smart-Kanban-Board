import React from 'react'
import { useState } from 'react'

const TaskCard = ({ t, deleteTask, handleDragStart, updateTask }) => {

    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(t.title)

    const handleSave = () => {
        if (editTitle === "") return
        updateTask(t.id, editTitle)
        setIsEditing(false)
    }

    return (
        <div className={`bg-gray-800 p-4 rounded-xl border border-gray-700 mb-3 flex justify-between items-center group cursor-pointer
    ${t.status === "done" ? "opacity-50 border-green-500/30" : "hover:border-blue-500/50"}`}
            onDragStart={(e) => handleDragStart(e, t.id)} draggable={true} >
            {isEditing ? (
                <div className="flex gap-2 flex-1">
                    <input
                        className="bg-gray-900 text-white p-1 rounded w-full border border-blue-500 outline-none"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        autoFocus
                    />
                    <button onClick={handleSave} className="text-green-400 font-bold">✓</button>
                    <button onClick={() => setIsEditing(false)} className="text-red-400 font-bold">✕</button>
                </div>
            ) : (
                <>
                    <span className={t.status === "done" ? "line-through text-gray-400" : "text-white"} >{t.title}</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => deleteTask(t.id)}
                            className="text-gray-500 hover:text-red-400 font-bold px-2"
                        >
                            ✕
                        </button>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-gray-500 hover:text-red-400 font-bold px-2"
                        >
                            ✎
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default TaskCard
