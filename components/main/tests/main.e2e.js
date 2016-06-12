describe('main', function() {
  beforeEach(function(){
    // Load the app homepage.
    browser.get('http://localhost:8000');
  })
  it('should display Todo dashboard', function() {
    expect(element(by.tagName('h1')).getText()).toEqual('Todo dashboard');
  });

  describe('link List of todos', function(){
    it('should go to /todos', function(){
      element(by.tagName('a')).click();
      expect(browser.getLocationAbsUrl()).toMatch("/todos");
    });
  });
});
