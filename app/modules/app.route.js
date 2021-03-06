(function() {
  'use strict';

  angular
      .module('app')
      .config(uiRouterConfig);

  /* @ngInject */
  function uiRouterConfig($stateProvider,  $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '/modules/home/templates/home.html',
          controller: 'homeController',
          controllerAs: 'homeCtrl',
      })
  }
})();
