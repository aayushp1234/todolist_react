import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  // Fetch todos from the backend API
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos/');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
  
    try {
      const response = await axios.post('/api/todos/', todo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (todoId, updatedTodo) => {
    if (!updatedTodo.text || /^\s*$/.test(updatedTodo.text)) {
      return;
    }

    try {
      const response = await axios.patch(`/api/todos/${todoId}/`, updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === todoId ? response.data : todo))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}/`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const completeTodo = async (todo) => {
    try {
      const updatedTodo = { ...todo, isComplete: true };
      await axios.patch(`/api/todos/${todo.id}/`, updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.filter((item) => item.id !== todo.id)
      );
      setCompleteTodos((prevCompleteTodos) => [...prevCompleteTodos, todo]);
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  const deleteCompletedTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}/`);
      setCompleteTodos((prevCompleteTodos) =>
        prevCompleteTodos.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error('Error deleting completed todo:', error);
    }
  };

  return (
    <div>
      <h1>Tasks for the day!</h1>
      <TodoForm onSubmit={addTodo} />
      <div className="todo-container">
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
        <ul className="completed-list">
          {completeTodos.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </div>
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        completeTodos={completeTodos}
        deleteCompletedTodo={deleteCompletedTodo}
      />
    </div>
  );
  
}

export default TodoList;
