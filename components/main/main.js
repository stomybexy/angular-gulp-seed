(function(){
  'use strict';
  var angular = require('angular');
  
  require('todosList/todosList');

  var name = "main";

  angular.module(name, ['todosList']).component(name, {
    templateUrl: '/components/main/main.html'
  });

})();
