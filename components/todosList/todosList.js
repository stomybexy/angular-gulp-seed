(function(){
  'use strict';

  var angular = require('angular');

  var name = 'todosList';

  angular.module(name, []).component(name,{
    templateUrl: '/components/todosList/todosList.html',
    controllerAs: name,
    bindings: {
      todos: '<'
    }
  });
})();
