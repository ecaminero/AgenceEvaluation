(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('homeController', homeController);
 
 /* @ngInject */
  function homeController($log) {
    var vm = this;
    vm.title = 'homeController';

    activate();
    function activate() {
      $log.info("homeController");
    }
  }
})();
