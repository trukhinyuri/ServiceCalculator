"use strict";
(function () {
    Modules.Events.addStartupListener(run);
    function run() {
        var initializeCloudPlatformSelectors = function () {
            var cloudPlatformSelector_virtuozzo = document.getElementsByClassName("cloudPlatformSelector_virtuozzo")[0];
            var cloudPlatformSelector_azurepack = document.getElementsByClassName("cloudPlatformSelector_azurepack")[0];
            var cloudPlatform_virtuozzo_tab = document.getElementsByClassName("virtuozzo_tab")[0];
            var cloudPlatform_azurepack_tab = document.getElementsByClassName("azurepack_tab")[0];
            Modules.Events.addListener(cloudPlatformSelector_virtuozzo, "click", virtuozzoPlatformSelectorClicked);
            Modules.Events.addListener(cloudPlatformSelector_azurepack, "click", azurePackPlatformSelectorClicked);

            function virtuozzoPlatformSelectorClicked() {
                classExchange(cloudPlatformSelector_virtuozzo, cloudPlatformSelector_azurepack, "active");
                classExchange(cloudPlatform_azurepack_tab, cloudPlatform_virtuozzo_tab, "collapse");
            }

            function azurePackPlatformSelectorClicked() {
                classExchange(cloudPlatformSelector_azurepack, cloudPlatformSelector_virtuozzo, "active");
                classExchange(cloudPlatform_virtuozzo_tab, cloudPlatform_azurepack_tab, "collapse");
            }

            function classExchange(destinationElement, sourceElement, className) {
                var destinationClasses = destinationElement.className.split(' ');
                if (destinationClasses.indexOf(className) == -1) {
                    var removeActivePlatformClasses = sourceElement.className.split(' ');
                    var i = removeActivePlatformClasses.indexOf(className);
                    removeActivePlatformClasses.splice(i, 1);
                    destinationClasses.push(" " + className);
                    destinationElement.className = destinationClasses.toString();
                    sourceElement.className = removeActivePlatformClasses.toString();
                    return true;
                } else return false;
            }


        };
        initializeCloudPlatformSelectors();

        var price = new Price.VirtuozzoPrice();
        var virtuozzoCalculator = new Virtuozzo.Calculator(price);

        //limits
        var minCPUCores = 1;
        var maxCPUCores = 24;
        var minFrequency = 1;
        var maxFrequency = 2.3;
        var minDiskCapacity = 10;
        var maxDiskCapacity = 2000;
        var minRamCapacity = 0.5;
        var maxRamCapacity = 64;
        var minipv4 = 0;
        var maxipv4 = 10;
        var minTrafficOut = 0;

        var addButton = document.getElementsByClassName("addButton")[0];
        var clearItemsButton = document.getElementsByClassName("clearItemsButton")[0];
        var clearListButton = document.getElementsByClassName("clearListButton")[0];
        var clearLastButton = document.getElementsByClassName("clearLastButton")[0];
        var listSpace = document.getElementsByClassName("listSpace")[0];
        var resultSpace = document.getElementsByClassName("resultSpace")[0];
        var downloadSpace = document.getElementsByClassName("downloadSpace")[0];

        Modules.Events.addListener(addButton, "click", addToList);
        Modules.Events.addListener(clearItemsButton, "click", clearItems);
        Modules.Events.addListener(clearListButton, "click", clearList);
        Modules.Events.addListener(clearLastButton, "click", clearLast);

        var region = document.getElementsByClassName("region")[0];
        var serverName = document.getElementsByClassName("serverName")[0];
        var cores = document.getElementsByClassName("cores")[0];
        var frequency = document.getElementsByClassName("frequency")[0];
        var disk = document.getElementsByClassName("disk")[0];
        var backupCount = document.getElementsByClassName("backupCount")[0];
        var backupSpace = document.getElementsByClassName("backupSpace")[0];
        var ram = document.getElementsByClassName("ram")[0];
        var ipv4 = document.getElementsByClassName("ipv4")[0];
        var trafficOut = document.getElementsByClassName("trafficOut")[0];
        var vtType = document.getElementsByClassName("vtType")[0];
        var osType = document.getElementsByClassName("osType")[0];
        var runningDays = document.getElementsByClassName("runningDays")[0];
        var runningHours = document.getElementsByClassName("runningHours")[0];
        var stoppedDays = document.getElementsByClassName("stoppedDays")[0];
        var stoppedHours = document.getElementsByClassName("stoppedHours")[0];
        var virtuozzoServersTable = document.getElementsByClassName("virtuozzoServersTable")[0].getElementsByTagName('tbody')[0];

        var sum = 0;
        var costOfServersList = [];
        var exportDoc = "";
        var exportResult = "";
        serverName.focus();



        function addToList() {
            var regionValue = region.selectedIndex;
            console.log("region:" + region.value);
            var serverNameValue = validateServerName(serverName.value);
            console.log("validated_serverName:" + serverNameValue);
            var coresValue = validateCPULimits(isNumberInputCorrect(cores.value));
            console.log("validated_coresValue:" + coresValue);
            var frequencyValue = validateFrequencyLimits(isNumberInputCorrect(frequency.value));
            console.log("validated_frequency:" + frequencyValue);
            var diskValue = validateDiskLimits(isNumberInputCorrect(disk.value));
            console.log("validated_diskCapacity:" + diskValue);
            var backupCountValue = validatebackupCount(isNumberInputCorrect(backupCount.value));
            console.log("validated_backupCountValue:" + backupCountValue);
            var backupSpaceValue = validatebackupSpace(isNumberInputCorrect(backupSpace.value), parseFloat(diskValue), parseFloat(backupCountValue));
            console.log("validated_backupSpaceValue:" + backupSpaceValue);
            var ramValue = validateRamLimits(isNumberInputCorrect(ram.value));
            console.log("validated_RamCapacity:" + ramValue);
            var ipv4Value = validateipv4Limits(isNumberInputCorrect(ipv4.value));
            console.log("validated_ipv4Limits:" + ipv4Value);
            var trafficOutValue = validateTrafficOutLimits(isNumberInputCorrect(trafficOut.value));
            console.log("validated_TrafficLimits:" + trafficOutValue);
            //windows must be only vm
            if (osType.selectedIndex == 1) {
                vtType.selectedIndex = 1;
            }
            var vtTypeIndex = vtType.selectedIndex;
            console.log("vtType:" + vtType.value);
            var osTypeIndex = osType.selectedIndex;
            console.log("osType:" + osType.value);

            var runningDaysValue = validateRunningDays(isNumberInputCorrect(runningDays.value));
            console.log("validated_runningDays:" + runningDaysValue);

            var runningHoursValue = validateRunningHours(isNumberInputCorrect(runningHours.value));
            console.log("validated_runningHours:" + runningHoursValue);

            var stoppedDaysValue = validateStoppedDays(isNumberInputCorrect(stoppedDays.value));
            console.log("validated_stoppedDays:" + stoppedDaysValue);

            var stoppedHoursValue = validateStoppedHours(isNumberInputCorrect(stoppedHours.value));
            console.log("validated_stoppedHours:" + stoppedHoursValue);

            if (runningDaysValue | runningHoursValue | stoppedDaysValue | stoppedHoursValue != 0) {
                var virtuozzoServer = new Virtuozzo.Server(
                    regionValue,
                    serverNameValue,
                    coresValue,
                    frequencyValue,
                    ramValue,
                    diskValue,
                    backupCountValue,
                    backupSpaceValue,
                    ipv4Value,
                    trafficOutValue,
                    vtTypeIndex,
                    osTypeIndex,
                    runningDaysValue,
                    runningHoursValue,
                    stoppedDaysValue,
                    stoppedHoursValue);

                virtuozzoCalculator.addServer(virtuozzoServer);
                var costOfServer = virtuozzoCalculator.getCostOfServer(virtuozzoServer);
                costOfServersList.push(parseFloat(costOfServer));
                sum += parseFloat(costOfServer);

                var row = virtuozzoServersTable.insertRow(virtuozzoServersTable.rows.length);
                var cellServerName = row.insertCell(0);
                cellServerName.appendChild(document.createTextNode(serverNameValue));

                var cellRegion = row.insertCell(1);
                if (regionValue == 0) {
                    cellRegion.appendChild(document.createTextNode("Россия, Санкт-Петербург (SSD)"));
                } else if (regionValue == 1) {
                    cellRegion.appendChild(document.createTextNode("Россия, Москва (Tier III Gold, SSD-cache)"));
                } else if (regionValue == 2) {
                    cellRegion.appendChild(document.createTextNode("Европа, Амстердам (SSD)"));
                }

                var cellCores = row.insertCell(2);
                cellCores.appendChild(document.createTextNode(coresValue));

                var cellFrequency = row.insertCell(3);
                cellFrequency.appendChild(document.createTextNode(frequencyValue + " ГГц."));

                var cellRam = row.insertCell(4);
                cellRam.appendChild(document.createTextNode(ramValue + " ГБ."));

                var cellDisk = row.insertCell(5);
                cellDisk.appendChild(document.createTextNode(diskValue + " ГБ."));

                var cellBackups = row.insertCell(6);
                cellBackups.appendChild(document.createTextNode(backupCountValue * backupSpaceValue + " ГБ."));

                var cellIPv4 = row.insertCell(7);
                cellIPv4.appendChild(document.createTextNode(ipv4Value));

                var cellTrafficOut = row.insertCell(8);
                cellTrafficOut.appendChild(document.createTextNode(trafficOutValue + " ГБ."));

                var cellVtType = row.insertCell(9);
                if (vtTypeIndex == 1) {
                    cellVtType.appendChild(document.createTextNode("Виртуальная машина"));
                } else {
                    cellVtType.appendChild(document.createTextNode(vtType.value));
                }

                var cellOSType = row.insertCell(10);
                cellOSType.appendChild(document.createTextNode(osType.value));

                var cellRunning = row.insertCell(11);
                if ((parseFloat(runningDaysValue) != 0) && (parseFloat(runningHoursValue) != 0)) {
                    cellRunning.appendChild(document.createTextNode(runningDaysValue + " дн., " + runningHoursValue + "ч."));
                } else if ((parseFloat(runningDaysValue) == 0) && (parseFloat(runningHoursValue) != 0)) {
                    cellRunning.appendChild(document.createTextNode(runningHoursValue + " ч."));
                } else if ((parseFloat(runningDaysValue) != 0) && (parseFloat(runningHoursValue) == 0)) {
                    cellRunning.appendChild(document.createTextNode(runningDaysValue + " дн."));
                } else if ((parseFloat(runningDaysValue) == 0) && (parseFloat(runningHoursValue) == 0)) {
                    cellRunning.appendChild(document.createTextNode("-"));
                }

                var cellStopped = row.insertCell(12);
                if ((parseFloat(stoppedDaysValue) != 0) && (parseFloat(stoppedHoursValue) != 0)) {
                    cellStopped.appendChild(document.createTextNode(stoppedDaysValue + " дн., " + stoppedHoursValue + "ч."));
                } else if ((parseFloat(stoppedDaysValue) == 0) && (parseFloat(stoppedHoursValue) != 0)) {
                    cellStopped.appendChild(document.createTextNode(stoppedHoursValue + " ч."));
                } else if ((parseFloat(stoppedDaysValue) != 0) && (parseFloat(stoppedHoursValue) == 0)) {
                    cellStopped.appendChild(document.createTextNode(stoppedDaysValue + " дн."));
                } else if ((parseFloat(stoppedDaysValue) == 0) && (parseFloat(stoppedHoursValue) == 0)) {
                    cellStopped.appendChild(document.createTextNode("-"));
                }

                var cellServerCost = row.insertCell(13);
                cellServerCost.appendChild(document.createTextNode(costOfServer + " руб."));
            } else clearItems();

            updateResult();
            serverName.focus();
        }

        function clearItems() {
            serverName.value = "";
            cores.value = "";
            frequency.value = "";
            disk.value = "";
            backupCount.value = "";
            backupSpace.value = "";
            ram.value = "";
            ipv4.value = "";
            trafficOut.value = "";
            runningDays.value = "";
            runningHours.value = "";
            stoppedDays.value = "";
            stoppedHours.value = "";
        }
        function clearList() {
            while(virtuozzoServersTable.rows[0]) virtuozzoServersTable.deleteRow(0);
            sum = 0;
            costOfServersList = [];
            updateResult();
        }
        function clearLast() {
            virtuozzoServersTable.deleteRow(virtuozzoServersTable.rows.length -1);
            sum = sum - costOfServersList[costOfServersList.length - 1];
            costOfServersList.pop();
            updateResult();
        }

        function updateResult() {
            resultSpace.innerHTML = "<h3 class='resultHeader'>" + "Примерная стоимость облачной инфраструктуры: " + parseFloat(sum).toFixed(2).toString() + " руб."+ "</h3>";
            exportResult = "Примерная стоимость облачной инфраструктуры: " + parseFloat(sum).toFixed(2).toString() + " руб. в месяц" + "\r\n";
        }

        function generateExportLink(content) {
            downloadSpace.innerHTML = "";
            var exportLink = downloadSpace.appendChild(document.createElement("a"));
            exportLink.download = "export.txt";
            exportLink.innerHTML = "Примерный счет (txt)";
            console.log(content.toString());
            exportLink.href="data:text/plain;charset=utf-8," + content;
        }

        function isNumberInputCorrect(text) {
            text = checkCommaInInput(text);
            return text;
        }

        function checkCommaInInput(text) {
            text = text.replace(/,/g, '.');
            return text;
        }

        function validateServerName(serverNameValue) {
            if (isEmptyOrSpaces(serverNameValue) == true) {
                serverName.value = "Облачный сервер";
                return "Облачный сервер";
            } else {
                return serverNameValue;
            }
        }

        function isEmptyOrSpaces(str){
            return str === null || str.match(/^ *$/) !== null;
        }

        function validateCPULimits(coresValue) {
            if (isEmptyOrSpaces(coresValue)) {
                cores.value = minCPUCores;
                return minCPUCores;
            }

            if (coresValue < minCPUCores) {
                cores.value = minCPUCores;
                return minCPUCores;
            } else if (coresValue > maxCPUCores) {
                cores.value = maxCPUCores;
                return maxCPUCores;
            }
            return coresValue;
        }

        function validateFrequencyLimits(frequencyValue) {
            if (isEmptyOrSpaces(frequencyValue)) {
                frequency.value = minFrequency;
                return minFrequency;
            }
            if (frequencyValue < minFrequency) {
                frequency.value = minFrequency;
                return minFrequency;
            } else if (frequencyValue > maxFrequency) {
                frequency.value = maxFrequency;
                return maxFrequency;
            }
            return frequencyValue;
        }

        function validateDiskLimits (diskCapacity) {
            if (isEmptyOrSpaces(diskCapacity)) {
                disk.value = minDiskCapacity;
                return minDiskCapacity;
            }
            if (diskCapacity < minDiskCapacity) {
                disk.value = minDiskCapacity;
                return minDiskCapacity;
            } else if (diskCapacity > maxDiskCapacity) {
                disk.value = maxDiskCapacity;
                return maxDiskCapacity;
            }
            return diskCapacity;
        }

        function validatebackupCount(backupCountValue) {
            if (isEmptyOrSpaces(backupCountValue)) {
                backupCount.value = 0;
                return 0;
            }

            if (backupCountValue < 0) {
                backupCount.value = 0;
                return 0;
            } else return backupCountValue;
        }

        function validatebackupSpace(backupSpaceValue, diskCapacity, backupCountValue) {
            if (isEmptyOrSpaces(backupSpaceValue) || (backupCountValue == 0)) {
                backupSpace.value = 0;
                return 0;
            }

            if (backupSpaceValue < 0) {
                backupSpace.value = 0;
                return 0;
            } else if (backupSpaceValue > diskCapacity) {
                backupSpace.value = diskCapacity;
                return diskCapacity;
            } else return backupSpaceValue;
        }

        function validateRamLimits (ramCapacity) {
            if (isEmptyOrSpaces(ramCapacity)) {
                ram.value = minRamCapacity;
                return minRamCapacity;
            }
            if (ramCapacity < minRamCapacity) {
                ram.value = minRamCapacity;
                return minRamCapacity;
            } else if (ramCapacity > maxRamCapacity) {
                ram.value = maxRamCapacity;
                return maxRamCapacity;
            }
            return ramCapacity;
        }
        function validateipv4Limits (ipv4Count) {
            if (isEmptyOrSpaces(ipv4Count)) {
                ipv4.value = 1;
                return 1; //Recommended minimum 1 ipv4 adress for internet access.
            }
            if (ipv4Count < minipv4) {
                ipv4.value = minipv4;
                return minipv4;
            } else if (ipv4Count > maxipv4) {
                ipv4.value = maxipv4;
                return maxipv4;
            }
            return ipv4Count;
        }
        function validateTrafficOutLimits (trafficOutValue) {
            if (isEmptyOrSpaces(trafficOutValue)) {
                trafficOut.value = 0;
                return 0;
            }
            if (trafficOutValue < minTrafficOut) {
                trafficOut.value = price.currentPrice[region.selectedIndex].trafficFreeLim;
                return price.currentPrice[region.selectedIndex].trafficFreeLim;
            }
            return trafficOutValue;
        }

        function validateRunningDays(runningDaysValue) {
            if (isEmptyOrSpaces(runningDaysValue) == true) {
                runningDays.value = 30;
                return 30;
            } else if (runningDaysValue < 0) {
                runningDays.value = 0;
                return 0;
            } else
                return runningDaysValue;
        }

        function validateRunningHours(runningHoursValue) {
            if (isEmptyOrSpaces(runningHoursValue) == true) {
                runningHours.value = 0;
                return 0;
            } else if (runningHoursValue < 0) {
                runningHours.value = 0;
                return 0;
            } else
                return runningHoursValue;
        }

        function validateStoppedDays(stoppedDaysValue) {
            if (isEmptyOrSpaces(stoppedDaysValue) == true) {
                stoppedDays.value = 0;
                return 0;
            } else if (stoppedDaysValue < 0) {
                stoppedDays.value = 0;
                return 0;
            } else
                return stoppedDaysValue;
        }

        function validateStoppedHours(stoppedHoursValue) {
            if (isEmptyOrSpaces(stoppedHoursValue) == true) {
                stoppedHours.value = 0;
                return 0;
            } else if (stoppedHoursValue < 0) {
                stoppedHours.value = 0;
                return stoppedHours.value;
            } else
                return stoppedHoursValue;
        }
    }
}());