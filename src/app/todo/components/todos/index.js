import './todos.scss';

export const todos = {
  template: require('./todos.html'),
  bindings: {
    parentTodos: '<todos',
    addTodo: '<',
    removeTodo: '<',
    editTodo: '<',
    getTodos: '<',
    removeAllTodos: '<'
  },
  controller() {
    const $ctrl = this;
    let currentEditableTodo = null;
    $ctrl.$onChanges = function () {
      copyTodosFromParent();
      setEditableTodo(null);
    };
    $ctrl.$onInit = function () {
      $ctrl.currentFilter = $ctrl.noFilter;
    };
    $ctrl.isEditable = isEditable;
    $ctrl.setEditableTodo = setEditableTodo;
    $ctrl.sendTodo = sendTodo;
    $ctrl.createTodo = createTodo;
    $ctrl.getTodoIndex = getTodoIndex;
    $ctrl.activeFilter = activeFilter;
    $ctrl.finishedFilter = finishedFilter;
    $ctrl.noFilter = noFilter;
    $ctrl.activeFilter = activeFilter;
    $ctrl.setFilter = setFilter;
    $ctrl.isCurrentFilter = isCurrentFilter;
    $ctrl.isEditableMode = isEditableMode;

    function isEditable(todo) {
      return todo === currentEditableTodo;
    }

    function setEditableTodo(todo) {
      currentEditableTodo = todo;
    }

    function isEditableMode() {
      return currentEditableTodo !== null;
    }

    function getTodoIndex(todo) {
      return $ctrl.parentTodos.findIndex((item) => (
        item.id === todo.id
      ));
    }

    function createTodo() {
      // reset filter, it's not nice to create new
      // todoItem when you looking for finished items
      if ($ctrl.currentFilter === $ctrl.finishedFilter) {
        $ctrl.setFilter($ctrl.noFilter);
      }
      const newEmptyTodo = {
        text: ''
      };
      $ctrl.todos.push(
        newEmptyTodo
      );
      setEditableTodo(newEmptyTodo);
    }

    function sendTodo(todo) {
      // clean new empty todo
      if (isTodoEmpty(todo) && isNewTodo(todo)) {
        setEditableTodo(null);
        copyTodosFromParent();
        return;
      }
      if (!isNewTodo(todo) && isTodoEmpty(todo)) {
        setEditableTodo(null);
        return $ctrl.removeTodo(todo);
      }
      if (!isNewTodo(todo)) {
        setEditableTodo(null);
        return isTodoChanged(todo) ? $ctrl.editTodo(todo) : null;
      }
      setEditableTodo(null);
      return $ctrl.addTodo(todo);
    }

    function isNewTodo(todo) {
      return !('id' in todo);
    }

    function isTodoEmpty(todo) {
      return todo.text.trim() === '';
    }

    function isTodoChanged(todo) {
      const parentTodo = $ctrl.todos.find((item) => (item.id === todo.id));
      return !angular.equals(parentTodo, todo);
    }

    function finishedFilter(todo) {
      return Boolean(todo.finished);
    }

    function activeFilter(todo) {
      return !todo.finished;
    }

    function noFilter() {
      return true;
    }

    function setFilter(filter) {
      $ctrl.currentFilter = filter;
    }

    function isCurrentFilter(filter) {
      return $ctrl.currentFilter === filter;
    }

    function copyTodosFromParent() {
      $ctrl.todos = Object.assign([], $ctrl.parentTodos.items);
    }
  }
};
