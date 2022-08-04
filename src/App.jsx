/* eslint-disable no-param-reassign */
import {
  Card,
  CardContent,
  Typography,
  Input,
  ListItem,
  ListItemText,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    setAllTodos(JSON.parse(localStorage.getItem('todos')) || []);
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return allTodos.filter((todo) => !todo.completed);
      case 'completed':
        return allTodos.filter((todo) => todo.completed);
      default:
        return allTodos;
    }
  }, [allTodos, filter]);

  // eslint-disable-next-line max-len
  const activeTodosCount = useMemo(() => allTodos.filter((todo) => !todo.completed).length, [allTodos]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (input.trim() === '') {
      return;
    }

    const newTodo = {
      id: allTodos.length + 1,
      text: input,
      completed: false,
    };
    const newTodos = [...allTodos, newTodo];
    setAllTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setInput('');
  };

  const handleCompleted = (id) => {
    setAllTodos(
      allTodos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    );
    localStorage.setItem('todos', JSON.stringify(allTodos));
  };

  const deleteItem = (id) => {
    const filtered = allTodos.filter((todo) => todo.id !== id);
    setAllTodos(filtered);
    localStorage.setItem('todos', JSON.stringify(filtered));
  };

  return (
    <div>
      <h1 className="title">todos</h1>
      <Card style={{ margin: '30px auto', maxWidth: '500px' }} className="todo_container">
        <CardContent>
          <form onSubmit={onSubmit}>
            <Input onInput={(e) => setInput(e.target.value)} value={input} placeholder="What need to be done ?" fullWidth style={{ padding: '5px 0', fontSize: '1.3rem' }} />
          </form>

          {filteredTodos.length > 0 ? filteredTodos.map((todo) => (
            <ListItem key={todo.id} style={{ borderBottom: '1px solid #ccc' }} className="item">
              <label className="custom_check_box" htmlFor={todo.id}>
                <input id={todo.id} type="checkbox" checked={todo.completed ? 'checked' : ''} onChange={() => handleCompleted(todo.id)} />
                <span className="checkmark" />
              </label>
              <ListItemText primary={todo.text} style={{ color: todo.completed ? '#cecece' : '#000', textDecoration: todo.completed ? 'line-through' : 'none' }} />
              <button type="button" onClick={() => deleteItem(todo.id)} className="cross">&times;</button>
            </ListItem>
          )) : (
            <p className="empty">
              no
              {' '}
              { filter }
              {' '}
              todos
            </p>
          )}
        </CardContent>
        <div className="card_footer">
          <Typography variant="body2" color="text.secondary">
            {activeTodosCount}
            {' '}
            items left
          </Typography>
          <div>
            <button type="button" onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
            <button type="button" onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Active</button>
            <button type="button" onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default App;
