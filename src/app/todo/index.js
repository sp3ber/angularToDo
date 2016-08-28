import {todo} from './components/todo';
import {todos} from './components/todos';

export const todoModule = 'todo';

angular
  .module(todoModule, [])
  .component('todo', todo)
  .component('todos', todos);
