(function(){
  'use strict';

  var angular = require('angular');

  require('todoDetail/todoDetail');

  var name = 'todosList';

  angular.module(name, ['todoDetail']).component(name,{
    templateUrl: '/components/todosList/todosList.html',
    controllerAs: name,
    controller: todosListCtrl,
    bindings: {
      todos: '<',
      onToggleDone: '&',
      onRemoveTodo: '&'
    }
  });

  function todosListCtrl(){
    this.toggleDone = function(todo){
      this.onToggleDone({todo: todo});
    }

    this.removeTodo = function(todo){
      this.onRemoveTodo({todo: todo});
    }
  }
})();
