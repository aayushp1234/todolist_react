import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit, TiTick } from 'react-icons/ti';

function Todo({
  todos,
  completeTodo,
  removeTodo,
  updateTodo,
  completeTodos,
  deleteCompletedTodo,
}) {
  const [activeTab, setActiveTab] = useState('current');
  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  const showTab = (tabId) => {
    setActiveTab(tabId);
  };

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
    });
  };

  const handleCompleteTodo = async (id) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      const updatedTodo = { ...todo, isComplete: true };
      await updateTodo(id, updatedTodo);
      removeTodo(id);
      completeTodo({
        ...todo,
        isComplete: true,
      });
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  const handleDeleteCompletedTodo = async (id) => {
    try {
      await deleteCompletedTodo(id);
    } catch (error) {
      console.error('Error deleting completed todo:', error);
    }
  };

  const handleEditTodo = (id, text) => {
    setEdit({
      id: id,
      value: text,
    });
  };

  if (edit.id) {
    return <TodoForm onSubmit={submitUpdate} edit={edit} />;
  }

  return (
    <div className="todo-app">
      <div className="todo-container">
        <div className="tab-buttons">
          <button
            className={activeTab === 'current' ? 'active' : ''}
            onClick={() => showTab('current')}
          >
            Current Todos
          </button>
          <button
            className={activeTab === 'completed' ? 'active' : ''}
            onClick={() => showTab('completed')}
          >
            Completed Todos
          </button>
        </div>
        {activeTab === 'current' ? (
          <div className="todo-section">
            {todos.map((todo) => (
              <div
                className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
                key={todo.id}
              >
                <div
                  className="todo-text"
                  onClick={() => handleEditTodo(todo.id, todo.text)}
                >
                  {todo.text}
                </div>
                <div className="icons">
                  <RiCloseCircleLine
                    onClick={() => removeTodo(todo.id)}
                    className="delete-icon"
                  />
                  <TiEdit
                    onClick={() => handleEditTodo(todo.id, todo.text)}
                    className="edit-icon"
                  />
                  {!todo.isComplete && (
                    <TiTick
                      onClick={() => handleCompleteTodo(todo.id)}
                      className="complete-icon"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="todo-section">
            {completeTodos.map((todo) => (
              <div className="todo-row complete" key={todo.id}>
                <div className="completed-todo">
                  <span className="completed-tick">&#10004;</span>
                  <div className="todo-text">{todo.text}</div>
                </div>
                <div className="icons">
                  <RiCloseCircleLine
                    onClick={() => handleDeleteCompletedTodo(todo.id)}
                    className="delete-icon"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Todo;
