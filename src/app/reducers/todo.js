export default function todo(state = [], action) {
  if (!action || !action.type) {
    return state;
  }
  const newState = Object.assign([], state);
  switch (action.type) {
    case 'GET_TODOS':
      return action.todos;
    case 'REMOVE_ALL_TODOS':
      return [];
    case 'ADD_TODO':
      newState.push(action.todo);
      return newState;
    case 'EDIT_TODO': {
      const currentEditTodo = newState.find(
        (item) => (item.id === action.todo.id)
      );
      if (currentEditTodo) {
        Object.assign(currentEditTodo, action.todo);
      }
      return newState;
    }
    case 'REMOVE_TODO': {
      const removeTodoIndex = newState.findIndex(
        (item) => (item.id === action.todo.id)
      );
      if (removeTodoIndex >= 0) {
        newState.splice(removeTodoIndex, 1);
      }
      return newState;
    }
    default:
      return state;
  }
}
