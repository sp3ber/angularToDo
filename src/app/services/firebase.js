export default function firebaseService($ngRedux, $firebaseObject, $firebaseArray) {
  const config = {
    apiKey: "AIzaSyB-lVFYWcGWRrtDyHC7tU9BLCgzmzIWgSc",
    authDomain: "angulartodo-99632.firebaseapp.com",
    databaseURL: "https://angulartodo-99632.firebaseio.com",
    storageBucket: ""
  };
  firebase.initializeApp(config);
  const ref = firebase.database().ref().child('todos');

  const getTodos = () => {
    const data = $firebaseArray(ref);
    return data.$loaded().then(() => {
      return data.map(createPlaneObjectFrom);
    });
  };
  const removeAllTodos = () => {
    const data = $firebaseArray(ref);
    return data.$loaded().then(() => {
      data.forEach((item, index) => (
        data.$remove(index)
      ));
    });
  };
  const addTodo = (todo) => {
    const data = $firebaseArray(ref);
    return data
      .$add(todo)
      .then((todoRef) => (
        {
          id: todoRef.key,
          ...todo
        }
      ));
  };
  const removeTodo = (todo) => {
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
  };
  const editTodo = (todo) => {
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
  };

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
