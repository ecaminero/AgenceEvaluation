(function () {
  'use strict';

  angular
    .module('app.home')
    .controller('homeController', homeController);

  /* @ngInject */
  function homeController($log, _, dataService, $uibModal) {
    var vm = this;
    vm.getConsultants = getConsultants;
    vm.toggleSelection = toggleSelection;
    vm.showEarnings = showEarnings;
    vm.showRelatorio = showRelatorio;
    vm.selection = [];

    activate();
    function activate() {
      vm.getConsultants();
    }

    function getConsultants() {
      dataService.getConsultants().$promise
        .then(function (res) {
          vm.consultants = res.data;
        });
    }

    function showEarnings() {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        templateUrl: '/modules/home/templates/_modal_relatorio.html',
        controller: 'modalRelatorioController',
        controllerAs: '$ctrl',
        size: 'md',
        resolve: {
          consultants: function () {
            return vm.selection;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
       console.log(selectedItem);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    function showRelatorio(){
      console.log("qweqw");
    }

    function toggleSelection(id) {
      var idx = vm.selection.indexOf(id);
      if (idx > -1) {
        vm.selection.splice(idx, 1);
      } else {
        vm.selection.push(id);
      }
    }

  }
})();
