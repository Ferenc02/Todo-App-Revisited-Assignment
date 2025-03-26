import React, { use } from "react";
import Todo from "./todo";
import catButterfly from "../assets/cat-butterfly.svg";
import { useState, useEffect } from "react";
import { useWallet } from "../context/WalletProvider";
import AddTodo from "./addTodo";

const TodoContainer = () => {
  const {
    wallet,
    hasBrowserExtension,
    writeToContract,
    getTodosFromContract,
    readContract,
    writeContract,
    removeTodoFromContract,
    toggleTodoFromContract,
  } = useWallet();
  const [todo, setTodo] = useState([]);

  const pastelPalette = ["#ffcbe1", "#d6e5be", "#fae1a7", "#dcccea", "#ffdab4"];

  const setCompleted = async (id) => {
    const tx = await toggleTodoFromContract(writeContract, id);

    if (tx === "rejected") {
      alert("You did not accept the transaction");
      return;
    }

    const updatedTodo = todo.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );

    setTodo(updatedTodo);
  };

  const removeTodo = async (id) => {
    const updatedTodo = todo.filter((item) => item.id !== id);
    const tx = await removeTodoFromContract(writeContract, id);

    if (tx === "rejected") {
      alert("You did not accept the transaction");
      return;
    }
    setTodo(updatedTodo);

    // setTodo(updatedTodo);
  };

  const addTodo = async (text) => {
    const tx = await writeToContract(writeContract, text);

    if (tx === "rejected") {
      alert("You did not accept the transaction");
      return;
    }
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTodo([...todo, newTodo]);
  };

  useEffect(() => {
    if (readContract) {
      const fetchTodos = async () => {
        const todos = await getTodosFromContract(readContract);
        setTodo(todos);
      };

      fetchTodos();
    }
  }, [readContract]);

  return (
    <div className="todo-parent">
      <h1>✨ Todo List ✨</h1>

      <div className="cats-container">
        <div className="cats">
          <img src={catButterfly} alt="cat-butterfly" />
          <img src={catButterfly} alt="cat-butterfly" />
        </div>

        <div className="todo-container">
          <AddTodo addTodo={addTodo} />
          <ul>
            {!wallet ? (
              <p>Loading... 🚀</p>
            ) : todo.length === 0 ? (
              <p>No todos found 😢</p>
            ) : (
              todo.map((item, index) => (
                <Todo
                  key={item.id}
                  todo={item}
                  setCompleted={setCompleted}
                  removeTodo={removeTodo}
                  pastelPalette={pastelPalette[index % pastelPalette.length]}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
