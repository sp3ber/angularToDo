export default function todoActions(firebaseService){
  /** @ngInject */

  function addTodo(todo) {
    return (dispatch)=>{
      return firebaseService
        .addTodo(todo)
        .then((todo)=>{
          dispatch(
            {
              type: 'ADD_TODO',
              todo: todo
            }
          )
        })
    }
  }
  function getTodos(){
    return (dispatch)=>{
      return firebaseService
        .getTodos()
        .then((todos)=>{
          console.log(todos);
          dispatch(
            {
              type: 'GET_TODOS',
              todos: todos
            }
          )
        })
    }
  }
  function removeAllTodos() {
    return (dispatch)=>{
      return firebaseService
        .removeAllTodos()
        .then(()=>(
          dispatch({
              type: 'REMOVE_ALL_TODOS'
            })
        ));
    }
  }
  function editTodo(todo) {
    return {
      type: 'EDIT_TODO',
      todo: todo
    };
  }

  return {
    editTodo,
    addTodo,
    removeAllTodos,
    getTodos
  }
}