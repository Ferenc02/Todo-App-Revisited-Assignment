import { ethers } from "ethers";
import {
  abi as contractAbi,
  address as contractAddress,
} from "../contract/config.js";

export const connectToBlockchain = async (provider) => {
  if (!provider) return;

  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();

  const readContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    provider
  );

  const writeContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );

  return { signer, readContract, writeContract };
};

export const getBalance = async (provider, walletAddress) => {
  try {
    const balance = await provider.getBalance(walletAddress);
    return ethers.formatEther(balance);
  } catch (error) {
    return 0;
  }
};

export const getTodosFromContract = async (readContract) => {
  try {
    const count = await readContract.todoCount();

    let todos = [];
    for (let i = 1; i <= count; i++) {
      const todo = await readContract.todos(i);

      if (todo.text !== "") {
        todos.push({
          id: todo.id,
          text: todo.text,
          completed: todo.completed,
        });
      }
    }

    return todos;
  } catch (error) {
    if (error.reason === "rejected") {
      return "rejected";
    }
    alert("Error fetching todos from the contract");
    return [];
  }
};

export const writeToContract = async (writeContract, text) => {
  try {
    await writeContract.createTodo(text);
  } catch (error) {
    return error.reason === "rejected" ? "rejected" : error;
  }
};

export const removeTodoFromContract = async (writeContract, id) => {
  try {
    await writeContract.removeTodo(id);
  } catch (error) {
    return error.reason === "rejected" ? "rejected" : error;
  }
};

export const toggleTodoFromContract = async (writeContract, id) => {
  try {
    await writeContract.toggleTodo(id);
  } catch (error) {
    return error.reason === "rejected" ? "rejected" : error;
  }
};
