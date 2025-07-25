import { EditingTodo } from './EditingTodo';
import { CompletedTodo } from './CompletedTodo';
import { EditButton } from './EditButton';
import { DeleteButton } from './DeleteButton';

export const TodoItem = (props) => {
  const { todo, editProps, todoActions } = props;
  const edit = editProps.currentTodo && editProps.currentTodo.id === todo.id;
  return (
    <>
      {edit ?
        <EditingTodo 
          key={todo.id}
          currentTodo={editProps.currentTodo.text}
          onEditTodo={editProps.onEditTodo}
          cancelEdit={editProps.cancelEdit}
          updateTodos={editProps.updateTodos}
        />
      :
        <li key={todo.id} className={`grid grid-cols-12 items-center gap-x-2 mb-4 ${editProps.currentTodo ? 'opacity-50' : ''}`}>
          <CompletedTodo 
            isCompleted={todo.completed}
            toggleTodo={todoActions.toggleTodo}
            isEditing={editProps.currentTodo}
            todoTitle={todo.text}
          />
          <EditButton
            onClickEdit={todoActions.onClickEdit}
            isEditing={editProps.currentTodo}
            />
          <DeleteButton
            onClickDelete={todoActions.onClickDelete}
            isEditing={editProps.currentTodo}
          />
        </li>
      }
    </>
  );
}
