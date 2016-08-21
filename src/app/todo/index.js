import angular from 'angular';

import {todoItem} from './todoItem';
import {todoList} from './todoList';

export const todoModule = 'todo';

angular
  .module(todoModule, [])
  .component('todoItem', todoItem)
  .component('todoList', todoList);
