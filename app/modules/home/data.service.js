(function () {
  'use strict';

  angular
      .module('app.home')
      .factory('dataService', dataService);

  /* @ngInject */
  function dataService($resource, $q, BASE_API_URI) {
    var service = $resource(`${BASE_API_URI}/api/consultant`, {},
      {
        getConsultants:{
          method: 'GET'
        },
      });
    return service;
  }
})();
