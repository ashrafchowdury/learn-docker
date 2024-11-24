import { Trash2, Plus, Square, CheckSquare } from "lucide-react";
import { useCheckList } from "./hooks/useCheckList";

const TodoApp = () => {
  const {
    lists,
    inputText,
    setInputText,
    toggleListItem,
    hasSelectedListItems,
    deleteListItem,
    toggleSelect,
    deleteSelectedItems,
    toggleDone,
    addListItem,
  } = useCheckList();

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-24">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Todo List</h1>

      <form onSubmit={addListItem} className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      {hasSelectedListItems && (
        <button
          onClick={deleteSelectedItems}
          className="mb-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete Selected
        </button>
      )}

      <ul className="space-y-2">
        {lists.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center gap-3 p-3 border rounded-lg ${todo.selected ? "bg-blue-50" : ""} ${
              todo.done ? "bg-green-50" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={todo.selected}
              onChange={() => toggleSelect(todo.id)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <button onClick={() => toggleDone(todo.id)} className="text-gray-600 hover:text-green-600">
              {todo.done ? <CheckSquare className="w-5 h-5 text-green-600" /> : <Square className="w-5 h-5" />}
            </button>
            <button
              onClick={() => toggleListItem(todo.id)}
              className={`flex-1 text-left ${todo.completed ? "line-through text-gray-500" : ""}`}
            >
              {todo.text}
            </button>
            <button onClick={() => deleteListItem(todo.id)} className="text-red-500 hover:text-red-700">
              <Trash2 className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>

      {lists.length === 0 && <p className="text-center text-gray-500 mt-4">No todos yet. Add some!</p>}
    </div>
  );
};

export default TodoApp;
