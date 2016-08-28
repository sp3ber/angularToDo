export const main = {
  template: require('./main.html'),
  controller($ngRedux, todoActions) {
    /** @ngInject */
    const $ctrl = this;
    $ctrl.$onInit = function () {
      $ctrl.getTodos();
    };

    $ctrl.onLoading = false;

    $ctrl.mapStateTo$ctrl = function (state) {
      return {
        todos: state.todos
      };
    };
    $ctrl.$onDestroy = $ngRedux.connect($ctrl.mapStateTo$ctrl, todoActions)($ctrl);
  }
};
