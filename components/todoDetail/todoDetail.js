(function(){
  'use strict';

  var angular = require('angular');

  var name = 'todoDetail';

  angular.module(name, []).component(name,{
    templateUrl: '/components/todoDetail/todoDetail.html',
    controllerAs: name,
    bindings: {
      todo: '<',
      onToggleDone: '&',
      onRemove: '&'
    }
  });

})();
