import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggle, onEdit }) => {
  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </>
  );
};

export default TodoList;
