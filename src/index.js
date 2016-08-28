import "babel-polyfill";
import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngRedux from 'ng-redux';
import toastr from 'angular-toastr';
import 'angular-toastr/dist/angular-toastr.css';
import 'ng-focus-if';
import 'angular-loading-bar';
import firebase from 'angularfire';

import {todoModule} from './app/todo';
import spinner from './app/components/spinner/spinner';
import 'angular-ui-router';
import routesConfig from './routes';
import config from './index.config';
import actions from './app/actions';
import firebaseService from './app/services/firebase';

import {main} from './app/main';
import './reset.scss';
import './index.scss';

angular
  .module('app',
    [todoModule,
      'ui.router',
      'focus-if',
      'cfp.loadingBar',
      ngAnimate,
      toastr,
      ngRedux,
      firebase])
  .config(config)
  .config(routesConfig)
  .factory('actions', actions)
  .factory('firebaseService', firebaseService)
  .component('spinner', spinner)
  .component('app', main);
