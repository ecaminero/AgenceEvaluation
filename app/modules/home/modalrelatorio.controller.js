(function () {
  'use strict';

  angular
    .module('app.home')
    .controller('modalRelatorioController', modalRelatorioController);

  /* @ngInject */
  function modalRelatorioController($log, $scope, _, dataService, $uibModalInstance, consultants) {
    var vm = this;
    vm.getAverage = getAverage;
    vm.ok = ok;
    vm.cancel = cancel;
    vm.emptyChart = false;

    activate();
    function activate() {
      vm.getAverage();
    }

    function getAverage() {
      dataService.average({consultants: consultants}).$promise
        .then(function (res) {
          if (_.isEmpty(res.data)) {
            vm.emptyChart = true;
            return;
          }
          var allSalario = res.allSalario;
          var dataValues = Promise.all(res.data.map(function (data) {
            return {
              label: data.no_usuario,
              value: (data.brut_salario * 100) / allSalario
            };
          })).then(function (response) {
            FusionCharts.ready(function () {
              var conversionChart = new FusionCharts({
                type: 'pie3d',
                renderAt: 'chart-container',
                width: "100%",
                dataSource: {
                  chart: {
                    caption: "Receta de Participación",
                    startingangle: "120",
                    showlabels: "0",
                    showlegend: "1",
                    enablemultislicing: "0",
                    slicingdistance: "15",
                    showpercentvalues: "1",
                    showpercentintooltip: "0",
                    plottooltext: "Usuario : $label Ganancia : $datavalue",
                    theme: "fint"
                  },
                  data: response
                }
              });
              conversionChart.render();
            });
          });
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


