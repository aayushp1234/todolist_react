// todoform.js
import React, { useState, useEffect, useRef } from 'react';

function TodoForm({ onSubmit, edit }) {
  const [input, setInput] = useState(edit ? edit.value : '');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: edit ? edit.id : Math.floor(Math.random() * 10000),
      text: input,
    });
    setInput('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={edit ? '' : 'Add your task'}
        value={input}
        name="text"
        className={edit ? 'todo-input edit' : 'todo-input'}
        onChange={handleChange}
        ref={inputRef}
      />
      <button className={edit ? 'todo-button edit' : 'todo-button'}>
        {edit ? 'Update' : 'Add'}
      </button>
    </form>
  );
}

export default TodoForm;
