import {Modules} from "./modules.js";

class TabServices {
    constructor() {
        let version = Modules.Server.getString("/api/version")
        Modules.Loader.getModuleShadowDomRoots("tabServices").forEach(SDRoot => {
            this.activateTabSwitches(SDRoot);
        });

         Modules.Loader.loadModuleInClass("tabServices", "./modules/", "ElasticCloudCalculator", "ElasticCloud");

    }



    activateTabSwitches(SDRoot) {
        let tablinks = SDRoot.querySelectorAll(".tablinks");
        let tabcontents = SDRoot.querySelectorAll(".tabcontent");

        tabcontents[0].classList.remove("hidden");
        tabcontents[0].classList.add("visible");

// tabcontents[0].className = tabcontents[0].className.replace(/\b"+ "hidden" +"\b/g, "");

        for (let i = 0; i < tablinks.length; i++) {
            Modules.Events.addListener(tablinks[i], "click", function (event) {
                for (let i = 0; i < tablinks.length; i++) {
                    if (tablinks[i].id == event.target.id) {
                        tablinks[i].classList.remove("tablinks_unselected");
                        tablinks[i].classList.add("tablinks_selected");
                    } else {
                        tablinks[i].classList.remove("tablinks_selected");
                        tablinks[i].classList.add("tablinks_unselected");
                    }
                }

                for (let j = 0; j < tabcontents.length; j++) {
                    if (tabcontents[j].id == event.target.id) {
                        tabcontents[j].classList.remove("hidden");
                        tabcontents[j].classList.add("visible");
                    } else {
                        tabcontents[j].classList.remove("visible");
                        tabcontents[j].classList.add("hidden");
                    }
                }
            });
        }
    }
}

let tabServices = new TabServices();



