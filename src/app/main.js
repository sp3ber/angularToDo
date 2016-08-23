import todoActions from './actions/todo-actions';
import { bindActionCreators } from 'redux';

export const main = {
  template: require('./main.html'),
  controller: function ($ngRedux, $scope, firebaseService) {
    /** @ngInject */
    this.todos = [];
    this.$onInit = function(){
      this.getTodos();
    };

    this.mapStateToThis = function (state) {
      return {
        todos: state.todos
      };
    };
    var actions = bindActionCreators(firebaseService, $ngRedux.dispatch);
    const unsubscribe = $ngRedux.connect(this.mapStateToThis, firebaseService)(this);
    $scope.$on('$destroy', unsubscribe);
  }
};
