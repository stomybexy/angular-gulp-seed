'use strict';

describe('todoDetail controller', function(){
   var component, scope, todo, $componentController;

   beforeEach(function(){
     module('todoDetail');
   });

   beforeEach(inject(function($rootScope, _$componentController_){
     $componentController = _$componentController_;
     todo =  {
         text: 'Be awesome at my job interview'
     };
   }));

  it('should hold a todo model', function(){
    component = $componentController('todoDetail', null, {todo: todo});
    expect(component.todo.text).toBe('Be awesome at my job interview');
  });


});
