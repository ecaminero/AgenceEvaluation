(function () {
  'use strict';

  angular
    .module('app.home')
    .controller('modalRelatorioController', modalRelatorioController);

  /* @ngInject */
  function modalRelatorioController($log, _, dataService, $uibModalInstance, consultants) {
    var vm = this;
    vm.getEarnings = getEarnings;
    vm.ok = ok;
    vm.cancel = cancel;
    vm.data = {
        consultants: consultants,
        monthStart: "2007-01-1",
        monthEnd: "2007-02-1"
    }
    
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
      vm.getEarnings();
    }

    function getEarnings() {

      dataService.getEarnings(vm.data).$promise
        .then(function (res) {
          console.log(res)
        });
    }

    function ok() {
      $uibModalInstance.close({});
    };

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    };

  }
})();
