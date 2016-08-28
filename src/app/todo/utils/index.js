export function calculateChanges(newValue, oldValue) {
  var changes = {};
  //Игорируем особые свойства AngularJS
  var ignoreProperty = function (property) {
    return (angular.isString(property) && property.charAt(0) == '$');
  };
  //Собираем обновления и новые свойства
  for (var property in newValue) {
    if ((!ignoreProperty(property)) && newValue.hasOwnProperty(property)) {
      var hasChanged = false;
      var newPropertyValue = newValue[property];
      if (oldValue.hasOwnProperty(property)) {
        var oldPropertyValue = oldValue[property];
        if (oldPropertyValue != newPropertyValue) {
          if (angular.isArray(oldPropertyValue) && angular.isArray(newPropertyValue)) {
            if (oldPropertyValue.length == newPropertyValue.length) {
              for (var i = 0; (!hasChanged) && (i < oldPropertyValue.length); i++) {
                //Предполагаем, что массивы только скалярные
                if (oldPropertyValue[i] != newPropertyValue[i]) {
                  hasChanged = true;
                }
              }
            }
            else {
              hasChanged = true;
            }
          }
          else if (angular.isObject(oldPropertyValue) && angular.isObject(newPropertyValue)) {
            //Сохраняем все новое значение свойства, а не только изменное вложенное свойство
            if (calculateChanges(newPropertyValue, oldPropertyValue)) {
              hasChanged = true;
            }
          }
          else {
            hasChanged = true;
          }
        }
      }
      else {
        hasChanged = true;
      }

      if (hasChanged) {
        changes[property] = newPropertyValue;
      }
    }
  }
  //Собираем удаленные свойства
  for (var property in oldValue) {
    if ((!ignoreProperty(property)) && oldValue.hasOwnProperty(property) && (!newValue.hasOwnProperty(property))) {
      changes[property] = null;
    }
  }

  if (Object.keys(changes).length < 1) {
    changes = null;
  }
  return changes;
}