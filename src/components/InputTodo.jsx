export const InputTodo = (props) => {
    const { todoText, onChangeTodoText, addTodo } = props;
    return (
        <div className='flex mb-8 gap-x-2'>
            <input
                type="text"
                className='flex-1 border-2 border-white rounded-xl p-2'
                value={todoText}
                onChange={onChangeTodoText}
                name='todo-input'
                placeholder="タスクを追加..."
            />
            <button onClick={addTodo} className='bg-blue-500'>追加</button>
        </div>
    );
}
