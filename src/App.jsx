import { useRef, useState } from 'react'
import './App.css'

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

  const updateTodos = (todo) => {
    if (currentTodo && currentTodo.text.trim()) {
      setTodos(todos.map(todo =>
        todo.id === currentTodo.id ? currentTodo : todo
      ));
      setIsEditing(false);
      setCurrentTodo(null);
    }
  }

  return (
    <>
      <h1 className='mb-8'>Todo App</h1>
      <div className='flex mb-8 gap-x-2'>
        <input type="text" className='flex-1 border-2 border-white rounded-xl p-2' value={input} onChange={addTodoText} name='todo-input' />
        <button onClick={addTodo} className='bg-blue-500'>追加</button>
      </div>
      <div className='mb-8'>
        <p>全てのタスク: {todos.length} / 完了済み: {completedTodos(todos)} / 未完了: {incompletedTodos(todos)}</p>
      </div>
      <div>
        <ul>
        {todos.map((todo) => {
          if (isEditing && currentTodo && currentTodo.id === todo.id) {
            return (
              <li key={todo.id} className='grid grid-cols-12 items-center gap-x-2 mb-4'>
                <input 
                  className='col-span-6 border-2 border-white rounded-xl p-2'
                  value={currentTodo.text}
                  onChange={(e) => setCurrentTodo({...currentTodo, text: e.target.value})}
                />
                <button onClick={() => cancelEdit()} className='col-span-3 bg-zinc-600'>戻る</button>
                <button onClick={() => updateTodos()} className='col-span-3 bg-emerald-600'>更新</button>
              </li>
            );
          }
          
          return (
            <li key={todo.id} className={`grid grid-cols-12 items-center gap-x-2 mb-4 ${isEditing ? 'opacity-50' : ''}`}>
              <input 
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className='col-span-1'
                disabled={isEditing}
              />
              <p className={`col-span-5 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
              </p>
              <button 
                onClick={() => editTodo(todo)} 
                className='col-span-3 bg-zinc-600'
                disabled={isEditing}
              >
                編集
              </button>
              <button 
                onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))} 
                className='col-span-3 bg-red-600'
                disabled={isEditing}
              >
                削除
              </button>
            </li>
          );
        })}
        </ul>
      </div>
    </>
  )
}

export default App
