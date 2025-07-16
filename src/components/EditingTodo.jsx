export const EditingTodo = (props) => {
  const { key, currentTodo, onEditTodo, cancelEdit, updateTodos} = props;
  return (
      <li key={key} className='grid grid-cols-12 items-center gap-x-2 mb-4'>
        <input 
            className='col-span-6 border-2 border-white rounded-xl p-2'
            value={currentTodo}
            onChange={onEditTodo}
        />
        <button onClick={cancelEdit} className='col-span-3 bg-zinc-600'>戻る</button>
        <button onClick={updateTodos} className='col-span-3 bg-emerald-600'>更新</button>
      </li>
  );
}
