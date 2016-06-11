(function(){
  'use strict';

  var angular = require('angular');

  require('angular-ui-router');

  require('todoService/todoService');

  require('todosList/todosList');

  var name = 'todosManager';

  angular.module(name,['todosList','todoService', 'ui.router']).component(name, {
    template: '<todos-list todos="todosManager.todos"></todos-list>',
    controller: todosManager,
    controllerAs: name
  }).config(config);

  function config($stateProvider) {
      'ngInject';

      $stateProvider.state(name, {
          template: '<todos-manager></todos-manager>',
          url: '/todos'
      })
  }

  function todosManager(todoService){
    'ngInject';
    this.todos = todoService.allTodos();
  }

})();
