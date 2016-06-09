(function() {
    'use strict';

    var angular = require('angular');

    require('angular-ui-router');

    require('main/main');

    require('./dist/templateCachePartials');


    angular.module('todoApp', ['main', 'ui.router']).config(config);

    function config($locationProvider, $urlRouterProvider){
      'ngInject';

      $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise('/');
    }



})();
