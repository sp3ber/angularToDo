export default function firebaseService($ngRedux, $firebaseObject, $firebaseArray) {

  var config = {
    apiKey: "AIzaSyB-lVFYWcGWRrtDyHC7tU9BLCgzmzIWgSc",
    authDomain: "angulartodo-99632.firebaseapp.com",
    databaseURL: "https://angulartodo-99632.firebaseio.com",
    storageBucket: ""
  };
  firebase.initializeApp(config);
  var ref = firebase.database().ref().child('todos');

  const getTodos = () => {
    let data = $firebaseArray(ref);
    data.$loaded()
  };
  const removeAllTodos = ()=> {
    let data = $firebaseArray(ref);
    data.$loaded().then(function () {
      data.forEach(function (item, index) {
        data.$remove(index);
      })
    });
    this.getTodos();
  };
  const addTodo = (todo)=> {
      ref.push(todo);
  };
  return {
    addTodo,
    removeAllTodos,
    getTodos
  }
}