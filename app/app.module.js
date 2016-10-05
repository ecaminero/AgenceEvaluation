(function () {
    'use strict';

    angular
        .module('app', ['app.core', 'app.home', 'app.notification'])
        .config(function ($httpProvider) {
            $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
        })
        .run(function ($rootScope, $state) {
            $state.go('notification');
        });

})();