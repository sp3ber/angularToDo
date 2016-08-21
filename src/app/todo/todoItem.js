import './todo.scss';

const escapeKeyCode = 27;

export const todoItem = {
  template: require('./todoItem.html'),
  bindings: {
    todo: '<',
    isEditable: '<',
    setEditableTodo: '<',
    editTodo: '<',
  },
  controller: function ($scope, $timeout) {
    /** @ngInject */

    this.cancelEdit = cancelEdit.bind(this);
    this.blurTodo = blurTodo.bind(this);

    function cancelEdit(event) {
      // revert model on escape btn
      // example from documentation -
      // https://docs.angularjs.org/api/ng/type/ngModel.NgModelController
      if (event.keyCode === escapeKeyCode) {
        $scope.todoForm.$rollbackViewValue();
        this.setEditableTodo(null);
      }
    }
    function blurTodo(){
      //this timeout is needed, because blur event fired early,
      //then model updates in updateOn blur
      // more details -
      // http://stackoverflow.com/questions/28776824/ng-blur-the-models-updated-value-is-not-avaiable-in-event
      $timeout(function(){
        this.editTodo(this.todo)
      }.bind(this));
    }
  }
};
