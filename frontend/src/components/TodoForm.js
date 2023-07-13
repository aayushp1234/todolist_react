import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function TodoForm({ onSubmit, edit }) {
  const [input, setInput] = useState(edit ? edit.value : '');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const newTodo = { text: input };

    try {
      if (edit) {
        await axios.patch(`/api/todos/${edit.id}/`, newTodo);
        onSubmit(edit.id, newTodo);
      } else {
        const response = await axios.post('/api/todos/', newTodo);
        onSubmit(response.data);
      }
      setInput('');
    } catch (error) {
      console.error('Error submitting todo:', error);
    }
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
