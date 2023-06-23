// todolist.js
import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  const completeTodo = (todo) => {
    setCompleteTodos((prev) => [...prev, todo]);
  };

  const deleteCompletedTodo = (id) => {
    const updatedCompleteTodos = completeTodos.filter(
      (item) => item.id !== id
    );
    setCompleteTodos(updatedCompleteTodos);
  };

  return (
    <div>
      <h1>Tasks for the day!</h1>
      <TodoForm onSubmit={addTodo} />
      <div className="todo-container">
        <ul className="todo-list"></ul>
        <ul className="completed-list"></ul>
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
