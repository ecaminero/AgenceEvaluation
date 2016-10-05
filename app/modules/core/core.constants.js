(function () {
    "use strict";

    angular
        .module("app.core")
        .constant("BASE_API_URL", "http://localhost:50883")
        //.constant("moment", moment)
        .constant("_", window._);
})();