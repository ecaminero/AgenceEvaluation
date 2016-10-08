(function () {
  'use strict';

  angular
    .module('app.home')
    .controller('modalRelatorioController', modalRelatorioController);

  /* @ngInject */
  function modalRelatorioController($log, _, dataService, $uibModalInstance, consultants) {
    var vm = this;
    vm.getConsultants = getConsultants;

    activate();
    function activate() {
    }

    function getConsultants() {
      dataService.getConsultants().$promise
        .then(function (res) {
          vm.consultants = res.data;
        });
    }


  }
})();
