(function(){
  'use strict';

  var angular = require('angular');

  require('angular-ui-router');

  require('todoService/todoService');

  var name = 'todosList';

  angular.module(name, ['todoService', 'ui.router']).component(name,{
    templateUrl: '/components/todosList/todosList.html',
    controller: todosList,
    controllerAs: name
  }).config(config);

  function config($stateProvider) {
      'ngInject';

      $stateProvider.state('todosList', {
          template: '<todos-list></todos-list>',
          url: '/todos'
      })

  }

  

  function todosList(todoService){
    'ngInject';
    this.todos = todoService.allTodos();
  }



})();
