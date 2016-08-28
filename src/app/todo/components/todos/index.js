import {calculateChanges} from '../../utils';
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
  controller: function ($filter) {
    /** @ngInject */
    const $ctrl = this;
    $ctrl.$onChanges = function (changes) {
      $ctrl.todos = Object.assign([], $ctrl.parentTodos);
    };
    let currentEditableTodo = null;
    $ctrl.currentFilter = $ctrl.noFilter;
    $ctrl.isEditable = isEditable;
    $ctrl.setEditableTodo = setEditableTodo;
    $ctrl.sendTodo = sendTodo;
    $ctrl.createTodo = createTodo;
    $ctrl.getTodoIndex = getTodoIndex;
    $ctrl.activeFilter = activeFilter;
    $ctrl.finishedFilter = finishedFilter;
    $ctrl.activeFilter = activeFilter;
    $ctrl.setFilter = setFilter;
    $ctrl.isCurrentFilter = isCurrentFilter;

    function isEditable(todo) {
      return todo === currentEditableTodo;
    }
    function setEditableTodo(todo) {
      return currentEditableTodo = todo;

    }
    function getTodoIndex(todo){
      return $ctrl.parentTodos.findIndex((item)=>(
        item.id === todo.id
      ));
    }
    function createTodo() {
      // reset filter, it's not nice to create new
      // todoItem when you looking for finished items
      if ($ctrl.currentFilter === $ctrl.finishedFilter) {
        $ctrl.setFilter($ctrl.noFilter);
      }
      let newEmptyTodo = {
        text: ''
      };
      $ctrl.todos.push(
        newEmptyTodo
      );
      setEditableTodo(newEmptyTodo);
    }
    function sendTodo (todo) {
      //clean new empty todo
      console.log(isTodoEmpty(todo));
      if (isTodoEmpty(todo) && isNewTodo(todo)) {
        setEditableTodo(null);
        return $ctrl.todos = Object.assign([], $ctrl.parentTodos);
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
      const parentTodo = $ctrl.todos.find((item)=>(item.id === todo.id));
      console.log(Boolean(calculateChanges(parentTodo, todo)));
      return Boolean(calculateChanges(parentTodo, todo));
    }
    function finishedFilter(todo){
      return Boolean(todo.finished);
    }
    function activeFilter(todo){
      return !Boolean(todo.finished);
    }
    function noFilter(){
      return true;
    }
    function setFilter(filter){
      $ctrl.currentFilter = filter;
    }
    function isCurrentFilter(filter){
      return $ctrl.currentFilter === filter;
    }
  }
};