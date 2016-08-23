import todoActions from './actions/todo-actions';
export const main = {
  template: require('./main.html'),
  controller: function ($ngRedux, $scope) {
    /** @ngInject */
    this.todos = [];
    this.$onInit = function() {
      //this.getAsyncTodos();
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
