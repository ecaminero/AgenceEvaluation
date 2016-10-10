(function () {
  'use strict';

  angular
    .module('app.home')
    .controller('homeController', homeController);

  /* @ngInject */
  function homeController($log, _, dataService, $uibModal, toaster, $q, moment) {
    var vm = this;
    vm.getConsultants = getConsultants;
    vm.toggleSelection = toggleSelection;
    vm.showEarnings = showEarnings;
    vm.showPerfomance = showPerfomance;
    vm.getRelation = getRelation;
    vm.getMonthByID = getMonthByID;
    vm.getProfit = getProfit;
    vm.showRelationGrid = false;
    vm.toDateChanged = toDateChanged;
    vm.fromDateChanged = fromDateChanged;
    vm.selection = [];
    vm.dateRange = {
      fromDate: {},
      toDate: {},
      config: {
        start: "year",
        depth: "year"
      }
    };
    vm.relationsOptions = {
      columns: [{ field: 'no_usuario', title: 'Nombre Usuario' }],
      pageable: { "refresh": false, "pageSizes": [5, 10], "info": false, "previousNext": true },
      relations: []
    };

    vm.insideGridOptions = {
      columns: [
        { template: "{{homeCtrl.getMonthByID(dataItem.month_id)}}", title: 'Período' },
        { field: 'receita_liquida', title: 'Receita Líquida' },
        { field: 'brut_salario', title: 'Custo Fixo' },
        { field: 'comision', title: 'Comissão' },
        { template: "{{homeCtrl.getProfit(dataItem)}}", title: 'Lucro' }
      ],
      pageable: { "refresh": false, "pageSizes": [10], "info": false, "previousNext": true },
    }

    vm.consultantsGridOptions = {
      dataSource: [],
      pageable: { "refresh": false, "pageSizes": [10], "info": false, "previousNext": true },
      columns: [
        { template: "<input type='checkbox' class='checkbox' ng-click='homeCtrl.toggleSelection(dataItem.co_usuario, $event)' />", width: "40px" },
        { field: "co_usuario", title: "", hidden: true },
        { field: "no_usuario", title: "Nombre" },
        { field: "nu_telefone", title: "Teléfono" }
      ]
    };

    activate();
    function activate() {
      vm.getConsultants();

    }

    function getConsultants() {
      dataService.getConsultants().$promise
        .then(function (res) {
          console.log(res)
          vm.consultants = res.data;
          vm.consultantsGridOptions.dataSource = vm.consultants;
        });
    }

    function showEarnings() {
      if (_.isEmpty(vm.selection)) {
        toaster.pop('warning', "Error", "Debe seleccionar al menos un consultor");
        return;
      }
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
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    function showPerfomance() {
      if (_.isEmpty(vm.dateRange.fromDate.string) || _.isEmpty(vm.dateRange.toDate.string) || _.isEmpty(vm.selection)) {
        toaster.pop('warning', "Error", "Debe seleccionar un rango de fechas y al menos un consultor");
        return;
      }
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        templateUrl: '/modules/home/templates/_modal_perfomance.html',
        controller: 'modalPerfomanceController',
        controllerAs: '$ctrl',
        size: 'lg',
        resolve: {
          data: function () {
            return {
              consultants: vm.selection,
              fromDate: moment(vm.dateRange.fromDate.object).format("YYYY-MM-DD"),
              toDate: moment(vm.dateRange.toDate.object).format("YYYY-MM-DD")
            };
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    function getRelation() {
      if (_.isEmpty(vm.dateRange.fromDate.string) || _.isEmpty(vm.dateRange.toDate.string) || _.isEmpty(vm.selection)) {
        toaster.pop('warning', "Error", "Debe seleccionar un rango de fechas y al menos un consultor");
        return;
      }
      var data = {
        consultants: vm.selection,
        monthStart: moment(vm.dateRange.fromDate.object).format("YYYY-MM-DD"),
        monthEnd: moment(vm.dateRange.toDate.object).format("YYYY-MM-DD")
      };
      vm.showRelationGrid = true;

      dataService.getEarnings(data).$promise
        .then(function (response) {
          generateData(response.data, [], null).then(function (consultants) {
            vm.relationsOptions.relations = consultants;
            if (_.isEmpty(vm.relationsOptions.relations)) {
              toaster.pop('warning', "No hay Registros para las fechas indicadas");
            }
          });

        });
    }
    function getProfit(item) {
      return (item.receita_liquida + item.brut_salario) - item.comision;
    }

    function toggleSelection(id, e) {
      const idx = vm.selection.indexOf(id);
      var element = $(e.currentTarget),
        row = element.closest("tr");

      if (idx > -1) {
        vm.selection.splice(idx, 1);
        row.removeClass("k-state-selected");
      } else {
        row.addClass("k-state-selected");
        vm.selection.push(id);
      }
    }

    function generateData(remainder, consultants, deferred) {
      if (!deferred) { deferred = $q.defer(); }
      if (_.isEmpty(remainder)) {
        consultants = _.uniqBy(consultants, 'co_usuario');
        deferred.resolve(consultants);
        return deferred.promise;
      }
      var search = _.take(remainder)[0];
      var newList = _.dropWhile(remainder, function (o) { return o.co_usuario === search.co_usuario; });
      consultants.push({
        co_usuario: search.co_usuario,
        no_usuario: search.no_usuario,
        relations: _.filter(remainder, function (o) { return o.co_usuario === search.co_usuario; })
      });
      return generateData(newList, consultants, deferred);
    }

    function getMonthByID(id) {
      return moment({ month: id }).format('MMMM');
    }

    function toDateChanged() {
      vm.maxDate = new Date(vm.dateRange.toDate.string);
    }
    function fromDateChanged() {
      vm.minDate = new Date(vm.dateRange.fromDate.string);
    }

  }
})();




