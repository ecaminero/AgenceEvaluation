;(function(angular) {
(function() {
  'use strict';

  homeController.$inject = ['$log'];
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

})(angular);