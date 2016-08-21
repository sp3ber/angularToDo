import './todos.scss';
import './add-btn.scss';

export const todoList = {
  template: require('./todoList.html'),
  bindings: {
    todos: '<',
    addItem: '<',
    editItem: '<',
    getTodos: '<'
  },
  controller: function () {
    this.$onChanges = function (changes) {
      this.currentTodos = Object.assign([], this.todos);
    };
    let currentEditableTodo = null;
    this.isEditable = isEditable.bind(this);
    this.setEditableTodo = setEditableTodo.bind(this);
    this.editTodo = editTodo.bind(this);
    this.addTodo = addTodo.bind(this);
    this.isCreatingEmptyTodo = isCreatingEmptyTodo.bind(this);

    function isEditable(todo) {
      return todo === currentEditableTodo;
    }
    function isCreatingEmptyTodo(){
      return currentEditableTodo && currentEditableTodo.text.trim() === '';
    }
    function setEditableTodo(todo) {
      return currentEditableTodo = todo;
    }
    function addTodo() {
      let newEmptyTodo = {
        text: ''
      };
      this.currentTodos.push(
        newEmptyTodo
      );
      setEditableTodo(newEmptyTodo);
    }

    function editTodo (todo) {
      if (todo.text.trim() == '') {
        this.currentTodos = this.currentTodos
          .filter((currentTodo)=>(currentTodo!=todo));
      }
      todo.id ?  this.editItem(todo) : this.addItem(todo);
      this.setEditableTodo(null);
    }
  }
};