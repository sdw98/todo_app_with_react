import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggle, onEdit, onDelete, searchTerm }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {searchTerm ? "검색 결과가 없습니다" : "할 일이 없습니다"}
        </h3>
        <p className="text-gray-600">
          {searchTerm
            ? "다른 키워드로 검색해보세요"
            : "새로운 할 일을 추가해보세요"}
        </p>
      </div>
    );
  }

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
