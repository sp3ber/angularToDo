/** @ngInject */
export default function firebaseService($timeout, $ngRedux, $firebaseObject, $firebaseArray, firebaseApiConfig) {
  firebase.initializeApp(firebaseApiConfig);
  const ref = firebase.database().ref().child('todos');

  function getTodos () {
    const data = $firebaseArray(ref);

    return Promise.race([
      data.$loaded().then(() => {
        return data.map(createPlaneObjectFrom);
      }),
      new Promise((resolve, reject) => {
        $timeout(() => reject(new Error('request timeout')), 5000);
      })
    ]);
  }
  function removeAllTodos () {
    const data = $firebaseArray(ref);
    return data.$loaded().then(() => { data.forEach((item, index) => (data.$remove(index)));});
  }
  function addTodo (todo) {
    const data = $firebaseArray(ref);
    return data
      .$add(todo)
      .then((todoRef) => (
        {
          id: todoRef.key,
          ...todo
        }
      ));
  }
  function removeTodo (todo) {
    // don't use $save method for $todoArray, because it needs index,
    // which could change when when making async operations
    const todoRef = firebase.database().ref().child(`todos/${todo.id}`);
    const todoFromDb = $firebaseObject(todoRef);
    return todoFromDb.$loaded().then(() => {
      remove(todoFromDb);
    });
    function remove(todoFromDb) {
      return todoFromDb.$remove().then(() => (
        todo
      ));
    }
  }
  function editTodo (todo) {
    const {id, ...paramsToSave} = todo;
    // don't use $save method for $todoArray, because it needs index,
    // which could change when when making async operations
    const todoRef = firebase.database().ref().child(`todos/${id}`);
    const todoFromDb = $firebaseObject(todoRef);
    return todoFromDb.$loaded().then(() => {
      saveTodo(todoFromDb, paramsToSave);
    });

    function saveTodo(todo, newParams) {
      Object.assign(todo, newParams);
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
    removeAllTodos,
    getTodos,
    editTodo,
    removeTodo
  };
}
