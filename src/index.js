import angular from 'angular';
import ngRedux from 'ng-redux';
import 'ng-focus-if';

import {todoModule} from './app/todo';
import 'angular-ui-router';
import routesConfig from './routes';
import config from './index.config';

import {main} from './app/main';

import './index.scss';

angular
  .module('app', [todoModule, 'ui.router', 'focus-if', ngRedux])
  .config(config)
  .config(routesConfig)
  .component('app', main);
