import { bindActionCreators } from 'redux';

export default function testService($ngRedux, $http){
  /** @ngInject */
  let actionCreator = {
    doSomeStuff: () => {
      return function (dispatch) {
        dispatch({
          type:'TEST1'
        });

        return $http.get('http://www.test.de')
          .then(json =>
            dispatch({
              type:'TEST2',
              json:json
            })
          );
      };
    },
    doSomeOtherStuff:() => {
      return {}
    }
  };
  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}