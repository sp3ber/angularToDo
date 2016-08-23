import angular from 'angular';
import ngRedux from 'ng-redux';
import 'ng-focus-if';
import firebase from 'angularfire';

import {todoModule} from './app/todo';
import 'angular-ui-router';
import routesConfig from './routes';
import config from './index.config';
import firebaseService from './app/services/firebase';

import {main} from './app/main';

import './index.scss';

angular
  .module('app', [todoModule, 'ui.router', 'focus-if', ngRedux, firebase])
  .config(config)
  .config(routesConfig)
  .factory('firebaseService', firebaseService)
  .component('app', main);
