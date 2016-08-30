const main = {
  template: require('./main.html'),
  /** @ngInject */
  controller($ngRedux, actions, $scope, toastr) {
    const $ctrl = this;
    $ctrl.$onInit = function () {
      $ctrl.getTodos();
    };
    $scope.$watch('$ctrl.fetchError', () => {
      if ($ctrl.fetchError.status) {
        toastr.error($ctrl.fetchError.text, 'Error');
      }
    });

    $ctrl.mapStateTo$ctrl = function (state) {
      return {
        todos: state.todos,
        isFetching: state.todos.isFetching,
        fetchError: state.todos.fetchError
      };
    };
    $ctrl.$onDestroy = $ngRedux.connect($ctrl.mapStateTo$ctrl, actions)($ctrl);
  }
};

export default main;
