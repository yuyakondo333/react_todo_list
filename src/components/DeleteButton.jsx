export const DeleteButton = (props) => {
  const { onClickDelete, isEditing } = props;
  return (
    <button 
      onClick={onClickDelete} 
      className='col-span-3 bg-red-600'
      disabled={isEditing}
    >
      削除
    </button>
  );
}
