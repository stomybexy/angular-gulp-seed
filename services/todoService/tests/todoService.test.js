'use strict';

describe('todoService', function(){
  beforeEach(module('todoService'));

  var todoService;

  beforeEach(inject(function(_todoService_){
    todoService = _todoService_;
  }));

  describe('allTodos', function(){
    it('should return an array of 3 todos', function(){
      expect(todoService.allTodos().length).toBe(3);
    });
  });
  describe('addTodo', function(){
    it('should add new todo', function(){
      var todo = {
        text: 'whatever'
      }
      var todoLength = todoService.allTodos().length;
      todoService.addTodo(todo);
      expect(todoService.allTodos().length).toBe(todoLength + 1);
    });
  });
  describe('removeTodo', function(){
    it('should remove a todo', function(){
      var todos = todoService.allTodos();
      var todoLength = todos.length;

      todoService.removeTodo(todos[1]);
      expect(todoService.allTodos().length).toBe(todoLength - 1);
    });
  });
  describe('toggleDone', function(){
    it("should set a todo's done property to its opposite", function(){
      var todos = todoService.allTodos();
      var todo = todos[0];

      todo.done = true;

      todoService.toggleDone(todo);

      expect(todo.done).toBe(true);

    });
  });
  // describe('setNotDone', function(){
  //   it("should set a todo's done property to false", function(){
  //     var todos = todoService.allTodos();
  //     var todo = todos[0];
  //
  //     todoService.setNotDone(todo);
  //     expect(todo.done).toBe(false);
  //   });
  // });
  describe('clearCompleted', function(){
    it("should remove todos whose done property is set to true", function(){
      var todos = todoService.allTodos();
      todos[0].done = true;
      todos[2].done = true;
      todoService.clearCompleted();

      expect(todos.length).toBe(1);
      expect(todos[0].text).toBe('Be awesome at my job interview');
    });
  });

});
