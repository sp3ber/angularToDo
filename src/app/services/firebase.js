export default function firebaseService($ngRedux, $firebaseObject, $firebaseArray, $q) {

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
    return data.$loaded().then(()=>(data));
  };
  const removeAllTodos = ()=> {
    let data = $firebaseArray(ref);
    return data.$loaded().then(()=>{
      data.forEach(()=> (
        data.$remove(index)
      ));
    });
  };
  const addTodo = (todo)=> {
      return ref.push(todo);
  };
  return {
    addTodo,
    removeAllTodos,
    getTodos
  }
}