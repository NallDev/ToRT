import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addTodo, deleteTodo, updateTodo, selectTodos } from "./todosSlice"
import { v4 as uuidv4 } from "uuid"

const Todos: React.FC = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(selectTodos)

  const [isModalOpen, setModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentTodo, setCurrentTodo] = useState({
    id: "",
    title: "",
    description: "",
  })

  const openModal = () => setModalOpen(true)
  const closeModal = () => {
    setModalOpen(false)
    setIsEditing(false)
    setCurrentTodo({ id: "", title: "", description: "" })
  }

  const handleSave = () => {
    if (isEditing) {
      dispatch(updateTodo(currentTodo))
    } else {
      dispatch(addTodo({ ...currentTodo, id: uuidv4() }))
    }
    closeModal()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold my-5">Todo List</h1>

      {todos.length === 0 ? (
        <p className="text-gray-500">There is no todos yet.</p>
      ) : (
        <div className="w-3/4">
          {todos.map(todo => (
            <div
              key={todo.id}
              className="bg-white p-4 rounded shadow mb-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-bold">{todo.title}</h2>
                <p>{todo.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setCurrentTodo(todo)
                    setIsEditing(true)
                    openModal()
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => dispatch(deleteTodo(todo.id))}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="fixed bottom-10 right-10 bg-green-500 text-white p-4 rounded-full shadow-lg"
        onClick={openModal}
      >
        +
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Todo" : "Add Todo"}
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={currentTodo.title}
              onChange={e =>
                setCurrentTodo({ ...currentTodo, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />
            <textarea
              placeholder="Description"
              value={currentTodo.description}
              onChange={e =>
                setCurrentTodo({ ...currentTodo, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Todos
