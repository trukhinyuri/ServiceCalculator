import {Modules} from "./modules.js";


let run = function () {
     Modules.Loader.loadModuleInClass(null, "./modules/", "calculatorHeader", "pageHeader");
     Modules.Loader.loadModuleInClass(null, "./modules/", "tabServices", "services");
     Modules.Loader.loadModuleInClass(null, "./modules/", "result", "results");

};
Modules.Events.addStartupListener(run);