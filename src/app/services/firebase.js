/** @ngInject */
export default function firebaseService($timeout, $ngRedux, $firebaseObject, $firebaseArray, firebaseApiConfig) {
  firebase.initializeApp(firebaseApiConfig);
  const ref = firebase.database().ref().child('todos');
  const NETWORK_TEMEOUT_MS = 10000;

  function getTodos() {
    const data = $firebaseArray(ref);
    const fetchTodosPromise = data.$loaded().then(getPlaneTodos);
    const timeOutPromise = new Promise(rejectTimeoutErr);

    return Promise.race([fetchTodosPromise, timeOutPromise]);

    function getPlaneTodos() {
      return data.map(createPlaneObjectFrom);
    }
    function rejectTimeoutErr(_resolve, reject) {
      return $timeout(() => reject(new Error('request timeout')), NETWORK_TEMEOUT_MS);
    }
  }
  function addTodo(todo) {
    const data = $firebaseArray(ref);
    return data
      .$add(todo)
      .then(getPlaneTodoFromRef);

    function getPlaneTodoFromRef(todoRef) {
      return {
        id: todoRef.key,
        ...todo
      };
    }
  }
  function removeTodo(todo) {
    // don't use $save method for $todoArray, because it needs index,
    // which could change when when making async operations
    const todoRef = firebase.database().ref().child(`todos/${todo.id}`);
    const todoFromDb = $firebaseObject(todoRef);
    return todoFromDb.$loaded().then(removeAndGetTodo);

    function removeAndGetTodo() {
      return todoFromDb
        .$remove()
        .then(() => (todo));
    }
  }
  function editTodo(todo) {
    const {id, ...paramsToSave} = todo;
    // don't use $save method for $todoArray, because it needs index,
    // which could change when when making async operations
    const todoRef = firebase.database().ref().child(`todos/${id}`);
    const todoFromDb = $firebaseObject(todoRef);
    return todoFromDb.$loaded().then(saveAndGetPlaneTodo);

    function saveAndGetPlaneTodo() {
      Object.assign(todoFromDb, paramsToSave);
      return todoFromDb.$save().then(() => (
        createPlaneObjectFrom(todoFromDb)
      ));
    }
  }

  function createPlaneObjectFrom(firebaseObj) {
    const result = Object.assign({}, firebaseObj);
    Object.keys(result).forEach((key) => {
      if (key[0] === '$') {
        delete result[key];
      }
    });
    result.id = firebaseObj.$id;
    return result;
  }

  return {
    addTodo,
    getTodos,
    editTodo,
    removeTodo
  };
}
