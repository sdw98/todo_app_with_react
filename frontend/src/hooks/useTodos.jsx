import { useEffect, useState } from "react";
import { todoApi } from "../services/api";

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, completed, pending
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTodos = async () => {
    try {
      setLoading(true);

      let data;

      if (searchTerm.trim()) {
        data = await todoApi.searchTodos(searchTerm);
      } else if (filter === "completed") {
        data = await todoApi.getTodosByCompleted(true);
      } else if (filter === "pending") {
        data = await todoApi.getTodosByCompleted(false);
      } else {
        data = await todoApi.getAllTodos();
      }

      setTodos(data);
    } catch (err) {
      setError("할 일을 불러오는데 실패했습니다.");
      console.error("Error loading todos:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await todoApi.getStats();
      setStats(statsData);
    } catch (err) {
      console.error("Error loading stats:", err);
    }
  };

  const createTodo = async (todoData) => {
    try {
      await todoApi.createTodo(todoData);
      await loadTodos();
      await loadStats();
    } catch (err) {
      setError("할 일 생성에 실패했습니다.");
      console.error("Error creating todo:", err);
    }
  };

  const updateTodo = async (id, todoData) => {
    try {
      await todoApi.updateTodo(id, todoData);
      await loadTodos();
      await loadStats();
    } catch (err) {
      setError("할 일 수정에 실패했습니다.");
      console.error("Error updating todo:", err);
    }
  };

  const toggleTodo = async (id) => {
    try {
      await todoApi.toggleTodoCompleted(id);
      await loadTodos();
      await loadStats();
    } catch (err) {
      setError("상태 변경에 실패했습니다.");
      console.error("Error toggling todo:", err);
    }
  };

  const deleteTodo = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await todoApi.deleteTodo(id);
      await loadTodos();
      await loadStats();
    } catch (err) {
      setError("할 일 삭제에 실패했습니다.");
      console.error("Error deleting todo:", err);
    }
  };

  useEffect(() => {
    loadTodos();
    loadStats();
  }, []);

  useEffect(() => {
    loadTodos();
  }, [searchTerm, filter]);

  return {
    todos,
    stats,
    toggleTodo,
    updateTodo,
    deleteTodo,
    createTodo,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    loading,
    error,
  };
};

export default useTodos;
