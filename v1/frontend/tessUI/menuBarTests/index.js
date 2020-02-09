"use strict";
(function () {
    Modules.Events.addStartupListener(run);
    function run() {
        Modules.Loader.loadModule("../../modules", "menuBar", "menuBarContainer");
    }
}());