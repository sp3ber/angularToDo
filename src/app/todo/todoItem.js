import './todo.scss';

const escapeKeyCode = 27;

export const todoItem = {
  template: require('./todoItem.html'),
  bindings: {
    parentTodo: '<todo',
    isEditableParent: '<isEditable',
    setEditableTodoParent: '<setEditableTodo',
    sendTodoParent: '<sendTodo',
  },
  controller: function () {
    /** @ngInject */

    this.$onInit = function () {
      this.isEditable = ()=>(this.isEditableParent(this.parentTodo));
      this.setEditableTodo = ()=>(this.setEditableTodoParent(this.parentTodo));
      this.sendTodo = ()=>(this.sendTodoParent(this.todo));
    };

    this.$onChanges = function (changes) {
      this.todo = Object.assign([], this.parentTodo);
    };

    this.cancelEdit = cancelEdit.bind(this);

    function cancelEdit(event) {
      if (event.keyCode === escapeKeyCode) {
        this.currentTodo = Object.assign([], this.todo);
        this.setEditableTodoParent(null);
      }
    }
  }
};
