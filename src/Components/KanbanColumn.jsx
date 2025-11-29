import React from 'react'
import TaskCard from './TaskCard'

const KanbanColumn = ({title, status, tasks, handleDrop, handleDragOver, handleDragStart, deleteTask, 
          updateTask}) => {
    return (
        <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)} >
            <h2 className="text-xl font-bold mb-4 flex items-center text-yellow-400">
                <span className="bg-yellow-400/20 p-2 rounded mr-2">📝</span> {title}
            </h2>
            <div className="space-y-3">
                {tasks.map(t => (
                    <TaskCard key={t.id} t={t} deleteTask={deleteTask} handleDragStart={handleDragStart} 
          updateTask={updateTask}></TaskCard>
                ))}
            </div>
        </div>
    )
}

export default KanbanColumn
