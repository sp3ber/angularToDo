import todoActions from './actions/todo-actions';

export const main = {
  template: require('./main.html'),
  controller: function ($ngRedux, $scope, todoActions) {
    /** @ngInject */
    const $ctrl = this;
    $ctrl.$onInit = function(){
      $ctrl.getTodos();
    };

    $ctrl.onLoading = false;

    $ctrl.mapStateTo$ctrl = function (state) {
      return {
        todos: state.todos
      };
    };
    const unsubscribe = $ngRedux.connect($ctrl.mapStateTo$ctrl, todoActions)($ctrl);
    $scope.$on('$destroy', unsubscribe);
  }
};
