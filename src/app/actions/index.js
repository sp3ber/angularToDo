/** @ngInject */
export default function actions(firebaseService) {
  function fetching(){
    return {
      type: 'FETCHING'
    }
  }
  function addTodo(todo) {
    return (dispatch) => (
      firebaseService
        .addTodo(todo)
        .then((todo) => {
          dispatch(
            {
              type: 'ADD_TODO',
              todo
            }
          );
        })
    );
  }

  function removeTodo(todo) {
    return (dispatch) => (
      firebaseService
        .removeTodo(todo)
        .then(() => {
          dispatch(
            {
              type: 'REMOVE_TODO',
              todo
            }
          );
        })
    );
  }

  function getTodos() {
    return (dispatch) => {
      dispatch(fetching());
      firebaseService
        .getTodos()
        .then((todos) => {
          dispatch(
            {
              type: 'GET_TODOS',
              todos
            }
          );
        })
        .catch(() => (
          dispatch(
            {
              type: 'FETCH_ERROR',
              error: 'Could not get todos, check your connection'
            }
          )
        ));
    };
  }

  function removeAllTodos() {
    return (dispatch) => (
      firebaseService
        .removeAllTodos()
        .then(() => (
          dispatch({
            type: 'REMOVE_ALL_TODOS'
          })
        ))
    );
  }

  function editTodo(todo) {
    return (dispatch) => (
      firebaseService
        .editTodo(todo)
        .then(() => {
          dispatch(
            {
              type: 'EDIT_TODO',
              todo
            }
          );
        })
    );
  }

  return {
    editTodo,
    addTodo,
    removeAllTodos,
    getTodos,
    removeTodo
  };
}
