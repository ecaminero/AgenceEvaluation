(function () {
  'use strict';

  angular
    .module('app.home')
    .controller('modalPerfomanceController', modalPerfomanceController);

  /* @ngInject */
  function modalPerfomanceController($log, $scope, $q, _, charByMoths, dataService, $uibModalInstance, data) {
    var vm = this;
    vm.getAverage = getAverage;
    vm.ok = ok;
    vm.cancel = cancel;
    vm.showEmptyMessage = false;
    vm.filterData = {
      consultants: data.consultants,
      monthStart: data.fromDate,
      monthEnd: data.toDate
    };

    activate();
    function activate() {
      vm.getAverage();

    }

    function getAverage() {
      dataService.getPerformance(vm.filterData).$promise
        .then(function (res) {
          if (_.isEmpty(res.data)) { vm.showEmptyMessage = true; return; }
          var media = res.data[0].media
          generateData(res.data, [], null).then(function (consultants) {
            createChart({dataset: consultants, media: media});
          });
        });
    }

    function ok() {
      $uibModalInstance.close({});
    };

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    };

    function createChart(params) {
      var dateStart = moment(vm.filterData.monthStart);
      var dateEnd = moment(vm.filterData.monthEnd);
      var category = [];
      
      while (dateStart.isSameOrBefore(dateEnd)) {
        category.push({ label: dateStart.format('MMMM') });
        dateStart.add(1, 'month');
      }

      var revenueChart = new FusionCharts({
        type: 'mscolumn2d',
        renderAt: 'chart-container',
        width: '500',
        height: '300',
        dataSource: {
          chart: charByMoths,
          categories: [{
            "category": category
          }],
          dataset: params.dataset,
          trendlines: [
            {
              line: [
                {
                  startvalue: params.media,
                  color: "#0075c2",
                  displayvalue: "Costo Fijo Medio",
                  valueOnRight: "1",
                  thickness: "1",
                  showBelow: "1",
                  tooltext: `Previous year quarterly target ${params.media}`
                }
              ]
            }
          ]
        }
      });
      revenueChart.render();

    }


    function generateData(remainder, consultants, deferred) {
      if (!deferred) { deferred = $q.defer(); }
      if (_.isEmpty(remainder)) {
        consultants = _.uniqBy(consultants, 'seriesname');
        deferred.resolve(consultants);
        return deferred.promise;
      }
      var search = _.take(remainder)[0];
      var newList = _.dropWhile(remainder, function (o) { return o.co_usuario == search.co_usuario; });
      var data = [];
      _.forEach(remainder, function (o) {
        if (o.co_usuario === search.co_usuario) {
          data.push({ "value": o.ganancia })
        };
      });

      consultants.push({
        seriesname: search.no_usuario,
        data: data
      });
      return generateData(newList, consultants, deferred);
    }

  }
})();

