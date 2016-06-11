(function(){
  'use strict';
  var angular = require('angular');

  require('angular-ui-router');

  require('todosManager/todosManager');

  var name = "main";

  angular.module(name, ['todosManager', 'ui.router']).component(name, {
    templateUrl: '/components/main/main.html'
  }).config(config);

  function config($stateProvider) {
      'ngInject';

      $stateProvider.state('main', {
          template: '<main></main>',
          url: '/'
      });

  }

})();
