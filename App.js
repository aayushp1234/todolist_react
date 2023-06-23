import React from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Todo from './components/Todo';
function App() {
  return (
    <div className="todo-app">
      <TodoList/>
    </div>
  );
}

export default App;
