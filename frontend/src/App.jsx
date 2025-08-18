import { useState } from "react";
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/useTodos";

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const { todos, stats, toggleTodo, updateTodo, deleteTodo } = useTodos();

  const handleUpdateTodo = async (todoData) => {
    await updateTodo(editingTodo.id, todoData);
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-red-100 max-w-4xl mx-auto px-4 py-8">
        <Header />
        <StatsCard stats={stats} />

        <ul className="space-y-3">
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onEdit={handleEditTodo}
            onDelete={deleteTodo}
          />
        </ul>

        <TodoForm
          isOpen={isFormOpen}
          onClose={handleFormClose}
          editingTodo={editingTodo}
          onSubmit={handleUpdateTodo}
        />
      </div>
    </div>
  );
};

export default App;
