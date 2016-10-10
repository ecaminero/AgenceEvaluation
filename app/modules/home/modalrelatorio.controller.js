(function () {
  'use strict';

  angular
    .module('app.home')
    .controller('modalRelatorioController', modalRelatorioController);

  /* @ngInject */
  function modalRelatorioController($log, $scope, _, pieChart, dataService, $uibModalInstance, consultants) {
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
          var allSalario = _.sumBy(res.data, function(o) { return o.ganancia; });
          Promise.all(res.data.map(function (data) {
            return {
              label: data.no_usuario,
              value: (data.ganancia * 100) / allSalario
            };
          })).then(function (response) {
            console.log(response)
            FusionCharts.ready(function () {
              var conversionChart = new FusionCharts({
                type: 'pie2d',
                renderAt: 'chart-container',
                width: "100%",
                dataSource: {
                  chart: pieChart,
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






            