function addTodo(todo) {
  return {
    type: 'ADD_TODO',
    todo: todo
  };
}
function editTodo(todo) {
  return {
    type: 'EDIT_TODO',
    todo: todo
  };
}
function getAsyncTodos(){
  return dispatch => {
    setTimeout(() => {
      dispatch(addTodo({"text": "fuck"}));
    }, 5000);
  };
}

export default { addTodo, editTodo };