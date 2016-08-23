export default function todoActions(firebaseService){
  /** @ngInject */

  console.log(firebaseService);
  function addTodo(todo) {
    return {
      type: 'ADD_TODO',
      todo: todo
    };
  }
  function getTodos(){
    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
    return (dispatch)=>{
      return delay(2000).then(() => {
        console.log('save-async-resolved');
        return dispatch({type:'GET_TODOS', todos:[]});
      });
    }
  }
  function removeAllTodos(todo) {
    return {
      type: 'REMOVE_ALL_TODOS'
    };
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