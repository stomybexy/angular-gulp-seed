(function(){
  'use strict';

  var angular = require('angular');

  var name = 'todosList';

  angular.module(name, []).component(name,{
    templateUrl: '/components/todosList/todosList.html',
    controller: todosList,
    controllerAs: name
  })

  function todosList(){
    this.todos = [
      {
        text: 'My first task'
      },{
        text: 'Be awesome at my job interview'
      },
      {
        text: 'Get hired in Paris'
      },
      {
        text: 'Go rejoin my beautiful Julie'
      }
    ];
  }
  console.log('This is awesome!');
})();
