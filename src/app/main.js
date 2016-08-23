import todoActions from './actions/todo-actions';
export const main = {
  template: require('./main.html'),
  controller: function ($ngRedux, $firebaseObject, $scope, $firebaseArray) {
    /** @ngInject */
    this.todos = [];
    this.$onInit = function() {
      var config = {
        apiKey: "AIzaSyB-lVFYWcGWRrtDyHC7tU9BLCgzmzIWgSc",
        authDomain: "angulartodo-99632.firebaseapp.com",
        databaseURL: "https://angulartodo-99632.firebaseio.com",
        storageBucket: ""
      };
      firebase.initializeApp(config);
      var ref = firebase.database().ref();
    };

    this.mapStateToThis = function (state) {
      return {
        todos: state.todos
      };
    };
    const unsubscribe = $ngRedux.connect(this.mapStateToThis, todoActions)(this);
    $scope.$on('$destroy', unsubscribe);
  }
};
