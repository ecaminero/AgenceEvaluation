(function () {
    "use strict";

    angular
        .module("app.core")
        .constant("BASE_API_URI", "http://127.0.0.1:5000")
        .constant("moment", moment)
        .constant("_", window._);
})();