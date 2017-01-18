{
    var parseQueryString = function( queryString ) {
        var params = {}, queries, temp, i, l;
        // Split into key/value pairs
        queries = queryString.split("&amp;");
        // Convert the array of strings into an object
        for ( i = 0, l = queries.length; i < l; i++ ) {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }
        return params;
    };

    function run() {
        Modules.Loader.loadModule("modules", "menuBar", "menuBarContainer");
        Modules.Loader.loadModule("modules", "virtuozzo", "virtuozzo_tab_Container");
        Modules.Loader.loadModule("modules", "azurepack", "azurepack_tab_Container");
        Modules.Loader.loadModule("modules", "totalCost", "totalCostSpace");
        Modules.Loader.loadModule("modules", "virtuozzoResults", "virtuozzoResult_Container");
        Modules.Loader.loadModule("modules", "azurepackResults", "azurepackResult_Container");

        // Modules.Loader.loadModule("modules", "azure", "azure_tab_Container");

        var cloudPlatformSelector_virtuozzo = document.getElementsByClassName("cloudPlatformSelector_virtuozzo")[0];
        var cloudPlatformSelector_azurepack = document.getElementsByClassName("cloudPlatformSelector_azurepack")[0];
        var cloudPlatform_virtuozzo_tab = document.getElementsByClassName("virtuozzo_tab_Container")[0];
        var cloudPlatform_azurepack_tab = document.getElementsByClassName("azurepack_tab_Container")[0];

        function virtuozzoPlatformSelectorClicked() {
            classExchange(cloudPlatformSelector_virtuozzo, cloudPlatformSelector_azurepack, "active");
            classExchange(cloudPlatform_azurepack_tab, cloudPlatform_virtuozzo_tab, "collapse");
        }

        function azurePackPlatformSelectorClicked() {
            classExchange(cloudPlatformSelector_azurepack, cloudPlatformSelector_virtuozzo, "active");
            classExchange(cloudPlatform_virtuozzo_tab, cloudPlatform_azurepack_tab, "collapse");
        }

        function classExchange(destinationElement, sourceElement, className) {
            removeClass(sourceElement, className);
            addClass(destinationElement, className);
        }

        function removeClass(element, className) {
            var elementClasses = element.className.split(" ");
            var i = elementClasses.indexOf(className);
            if (i >= 0) {
                elementClasses.splice(i, 1);
                element.className = elementClasses.toString();
                return true;
            } else return false;
        }

        function addClass(element, className) {
            var elementClasses = element.className.split(" ");
            if (elementClasses.indexOf(className) == -1) {
                elementClasses.push(" " + className);
                element.className = elementClasses.toString();
                return true;
            } else return false;
        }

        function initializeCloudPlatformSelectors() {
            Modules.Events.addListener(cloudPlatformSelector_virtuozzo, "click", virtuozzoPlatformSelectorClicked);
            Modules.Events.addListener(cloudPlatformSelector_azurepack, "click", azurePackPlatformSelectorClicked);
        }

        function queryHandler(queryObject) {
            if (queryObject.url.localeCompare('azurepack') == 0) {
                azurePackPlatformSelectorClicked();
            }
        }

        initializeCloudPlatformSelectors();

        var queryObject = parseQueryString(window.location.search.substring(1));
        queryHandler(queryObject);
    }

    Modules.Events.addStartupListener(run);
}