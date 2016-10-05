;(function(angular) {
(function () {
    'use strict';

    angular
        .module('app', ['app.core', 'app.home'])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
        }])
        .run(['$rootScope', '$state', function ($rootScope, $state) {
            $state.go('home');
        }]);

})();
})(angular);