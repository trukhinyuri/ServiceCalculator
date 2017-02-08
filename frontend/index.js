"use strict";
(function() {
    var parseQueryString = function( queryString ) {
        var params = {}, queries, temp, i, l;
        // Split into key/value pairs
        queries = queryString.split("&");
        // Convert the array of strings into an object
        for ( i = 0, l = queries.length; i < l; i++ ) {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }
        return params;
    };
    
    function loadRussianCalculator() {
        Modules.Loader.loadModule("modules", "menuBar", "menuBarContainer");
        Modules.Loader.loadModule("modules", "calculatorCommons", "calculatorCommons_Container");
        Modules.Loader.loadModule("modules", "virtuozzo", "virtuozzo_tab_Container");
        Modules.Loader.loadModule("modules", "azurepack", "azurepack_tab_Container");
        // Modules.Loader.loadModule("modules", "license", "license_tab_Container");
        Modules.Loader.loadModule("modules", "totalCost", "totalCostSpace");
        Modules.Loader.loadModule("modules", "virtuozzoResults", "virtuozzoResult_Container");
        Modules.Loader.loadModule("modules", "azurepackResults", "azurepackResult_Container");
        // Modules.Loader.loadModule("modules", "licenseResults", "licenseResult_Container");

        // Modules.Loader.loadModule("modules", "azure", "azure_tab_Container");
    }
    
    function loadEnglishCalculator() {
        // Modules.Loader.loadModule("modules", "menuBar_en", "menuBarContainer");
        Modules.Loader.loadModule("modules", "calculatorCommons_en", "calculatorCommons_Container");
        Modules.Loader.loadModule("modules", "azurepack_en", "azurepack_tab_Container");
        Modules.Loader.loadModule("modules", "azurepackResults_en", "azurepackResult_Container");
        Modules.Loader.loadModule("modules", "totalCost_en", "totalCostSpace");
    }

    function run() {
        var queryObject = parseQueryString(window.location.search.substring(1));
        queryHandler(queryObject);

        function tabClicked(e, source) {
            var cloudPlatformSelector_virtuozzo = document.getElementsByClassName("cloudPlatformSelector_virtuozzo")[0];
            var cloudPlatformSelector_azurepack = document.getElementsByClassName("cloudPlatformSelector_azurepack")[0];
            var cloudPlatformSelector_license = document.getElementsByClassName("cloudPlatformSelector_license")[0];
            var cloudPlatform_virtuozzo_tab = document.getElementsByClassName("virtuozzo_tab_Container")[0];
            var cloudPlatform_azurepack_tab = document.getElementsByClassName("azurepack_tab_Container")[0];
            // var cloudPlatform_license_tab = document.getElementsByClassName("license_tab_Container")[0];
            var cloudPlatformSelectors = document.getElementsByClassName("cloudPlatformSelectors");
            var tabContainers = document.getElementsByClassName("tabContainers");

            var clickedCloudPlatformSelectorClassName;
            var clickedCloudPlatformSelector;
            if (source instanceof Element) {
                clickedCloudPlatformSelectorClassName = source.className;
                clickedCloudPlatformSelector = source;
            } else {
                var e = window.event || e;
                var targ = e.target || e.srcElement;
                clickedCloudPlatformSelectorClassName = targ.parentNode.parentNode.className;
                clickedCloudPlatformSelector = targ.parentNode.parentNode;
            }


             if ((clickedCloudPlatformSelectorClassName.indexOf("active") == -1)
                 && (clickedCloudPlatformSelectorClassName.indexOf("cloudPlatformSelector") != -1)) {
                 for (var i = 0; i < cloudPlatformSelectors.length; i++) {
                     if (cloudPlatformSelectors[i].className.indexOf("active") != -1) {
                         removeClass(cloudPlatformSelectors[i], "active");
                     }
                 }
                 addClass(clickedCloudPlatformSelector, "active");

                 var toActivePlatformTabClassName = clickedCloudPlatformSelectorClassName.substr(
                     clickedCloudPlatformSelectorClassName.indexOf("_") + 1, clickedCloudPlatformSelectorClassName.length);

                 for (var i = 0; i < tabContainers.length; i++) {
                     if (tabContainers[i].className.includes(toActivePlatformTabClassName) == true) {
                         removeClass(tabContainers[i], "collapse");
                     } else {
                         addClass(tabContainers[i], "collapse");
                     }
                 }
             }
        }



        function removeClass(element, className) {
            element.classList.remove(className);
        }

        function addClass(element, className) {
            if (element.className.indexOf(className) == -1) {
                element.className = element.className + " " + className;
            }
        }

        function initializeCloudPlatformSelectors() {
            var cloudPlatformSelector_virtuozzo = document.getElementsByClassName("cloudPlatformSelector_virtuozzo")[0];
            var cloudPlatformSelector_azurepack = document.getElementsByClassName("cloudPlatformSelector_azurepack")[0];
            var cloudPlatformSelector_license = document.getElementsByClassName("cloudPlatformSelector_license")[0];
            var cloudPlatform_virtuozzo_tab = document.getElementsByClassName("virtuozzo_tab_Container")[0];
            var cloudPlatform_azurepack_tab = document.getElementsByClassName("azurepack_tab_Container")[0];
            // var cloudPlatform_license_tab = document.getElementsByClassName("license_tab_Container")[0];
            var cloudPlatformSelectors = document.getElementsByClassName("cloudPlatformSelectors");
            var tabContainers = document.getElementsByClassName("tabContainers");

            Modules.Events.addListener(cloudPlatformSelector_virtuozzo, "click", tabClicked);
            Modules.Events.addListener(cloudPlatformSelector_azurepack, "click", tabClicked);
            // Modules.Events.addListener(cloudPlatformSelector_license, "click", tabClicked);
        }

        function queryHandler(queryObject) {
            if (queryObject.lang) {
                if (queryObject.lang.localeCompare('en_euro') == 0) {
                    loadEnglishCalculator();
                } else if (queryObject.lang.localeCompare('ru_rub') == 0) {
                    loadRussianCalculator();
                }
            } else {
                loadRussianCalculator();
            }

            var cloudPlatformSelector_virtuozzo = document.getElementsByClassName("cloudPlatformSelector_virtuozzo")[0];
            var cloudPlatformSelector_azurepack = document.getElementsByClassName("cloudPlatformSelector_azurepack")[0];
            var cloudPlatformSelector_license = document.getElementsByClassName("cloudPlatformSelector_license")[0];
            var cloudPlatform_virtuozzo_tab = document.getElementsByClassName("virtuozzo_tab_Container")[0];
            var cloudPlatform_azurepack_tab = document.getElementsByClassName("azurepack_tab_Container")[0];
            // var cloudPlatform_license_tab = document.getElementsByClassName("license_tab_Container")[0];
            var cloudPlatformSelectors = document.getElementsByClassName("cloudPlatformSelectors");
            var tabContainers = document.getElementsByClassName("tabContainers");

            if (queryObject.url) {
                if (queryObject.url.localeCompare('virtuozzo') == 0) {
                    tabClicked(null, cloudPlatformSelector_virtuozzo);
                }
                else if (queryObject.url.localeCompare('azurepack') == 0) {
                    tabClicked(null, cloudPlatformSelector_azurepack);
                }
                // else if (queryObject.url.localeCompare('license') == 0) {
                //     tabClicked(cloudPlatformSelector_license);
                // }
            }
        }

        initializeCloudPlatformSelectors();


    }

    Modules.Events.addStartupListener(run);
}());