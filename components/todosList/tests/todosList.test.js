'use strict';

describe('todosList controller', function(){
   var component, scope, todos, $componentController;

   beforeEach(function(){
     module('todosList');
   });

   beforeEach(inject(function($rootScope, _$componentController_){
     $componentController = _$componentController_;
     todos =  [{
         text: 'Be awesome at my job interview'
     }, {
         text: 'Get hired'
     }]
   }));

  it('should hold an array of todos model', function(){
    component = $componentController('todosList', null, {todos: todos});
    expect(component.todos.length).toBe(2);
  });
});
