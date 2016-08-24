import angular from 'angular';
import ngRedux from 'ng-redux';
import 'ng-focus-if';
import firebase from 'angularfire';

import {todoModule} from './app/todo';
import 'angular-ui-router';
import routesConfig from './routes';
import config from './index.config';
import todoActions from './app/actions/todo-actions';
import firebaseService from './app/services/firebase';

import {main} from './app/main';

import 'reset-css/_reset.scss';
import './index.scss';

angular
  .module('app', [todoModule, 'ui.router', 'focus-if', ngRedux, firebase])
  .config(config)
  .config(routesConfig)
  .factory('todoActions', todoActions)
  .factory('firebaseService', firebaseService)
  .component('app', main);
