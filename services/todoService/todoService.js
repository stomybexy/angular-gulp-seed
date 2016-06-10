(function() {
    'use strict';

    var angular = require('angular');

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
                }
            };
            return service;
        });
})();
