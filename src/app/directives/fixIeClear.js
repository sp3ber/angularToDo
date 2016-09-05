/*
this directive is needed for fix ie bug with not updating model
when clicking on cross btn in input
 https://github.com/angular/angular.js/issues/11193
 */
/** @ngInject */
export default function FixIEClearButton($timeout, $sniffer) {
  const directive = {
    restrict: 'A',
    require: '?ngModel',
    link: Link
  };

  return directive;

  function Link(scope, elem, attr, controller) {
    const type = elem[0].type;
    // ie11 doesn't seem to support the input event, at least according to angular
    if (type !== 'text' || !controller || $sniffer.hasEvent('input')) {
      return;
    }

    elem.on("mouseup", () => {
      const oldValue = elem.val();
      if (oldValue === "") {
        return;
      }

      $timeout(() => {
        const newValue = elem.val();
        if (newValue !== oldValue) {
          elem.val(oldValue);
          elem.triggerHandler('keydown');
          elem.val(newValue);
          elem.triggerHandler('focus');
        }
      }, 0, false);
    });

    scope.$on('$destroy', destroy);
    elem.on('$destroy', destroy);

    function destroy() {
      elem.off('mouseup');
    }
  }
}
