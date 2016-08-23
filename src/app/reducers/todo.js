const INITIAL_STATE = [
  {
    "id": 1,
    "text": "my todo item 1",
    "active": true
  },
  {
    "id": 2,
    "text": "my todo item 2",
    "active": true
  }
];

export default function todo(state = INITIAL_STATE, action) {
  if (!action || !action.type) {
    return state;
  }
  let newState = Object.assign([], state);
  switch (action.type) {
    case 'ADD_TODO':
      newState.push(action.todo);
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