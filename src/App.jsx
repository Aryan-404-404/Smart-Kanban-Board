import { useState, useEffect } from 'react'
import TaskCard from './Components/TaskCard'
import KanbanColumn from './Components/KanbanColumn'

function App() {
  // 1. Data Source (Fixed the duplicate ID on 'Go to shop')
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      return JSON.parse(savedTasks)
    }
    return [
      { id: 1, title: "Do DSA 150", status: "todo" },
      { id: 2, title: "Web Project", status: "todo" },
      { id: 3, title: "Go to Shop", status: "doing" }, // Changed ID to 3
      { id: 4, title: "Sleep", status: "done" },       // Changed ID to 4
    ]
  })

  const [newTask, setNewTask] = useState("")
  const [draggedTaskId, setdraggedTaskId] = useState(null)

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])


  // 2. Logic Engines (Your exact code!)
  function addTask() {
    if (newTask.trim() === "") return
    const newObj = {
      id: Date.now(),
      title: newTask,
      status: "todo"
    }
    setTasks([...tasks, newObj])
    setNewTask("")
  }
  function deleteTask(targetId) {
    const newArr = tasks.filter(t => t.id !== targetId)
    setTasks(newArr)
  }

  function moveTask(targetId, newStatus) {
    const updatedTasks = tasks.map(t => {
      if (t.id === targetId) {
        return { ...t, status: newStatus }
      }
      return t
    })
    setTasks(updatedTasks)
  }
  function updateTask(targetId, newStatus) {
    const updatedTasks = tasks.map(t => {
      if (t.id === targetId) {
        return { ...t, title: newStatus }
      }
      return t
    })
    setTasks(updatedTasks)
  }

  // drag
  function handleDragStart(e, taskId) {
    setdraggedTaskId(taskId)
  }
  function handleDragOver(e) {
    e.preventDefault()
  }
  function handleDrop(e, newStatus) {
    e.preventDefault()
    if (draggedTaskId !== null) {
      moveTask(draggedTaskId, newStatus)
      setdraggedTaskId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">

      {/* HEADER */}
      <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Smart Kanban Board
      </h1>

      {/* INPUT FORM */}
      <div className="mb-10 flex gap-4 max-w-xl mx-auto bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
        <input
          type="text"
          placeholder="What's your next mission?"
          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-lg font-bold transition-all shadow-md active:scale-95"
        >
          Add Task
        </button>
      </div>

      {/* KANBAN COLUMNS */}
      {/* Grid Layout: 1 column on mobile, 3 columns on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">

        {/* COLUMN 1: TODO */}
        <KanbanColumn
          title={"📝 To Do"}
          status={"todo"}
          tasks={tasks.filter(t => t.status === "todo")}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragStart={handleDragStart}
          deleteTask={deleteTask}
          updateTask={updateTask}
        ></KanbanColumn>

        {/* COLUMN 2: DOING */}
        <KanbanColumn
          title={"⚙️ In Progress"}
          status={"doing"}
          tasks={tasks.filter(t => t.status === "doing")}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragStart={handleDragStart}
          deleteTask={deleteTask}
          updateTask={updateTask}
        ></KanbanColumn>

        {/* COLUMN 3: DONE */}
        <KanbanColumn
          title={"✅ Done"}
          status={"done"}
          tasks={tasks.filter(t => t.status === "done")}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragStart={handleDragStart}
          deleteTask={deleteTask}
          updateTask={updateTask}
        ></KanbanColumn>

      </div>
    </div>
  )
}

export default App