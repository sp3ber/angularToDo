import './todo.scss';

const ESCAPE_KEY_CODE = 27;
const ENTER_KEY_CODE = 13;

export const todo = {
  template: require('./todo.html'),
  bindings: {
    parentTodo: '<todo',
    isEditableParent: '<isEditable',
    setEditableTodoParent: '<setEditableTodo',
    sendTodoParent: '<sendTodo',
    removeParentTodo: '<removeTodo'
  },
  controller() {
    const $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.isEditable = () => ($ctrl.isEditableParent($ctrl.parentTodo));
      $ctrl.setEditableTodo = () => ($ctrl.setEditableTodoParent($ctrl.parentTodo));
      $ctrl.sendTodo = () => ($ctrl.sendTodoParent($ctrl.todo));
      $ctrl.removeTodo = () => ($ctrl.removeParentTodo($ctrl.todo));
    };

    $ctrl.$onChanges = function () {
      $ctrl.todo = Object.assign({}, $ctrl.parentTodo);
    };

    $ctrl.onKeyUp = onKeyUp;
    $ctrl.submitTodo = submitTodo;
    $ctrl.revertTodo = revertTodo;
    $ctrl.onBlur = onBlur;
    $ctrl.idKey = getIdKey();
    $ctrl.isFinished = isFinished;

    function onBlur() {
      $ctrl.setEditableTodoParent(null);
      submitTodo();
    }

    function onKeyUp(event) {
      switch (event.keyCode) {
        case ESCAPE_KEY_CODE:
          revertTodo();
          break;
        case ENTER_KEY_CODE:
          event.target.blur();
          break;
        default:
          return;
      }
    }
    function isFinished() {
      return $ctrl.todo && $ctrl.todo.finished;
    }

    function revertTodo() {
      $ctrl.todo = Object.assign({}, $ctrl.parentTodo);
    }

    function submitTodo() {
      $ctrl.sendTodo();
      $ctrl.setEditableTodoParent(null);
    }
    function getIdKey() {
      return Math.round(Math.random() * 100000);
    }
  }
};
