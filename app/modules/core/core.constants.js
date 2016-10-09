(function () {
    "use strict";

    angular
        .module("app.core")
        .constant("BASE_API_URI", "https://agenceevaluation-ecaminero.c9users.io")
        .constant("moment", moment)
        .constant("_", window._);
})();