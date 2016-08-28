import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {combineReducers} from 'redux';
import reducers from './app/reducers';

const logger = createLogger({
  level: 'info',
  collapsed: true
});
/** @ngInject */
export default function config($ngReduxProvider) {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }
  const reducer = combineReducers({todos: reducers});
  $ngReduxProvider.createStoreWith(reducer, middlewares);
}
