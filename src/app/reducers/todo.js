export default function todo(state = [], action) {
  if (!action || !action.type) {
    return state;
  }
  let newState = Object.assign([], state);
  switch (action.type) {
    case 'GET_TODOS':
      return action.todos;
      break;
    case 'REMOVE_ALL_TODOS':
      return [];
      break;
    case 'ADD_TODO':
      newState.push(action.todo);
      console.log(newState);
      console.log(action.todo);
      return newState;
    break;
    case 'EDIT_TODO':
      const currentEditTodo = newState.filter(
        (currentTodo)=>(currentTodo.id === action.todo.id)
      )[0];
      if (currentEditTodo) {
        currentEditTodo.text = action.todo.text;
      }
      return newState;
    break;
    default:
      return state;
  }
}