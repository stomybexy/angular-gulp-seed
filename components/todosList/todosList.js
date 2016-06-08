(function(){
  'use strict';

  var angular = require('angular');

  require('todoService/todoService');

  var name = 'todosList';

  angular.module(name, ['todoService']).component(name,{
    templateUrl: '/components/todosList/todosList.html',
    controller: todosList,
    controllerAs: name
  })

  function todosList(todoService){
    'ngInject';
    this.todos = todoService.allTodos();
  }
})();
