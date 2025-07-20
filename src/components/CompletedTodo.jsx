export const CompletedTodo = (props) => {
    const { isCompleted, toggleTodo, isEditing, todoTitle } = props;
    return (
      <>
        <input 
          type="checkbox"
          checked={isCompleted}
          onChange={toggleTodo}
          className='col-span-1'
          disabled={isEditing}
        />
        <p className={`col-span-5 ${isCompleted ? 'line-through text-gray-500' : ''}`}>
          {todoTitle}
        </p>
      </>
    );
}
