export const EditButton = (props) => {
  const { onClickEdit, isEditing } = props;
  return (
    <button 
      onClick={onClickEdit} 
      className='col-span-3 bg-zinc-600'
      disabled={isEditing}
    >
      編集
    </button>
  );
}
