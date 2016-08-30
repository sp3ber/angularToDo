/** @ngInject */
export default function FixIEClearButton($timeout, $sniffer) {
  const directive = {
    restrict: 'A',
    require: '?ngModel',
    link: Link,
    controller: function () {
    }
  };

  return directive;

  function Link(scope, elem, attr, controller) {
    var type = elem[0].type;
    //ie11 doesn't seem to support the input event, at least according to angular
    if (type !== 'text' || !controller || $sniffer.hasEvent('input')) {
      return;
    }

    elem.on("mouseup", function (event) {
      var oldValue = elem.val();
      if (oldValue == "") {
        return;
      }

      $timeout(function () {
        var newValue = elem.val();
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