(function(){
  'use strict';

  var angular = require('angular');

  require('todosList/todosList');

  require('./dist/templateCachePartials');


  angular.module('todoApp', ['todosList'])
})();
