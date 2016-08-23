import todoActions from './actions/todo-actions';

export const main = {
  template: require('./main.html'),
  controller: function ($ngRedux, $scope, todoActions) {
    /** @ngInject */
    this.todos = [];
    this.$onInit = function(){
      this.getTodos();
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
