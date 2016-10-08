(function () {
  'use strict';

  angular
      .module('app.home')
      .factory('dataService', dataService);

  /* @ngInject */
  function dataService($resource, $q) {
    var service = $resource('http://127.0.0.1:5000/api/consultant', {},
      {
        getConsultants:{
          method: 'GET'
        },
      });
    return service;
  }
})();
