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
    this.sendTodo = sendTodo.bind(this);
    this.addTodo = addTodo.bind(this);

    function isEditable(todo) {
      return todo === currentEditableTodo;
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

    function sendTodo (todo) {
      //clean new empty todo
      if (todo.text.trim() == '' && !todo.id) {
        console.log('remove new');
        currentEditableTodo = null;
        return this.currentTodos = this.currentTodos
          .filter((currentTodo)=>(currentTodo.text || currentTodo.id ));
      }
      if (todo.id && todo.text.trim() === '') {
        return console.info('remove exists!');
      }
      todo.id ?  this.editItem(todo) : this.addItem(todo);
      this.setEditableTodo(null);
    }
  }
};