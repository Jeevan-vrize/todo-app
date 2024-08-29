import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const addTodo = e => {
    e.preventDefault();
    if (!text.trim()) return;

    if (isEditing) {
      setTodos(todos.map(todo => 
        todo.id === currentTodo.id ? { ...todo, text } : todo
      ));
      setIsEditing(false);
      setCurrentTodo(null);
    } else {
      const newTodo = { id: Date.now(), text, completed: false };
      setTodos([newTodo, ...todos]);
    }

    setText('');
  };

  const toggleComplete = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = todo => {
    setIsEditing(true);
    setText(todo.text);
    setCurrentTodo(todo);
  };

  return (
    <div className="app">
      <h1 className="app-title">My ToDo List</h1>
      <form className="add-todo" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
      </form>
      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className={`todo ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-text" onClick={() => toggleComplete(todo.id)}>
              {todo.text}
            </div>
            <div className="actions">
              <button
                className={`complete-button ${todo.completed ? 'done' : 'not-done'}`}
                onClick={() => toggleComplete(todo.id)}
                title={todo.completed ? 'Mark as not done' : 'Mark as done'}
              >
                {todo.completed ? '✔️' : '❌'}
              </button>
              <button
                className="edit-button"
                onClick={() => editTodo(todo)}
                title="Edit task"
              >
                ✏️
              </button>
              <button
                className="delete-button"
                onClick={() => deleteTodo(todo.id)}
                title="Delete task"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
