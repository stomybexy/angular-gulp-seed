(function(){
  'use strict';

  var angular = require('angular');

  require('angular-ui-router');

  require('todoService/todoService');

  require('todosList/todosList');

  var name = 'todosManager';

  angular.module(name,['todosList','todoService', 'ui.router']).component(name, {
    templateUrl: '/components/todosManager/todosManager.html',
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

  function todosManager(todoService, $timeout){
    'ngInject';
    this.todos = todoService.allTodos();

    this.toggleDone = function(todo){
      console.log('toggleDone:' , todo);
    }

    this.addTodo = function(newTodoText){
      todoService.addTodo({
        text: newTodoText
      });
      this.newTodoText = "";
    }
  }

})();
