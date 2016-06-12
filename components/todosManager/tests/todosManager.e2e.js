describe('todosManager', function() {
  beforeEach(function(){
    // Load the app homepage.
    browser.get('http://localhost:8000/todos');
  })
  describe('new todo input', function(){
    it('should add a new todo', function(){
      var todosList = element.all(by.repeater('todo in todosList.todos'));

      expect(todosList.count()).toBe(3);

      element(by.model('todosManager.newTodoText')).sendKeys('my new task');
      element(by.id('newTodoForm')).submit();
      expect(todosList.count()).toBe(4);
    });
  });
});
