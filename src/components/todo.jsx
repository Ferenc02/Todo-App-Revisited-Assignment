import { useEffect } from "react";

const Todo = ({ todo, setCompleted, removeTodo, pastelPalette }) => {
  return (
    <>
      {todo ? (
        <li className="todo" key={todo.id}>
          <div
            className="todo-item"
            onClick={() => setCompleted(todo.id)}
            style={{ backgroundColor: pastelPalette }}
          >
            <span>{todo.text}</span>
            <input
              type="checkbox"
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onChange={() => setCompleted(todo.id)}
            />
          </div>

          <button
            className="todo-delete"
            onClick={() => removeTodo(todo.id)}
            style={{ backgroundColor: pastelPalette }}
          >
            ❌
          </button>
        </li>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Todo;
