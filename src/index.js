// 3rd party libraries
import "babel-polyfill";
import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngRedux from 'ng-redux';
import toastr from 'angular-toastr';
import 'angular-toastr/dist/angular-toastr.css';
import 'ng-focus-if';
import firebase from 'angularfire';
import 'angular-ui-router';

// inner components
import main from './app/main';
import spinner from './app/components/spinner';
import todos from './app/components/todos';
import todo from './app/components/todo';

// common styles
import './reset.scss';
import './index.scss';

// configs
import routesConfig from './routes';
import config from './index.config';

// services
import actions from './app/actions';
import firebaseService from './app/services/firebase';

angular
  .module('app',
    ['ui.router',
      'focus-if',
      ngAnimate,
      toastr,
      ngRedux,
      firebase])
  .config(config)
  .config(routesConfig)
  .factory('actions', actions)
  .factory('firebaseService', firebaseService)
  .component('todos', todos)
  .component('todo', todo)
  .component('spinner', spinner)
  .component('app', main);
