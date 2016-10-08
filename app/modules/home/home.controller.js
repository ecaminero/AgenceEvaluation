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
    vm.showRelatorio = showRelatorio;
    vm.selection = [];
    vm.myDataSource = {
      chart: {
        caption: "Age profile of website visitors",
        subcaption: "Last Year",
        startingangle: "120",
        showlabels: "0",
        showlegend: "1",
        enablemultislicing: "0",
        slicingdistance: "15",
        showpercentvalues: "1",
        showpercentintooltip: "0",
        plottooltext: "Age group : $label Total visit : $datavalue",
        theme: "fint"
      },
      data: [
        {
          label: "Teenage",
          value: "1250400"
        },
        {
          label: "Adult",
          value: "1463300"
        },
        {
          label: "Mid-age",
          value: "1050700"
        },
        {
          label: "Senior",
          value: "491000"
        }
      ]
    };

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

    function showRelatorio() {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        templateUrl: '/modules/home/templates/_modal_relatorio.html',
        controller: 'modalRelatorioController',
        size: 'lg',
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
