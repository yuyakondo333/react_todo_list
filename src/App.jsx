import { useRef, useState } from 'react'
import './App.css'
import { InputTodo } from './components/InputTodo';
import { TodoItem } from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [currentTodo, setCurrentTodo] = useState(null);
  const nextId = useRef(1);

  const addTodoText = (event) => setInput(event.target.value);

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos([...todos, {
      id: nextId.current++,
      text: input,
      completed: false,
    }])
    setInput('');
  }

  const toggleTodo = (todoId) => {
    setTodos(prevTodos =>
      prevTodos.map(t =>
        t.id === todoId ? { ...t, completed: !t.completed } : t
      )
    );
  }

  const completedTodos = todos.filter(todo => todo.completed).length;
  const incompletedTodos = todos.filter(todo => !todo.completed).length;

  const onEditTodo = (e) => {
    setCurrentTodo({...currentTodo, text: e.target.value});
  }

  const cancelEdit = () => setCurrentTodo(null);

  const updateTodos = () => {
    if (currentTodo && currentTodo.text.trim()) {
      setTodos(todos.map(todo =>
        todo.id === currentTodo.id ? currentTodo : todo
      ));
      setCurrentTodo(null);
    }
  }

  const editTodo = (todo) => setCurrentTodo({...todo});

  const deleteTodo = (todoId) => {
    const message = '本当によろしいですか？';
    if (confirm(message))  {
      setTodos(todos.filter(todo => todo.id !== todoId));
    }
  }

  return (
    <>
      <h1 className='mb-8'>Todo App</h1>
      <InputTodo
        todoText={input}
        onChangeTodoText={addTodoText}
        addTodo={addTodo}
      />
      <div className='mb-8'>
        <p>全てのタスク: {todos.length} / 完了済み: {completedTodos} / 未完了: {incompletedTodos}</p>
      </div>
      <div>
        <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editProps={{
              currentTodo,
              onEditTodo,
              cancelEdit,
              updateTodos,
            }}
            todoActions={{
              toggleTodo: () => toggleTodo(todo.id),
              onClickEdit : () => editTodo(todo),
              onClickDelete: () => deleteTodo(todo.id),
            }}
          />
        ))}
        </ul>
      </div>
    </>
  )
}

export default App
