export default function firebaseService($ngRedux, $firebaseObject, $firebaseArray){
  /** @ngInject */

  console.log('suuper');

  var config = {
    apiKey: "AIzaSyB-lVFYWcGWRrtDyHC7tU9BLCgzmzIWgSc",
    authDomain: "angulartodo-99632.firebaseapp.com",
    databaseURL: "https://angulartodo-99632.firebaseio.com",
    storageBucket: ""
  };
  firebase.initializeApp(config);
  var ref = firebase.database().ref().child('todos');

  let actionCreator = {
    getTodos: () => {
      return function (dispatch) {
        dispatch({
          type:'IS_LOADING'
        });

        let data = $firebaseArray(ref);
        data.$loaded()
          .then(()=>(
            dispatch({
              type: 'GET_TODOS',
              todos: data
            })
          ));
      };
    },
    removeAllTodos: ()=>{
      console.log('remove all');
      let data = $firebaseArray(ref);
      data.$loaded().then(function(){
        data.forEach(function(item, index){
          data.$remove(index);
        })
      });
      return actionCreator.getTodos();
    },
    addTodo: (todo)=>{
      return function (dispatch){
        ref.push(todo);
      }
    }
  };
  return actionCreator;
}