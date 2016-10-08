(function () {
  'use strict';

  angular
    .module('app.home')
    .controller('homeController', homeController);

  /* @ngInject */
  function homeController($log, dataService) {
    var vm = this;
    vm.getConsultants = getConsultants;
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
      $log.info("homeController");
      vm.getConsultants();
    }

    function getConsultants(){
        dataService.getConsultants().$promise
        .then(function(res){
          vm.consultants = res.data;
        });
    }
  }
})();
