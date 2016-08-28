import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {combineReducers} from 'redux';
import todo from './app/reducers/todo';

const logger = createLogger({
  level: 'info',
  collapsed: true
});

export default function config($ngReduxProvider, $httpProvider) {
  /** @ngInject */
  const reducer = combineReducers({todos: todo});
  $ngReduxProvider.createStoreWith(reducer, [thunk, logger]);
  $httpProvider.defaults.useXDomain = true;
}
