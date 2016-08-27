import {calculateChanges} from '../utils';
import './todos.scss';
import './add-btn.scss';

export const todoList = {
  template: require('./todoList.html'),
  bindings: {
    todos: '<',
    addTodo: '<',
    removeTodo: '<',
    editTodo: '<',
    getTodos: '<',
    removeAllTodos: '<'
  },
  controller: function () {
    const $ctrl = this;
    $ctrl.$onChanges = function (changes) {
      $ctrl.currentTodos = Object.assign([], $ctrl.todos);
    };
    let currentEditableTodo = null;
    $ctrl.isEditable = isEditable;
    $ctrl.setEditableTodo = setEditableTodo;
    $ctrl.sendTodo = sendTodo;
    $ctrl.createTodo = createTodo;
    $ctrl.getTodoIndex = getTodoIndex;

    function isEditable(todo) {
      return todo === currentEditableTodo;
    }
    function setEditableTodo(todo) {
      return currentEditableTodo = todo;

    }
    function getTodoIndex(todo){
      return $ctrl.todos.findIndex((item)=>(
        item.id === todo.id
      ));
    }
    function createTodo() {
      let newEmptyTodo = {
        text: ''
      };
      $ctrl.currentTodos.push(
        newEmptyTodo
      );
      setEditableTodo(newEmptyTodo);
    }
    function sendTodo (todo) {
      //clean new empty todo
      console.log(isTodoEmpty(todo));
      if (isTodoEmpty(todo) && isNewTodo(todo)) {
        setEditableTodo(null);
        return $ctrl.currentTodos = Object.assign([], $ctrl.todos);
      }
      if (!isNewTodo(todo) && isTodoEmpty(todo)) {
        setEditableTodo(null);
        return $ctrl.removeTodo(todo);
      }
      if (!isNewTodo(todo)){
        setEditableTodo(null);
        return isTodoChanged(todo) ? $ctrl.editTodo(todo): null;
      }
      setEditableTodo(null);
      return $ctrl.addTodo(todo);
    }
    function isNewTodo(todo){
      return !('id' in todo);
    }
    function isTodoEmpty(todo){
      return todo.text.trim() === '';
    }
    function isTodoChanged(todo){
      const parentTodo = $ctrl.currentTodos.find((item)=>(item.id === todo.id));
      console.log(Boolean(calculateChanges(parentTodo, todo)));
      return Boolean(calculateChanges(parentTodo, todo));
    }
  }
};