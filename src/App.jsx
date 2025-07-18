import { useRef, useState } from 'react'
import './App.css'
import { InputTodo } from './components/InputTodo';
import { TodoItem } from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const nextId = useRef(1);

  const addTodoText = (event) => setInput(event.target.value);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, {
        id: nextId.current++,
        text: input,
        completed: false,
      }])
      setInput('');
    }
  }

  const toggleTodo = (todoId) => {
    setTodos(prevTodos =>
      prevTodos.map(t =>
        t.id === todoId ? { ...t, completed: !t.completed } : t
      )
    );
  }

  const completedTodos = (todos) => todos.filter(todo => todo.completed).length;
  const incompletedTodos = (todos) => todos.filter(todo => !todo.completed).length;

  const editTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo({...todo});
  }

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentTodo(null);
  };

  const updateTodos = () => {
    if (currentTodo && currentTodo.text.trim()) {
      setTodos(todos.map(todo =>
        todo.id === currentTodo.id ? currentTodo : todo
      ));
      setIsEditing(false);
      setCurrentTodo(null);
    }
  }

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
        <p>全てのタスク: {todos.length} / 完了済み: {completedTodos(todos)} / 未完了: {incompletedTodos(todos)}</p>
      </div>
      <div>
        <ul>
        {todos.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              editProps={{
                isEditing: isEditing,
                currentTodo: currentTodo,
                onEditTodo: (e) => setCurrentTodo({...currentTodo, text: e.target.value}),
                cancelEdit: () => cancelEdit(),
                updateTodos: () => updateTodos(),
              }}
              todoActions={{
                toggleTodo: () => toggleTodo(todo.id),
                onClickEdit : () => editTodo(todo),
                onClickDelete: () => deleteTodo(todo.id),
              }}
            />
          );
        })}
        </ul>
      </div>
    </>
  )
}

export default App
