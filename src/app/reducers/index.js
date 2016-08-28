const INITIAL_STATE = {
  isFetching: false,
  items: [],
  fetchError: {
    status: false
  }
};
export default function reducers(state = INITIAL_STATE, action) {
  if (!action || !action.type) {
    return state;
  }
  const newState = Object.assign({}, state);
  newState.fetchError = {};
  newState.isFetching = false;
  switch (action.type) {
    case 'FETCHING': {
      newState.isFetching = true;
      return newState;
    }
    case 'FETCH_ERROR': {
      newState.fetchError = {
        status: true,
        text: action.error
      };
      return newState;
    }
    case 'GET_TODOS': {
      newState.items = action.todos;
      return newState;
    }
    case 'ADD_TODO': {
      newState.items.push(action.todo);
      return newState;
    }
    case 'EDIT_TODO': {
      const currentEditTodo = newState.items.find(
        (item) => (item.id === action.todo.id)
      );
      if (currentEditTodo) {
        Object.assign(currentEditTodo, action.todo);
      }
      return newState;
    }
    case 'REMOVE_TODO': {
      const removeTodoIndex = newState.items.findIndex(
        (item) => (item.id === action.todo.id)
      );
      if (removeTodoIndex >= 0) {
        newState.items.splice(removeTodoIndex, 1);
      }
      return newState;
    }
    default:
      return state;
  }
}
