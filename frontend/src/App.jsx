import Header from "./components/Header";
import StatsCard from "./components/StatsCard";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/useTodos";

const App = () => {
  const { todos, stats, toggleTodo } = useTodos();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-red-100 max-w-4xl mx-auto px-4 py-8">
        <Header />
        <StatsCard stats={stats} />

        <ul className="space-y-3">
          <TodoList todos={todos} onToggle={toggleTodo} />
        </ul>
      </div>
    </div>
  );
};

export default App;
