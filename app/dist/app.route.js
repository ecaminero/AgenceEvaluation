;(function(angular) {
(function() {
  'use strict';

  uiRouterConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  angular
      .module('app')
      .config(uiRouterConfig);

  /* @ngInject */
  function uiRouterConfig($stateProvider,  $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'modules/home/home.html',
          controller: 'homeController',
          controllerAs: 'homeCtrl',
      })
  }
})();

})(angular);