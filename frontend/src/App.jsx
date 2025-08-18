import { useState } from "react";
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/useTodos";
import ControlPanel from "./components/ControlPanel";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const {
    todos,
    stats,
    toggleTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    loading,
    error,
  } = useTodos();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateTodo = async (todoData) => {
    await createTodo(todoData);
  };

  const handleUpdateTodo = async (todoData) => {
    await updateTodo(editingTodo.id, todoData);
    setEditingTodo(null);
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Header />
        <StatsCard stats={stats} />

        <ControlPanel
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          filter={filter}
          onFilterChange={setFilter}
          onAddNew={() => setIsFormOpen(true)}
        />

        <ErrorMessage error={error} />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <ul className="space-y-3">
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onEdit={handleEditTodo}
              onDelete={deleteTodo}
              searchTerm={searchTerm}
            />
          </ul>
        )}

        <TodoForm
          isOpen={isFormOpen}
          onClose={handleFormClose}
          editingTodo={editingTodo}
          onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
        />
      </div>
    </div>
  );
};

export default App;
