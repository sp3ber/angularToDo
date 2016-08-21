import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { combineReducers } from 'redux';
import todo from './app/reducers/todo';

const logger = createLogger({
  level: 'info',
  collapsed: true
});

export default function config($ngReduxProvider, $httpProvider) {
  /** @ngInject */
  let reducer = combineReducers({todos: todo});
  $ngReduxProvider.createStoreWith(reducer, [logger, thunk]);

  $httpProvider.defaults.useXDomain = true;
}