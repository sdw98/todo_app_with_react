import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggle, onEdit, onDelete }) => {
  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default TodoList;
