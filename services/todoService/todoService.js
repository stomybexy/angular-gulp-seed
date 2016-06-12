(function() {
    'use strict';

    var angular = require('angular');
    var _ = require('underscore');

    var name = 'todoService';


    angular.module(name, [])
        .factory(name, function() {
            var todos = [{
                text: 'My first task'
            }, {
                text: 'Be awesome at my job interview'
            }, {
                text: 'Get hired'
            }]
            var service = {
                allTodos: function() {
                    return todos;
                },
                addTodo: function(todo){
                  todos.push(todo);
                },
                removeTodo: function(todo){
                  var todosTemp = _.reject(todos, function(task){
                    return task.text === todo.text;
                  });
                  todos.length = 0;
                  todos.push.apply(todos, todosTemp);
                },
                toggleDone: function(todo){
                  // TODO: call backend and reverts in case of failing
                },

                clearCompleted: function(todo){
                  var todosTemp = _.reject(todos, function(task){
                    return task.done === true;
                  });
                  todos.length = 0;
                  todos.push.apply(todos, todosTemp);
                }
            };
            return service;
        });
})();
