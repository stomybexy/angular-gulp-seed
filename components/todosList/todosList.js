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
      onToggleDone: '&'
    }
  });

  function todosListCtrl(){
    var self = this;
    this.toggleDone = function(todo){
      self.onToggleDone({todo: todo});
    }
  }
})();
