import todoActions from './actions/todo-actions';
export const main = {
  template: require('./main.html'),
  controller: function ($ngRedux, $scope) {
    /** @ngInject */

    this.$onInit = function() {
      //this.getAsyncTodos();
      console.log(this.todos);
    };

    this.todos = [];

    const unsubscribe = $ngRedux.connect(this.mapStateToThis, todoActions)(this);
    $scope.$on('$destroy', unsubscribe);

    this.mapStateToThis = function (state) {
      return {
        todos: state.todos
      };
    };
  }
};
