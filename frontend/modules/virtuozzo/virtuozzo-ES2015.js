"use strict";
const VIRTUOZZO = {};
VIRTUOZZO.Controller = class {
    get modelInstalce() {
        return this._modelInstance;
    }

    constructor(modelInstance) {
        this._modelInstance = modelInstance;

        let price = new PriceES2015.Virtuozzo();
        this.addButtonsEventListeners(addToList, clearItems, clearList);

        let virtuozzoCalculator = new Virtuozzo.Calculator(price);

        let resultSpace = document.getElementsByClassName("resultSpace")[0];
        let downloadSpace = document.getElementsByClassName("downloadSpace")[0];

        let region = document.getElementsByClassName("virtuozzo_region")[0];
        let serverName = document.getElementsByClassName("virtuozzo_serverName")[0];
        let cores = document.getElementsByClassName("virtuozzo_cores")[0];
        let frequency = document.getElementsByClassName("virtuozzo_frequency")[0];
        let disk = document.getElementsByClassName("virtuozzo_disk")[0];
        let backupCount = document.getElementsByClassName("virtuozzo_backupCount")[0];
        // let backupSpace = document.getElementsByClassName("virtuozzo_backupSpace")[0];
        let ram = document.getElementsByClassName("virtuozzo_ram")[0];
        let ipv4 = document.getElementsByClassName("virtuozzo_ipv4")[0];
        let trafficOut = document.getElementsByClassName("virtuozzo_trafficOut")[0];
        let trafficGroup = document.getElementsByClassName("virtuozzo_groupTrafficDefaultContainer")[0];
        let vtType = document.getElementsByClassName("virtuozzo_vtType")[0];
        let osType = document.getElementsByClassName("virtuozzo_osType")[0];
        let runningDays = document.getElementsByClassName("virtuozzo_runningDays")[0];
        let runningHours = document.getElementsByClassName("virtuozzo_runningHours")[0];
        let stoppedDays = document.getElementsByClassName("virtuozzo_stoppedDays")[0];
        let stoppedHours = document.getElementsByClassName("virtuozzo_stoppedHours")[0];
        let virtuozzoServersTable = document.getElementsByClassName("virtuozzoServersTable")[0].getElementsByTagName('tbody')[0];
        let virtuozzoServersTableOwn = document.getElementsByClassName("virtuozzoServersTable")[0];
        let resultsTables = document.getElementsByClassName("resultsTable");
        let clearableTables = document.getElementsByClassName("clearableTable");

        Modules.Events.addListener(region, 'change', onRegionChange);

        //Build region in form
        let loadRegionDataFromPriceInForm = function (price) {
            for (let i = 0; i < Object.keys(price.currentPrice).length; i++) {
                let opt = document.createElement('option');
                opt.value = i;
                opt.innerHTML = price.currentPrice[i].region;
                region.appendChild(opt);
            }
        };
        loadRegionDataFromPriceInForm(price);

        let regionSelected = region.selectedIndex;
        let currentPrice = price.currentPrice[regionSelected];

        let priceLimits = currentPrice.limits;
        let priceConfiguration = currentPrice.configuration;
        let priceDefaults = currentPrice.defaults;

        //priceLimits
        let minCPUCores = currentPrice.limits.minCPUCores;
        let maxCPUCores = currentPrice.limits.maxCPUCores;
        let minFrequency = currentPrice.limits.minCPUFrequency;
        let maxFrequency = currentPrice.limits.maxCPUFrequency;
        let minRamCapacity = currentPrice.limits.minRamCapacity;
        let maxRamCapacity = currentPrice.limits.maxRamCapacity;
        let minDiskCapacity = currentPrice.limits.minDiskCapacity;
        let maxDiskCapacity = currentPrice.limits.maxDiskCapacity;
        let minIPv4 = currentPrice.limits.minIPv4;
        let maxIPv4 = currentPrice.limits.maxIPv4;

        //priceConfiguration
        let trafficFreeLim = currentPrice.configuration.trafficFreeLim;
        let isTrafficUnlim = currentPrice.configuration.isTrafficUnlim;
        let isMonthIPPayments = currentPrice.configuration.isMonthIPPayments;

        //setPlaceholders
        serverName.placeholder = priceDefaults.serverName;
        cores.placeholder = "от " + priceLimits.minCPUCores + " до " + priceLimits.maxCPUCores;
        frequency.placeholder = "от " + priceLimits.minCPUFrequency + " до " + priceLimits.maxCPUFrequency;
        ram.placeholder = "от " + priceLimits.minRamCapacity + " до " + priceLimits.maxRamCapacity;
        disk.placeholder = "от " + priceLimits.minDiskCapacity + " до " + priceLimits.maxDiskCapacity;
        backupCount.placeholder = priceDefaults.backupCount;
        ipv4.placeholder = "от " + priceLimits.minIPv4 + " до " + priceLimits.maxIPv4;
        trafficOut.placeholder = priceConfiguration.trafficFreeLim;

        if (isTrafficUnlim == true) {
            addClass(trafficGroup, "virtuozzo_groupTrafficDefaultContainer_collapsed");
        } else {
            removeClass(trafficGroup, "virtuozzo_groupTrafficDefaultContainer_collapsed");
        }

        function removeClass(element, className) {
            element.classList.remove(className);
        }

        function addClass(element, className) {
            if (element.className.indexOf(className) == -1) {
                element.className = element.className + " " + className;
            }
        }

        //Build vtType in form
        let loadVtTypeDataFromPriceInForm = function () {
            for (let i = 0; i < Object.keys(currentPrice.limits.vtType).length; i++) {
                let opt = document.createElement('option');
                opt.value = i;
                opt.innerHTML = currentPrice.limits.vtType[i];
                vtType.appendChild(opt);
            }
        };
        loadVtTypeDataFromPriceInForm();

        //Build osType in form
        let loadOSTypeDataFromPriceInForm = function () {
            for (let i = 0; i < Object.keys(currentPrice.limits.osType).length; i++) {
                let opt = document.createElement('option');
                opt.value = i;
                opt.innerHTML = currentPrice.limits.osType[i];
                osType.appendChild(opt);
            }
        };
        loadOSTypeDataFromPriceInForm();
        //End of build form

        runningDays.placeholder = priceDefaults.runningDays;
        stoppedDays.placeholder = priceDefaults.stoppedDays;
        runningHours.placeholder = priceDefaults.runningHours;
        stoppedHours.placeholder = priceDefaults.stoppedHours;

        //Region Change
        function onRegionChange() {
            regionSelected = region.selectedIndex;
            currentPrice = price.currentPrice[regionSelected];

            priceLimits = currentPrice.limits;
            priceConfiguration = currentPrice.configuration;
            priceDefaults = currentPrice.defaults;

            //priceLimits
            minCPUCores = currentPrice.limits.minCPUCores;
            maxCPUCores = currentPrice.limits.maxCPUCores;
            minFrequency = currentPrice.limits.minCPUFrequency;
            maxFrequency = currentPrice.limits.maxCPUFrequency;
            minRamCapacity = currentPrice.limits.minRamCapacity;
            maxRamCapacity = currentPrice.limits.maxRamCapacity;
            minDiskCapacity = currentPrice.limits.minDiskCapacity;
            maxDiskCapacity = currentPrice.limits.maxDiskCapacity;
            minIPv4 = currentPrice.limits.minIPv4;
            maxIPv4 = currentPrice.limits.maxIPv4;

            //priceConfiguration
            trafficFreeLim = currentPrice.configuration.trafficFreeLim;
            isTrafficUnlim = currentPrice.configuration.isTrafficUnlim;
            isMonthIPPayments = currentPrice.configuration.hourlyIPPayments;

            if (isTrafficUnlim == true) {
                addClass(trafficGroup, "virtuozzo_groupTrafficDefaultContainer_collapsed");
            } else {
                removeClass(trafficGroup, "virtuozzo_groupTrafficDefaultContainer_collapsed");
            }
        }
        //End of region change

        //ContextMenu

        let selectedRow = null;
        let menu = new ax5.ui.menu({
            theme: 'default',
            items: [
                {
                    id: 0,
                    label: "↑ Использовать в форме"
                },
                {
                    id: 1,
                    label: "Клонировать"
                },
                {
                    id: 2,
                    label: "Удалить"
                }
            ],
            onClick: function (e) {
                if (this.id == 0) {
                    fillInputForm(selectedRow);
                } else if (this.id == 1) {
                    cloneTableItem(selectedRow);
                } else if (this.id == 2) {
                    deleteTableItem(selectedRow);
                }
            }
        });

        //TODO fix region recovery
        function fillInputForm(i) {

            serverName.focus();
            serverName.value = virtuozzoServersTable.rows[i].cells[0].innerHTML;

            region.focus();
            let regionSelectedIndexString = virtuozzoServersTable.rows[i].cells[1].innerHTML;

            for (let i = 0; i < Object.keys(price.currentPrice).length; i++) {
                if (regionSelectedIndexString.localeCompare(price.currentPrice[i].region) == 0) {
                    region.selectedIndex = i;
                }
            }

            cores.focus();
            cores.value = virtuozzoServersTable.rows[i].cells[2].innerHTML;

            frequency.focus();
            let frequencyValueString = virtuozzoServersTable.rows[i].cells[3].innerHTML;
            frequency.value = parseFloat(frequencyValueString.replace(" ГГц.", ""));

            ram.focus();
            let ramValueString = virtuozzoServersTable.rows[i].cells[4].innerHTML;
            ram.value = parseFloat(ramValueString.replace(" ГБ.", ""));

            disk.focus();
            let diskValueString = virtuozzoServersTable.rows[i].cells[5].innerHTML;
            let diskValue = parseFloat(diskValueString.replace(" ГБ.", ""))
            disk.value = diskValue;

            backupCount.focus();
            let backupCountValueString = virtuozzoServersTable.rows[i].cells[6].innerHTML;
            let backupCountGbValue = parseFloat(backupCountValueString.replace(" ГБ.", ""));
            let backupCountValue = backupCountGbValue / diskValue;
            backupCount.value = backupCountValue;

            ipv4.focus();
            ipv4.value = virtuozzoServersTable.rows[i].cells[7].innerHTML;

            trafficOut.focus();
            let trafficOutValueString = virtuozzoServersTable.rows[i].cells[8].innerHTML;
            if (trafficOutValueString.localeCompare("∞ до 1Gbps") === 0) {
                trafficOut.value = 0;
            } else {
                trafficOut.value = parseFloat(trafficOutValueString.replace(" ГБ. до 1Gbps", ""));
            }

            vtType.focus();
            let vtTypeSelectedIndexString = virtuozzoServersTable.rows[i].cells[9].innerHTML;
            let virt0 = "Контейнер";
            let virt1 = "Виртуальная машина";

            if (vtTypeSelectedIndexString.localeCompare(virt0) == 0) {
                vtType.selectedIndex = 0;
            } else if (vtTypeSelectedIndexString.localeCompare(virt1) == 0) {
                vtType.selectedIndex = 1;
            }

            osType.focus();
            let osTypeSelectedIndexString = virtuozzoServersTable.rows[i].cells[10].innerHTML;
            let os0 = "Linux";
            let os1 = "Windows";

            if (osTypeSelectedIndexString.localeCompare(os0) == 0) {
                osType.selectedIndex = 0;
            } else if (osTypeSelectedIndexString.localeCompare(os1) == 0) {
                osType.selectedIndex = 1;
            }

            let runningDaysHoursValueString = virtuozzoServersTable.rows[i].cells[11].innerHTML;
            if (runningDaysHoursValueString.indexOf(',') > -1) {
                let runningDaysValueString = runningDaysHoursValueString.substr(0, runningDaysHoursValueString.indexOf(','));
                let runningDaysValue = runningDaysValueString.replace(" дн.","");
                runningDays.focus();
                runningDays.value = runningDaysValue;

                let runningHoursValueStringWithSymbol = runningDaysHoursValueString.substr(runningDaysHoursValueString.indexOf(','), runningDaysHoursValueString.length);
                let runningHoursValueString = runningHoursValueStringWithSymbol.replace(", ", "");
                let runningHoursValue = runningHoursValueString.replace("ч.","");
                runningHours.focus();
                runningHours.value = runningHoursValue;
            } else if (runningDaysHoursValueString.localeCompare("-") == 0) {
                runningDays.focus();
                runningDays.value = 0;
                runningHours.focus();
                runningHours.value = 0;
            } else if (runningDaysHoursValueString.indexOf('ч') > -1) {
                let runningHoursValue = runningDaysHoursValueString.replace("ч.","");
                runningDays.focus();
                runningDays.value = 0;
                runningHours.focus();
                runningHours.value = runningHoursValue;

            } else {
                let runningDaysValue = runningDaysHoursValueString.replace(" дн.","");
                runningDays.focus();
                runningDays.value = runningDaysValue;

                runningHours.focus();
                runningHours.value = 0;
            }

            let stoppedDaysHoursValueString = virtuozzoServersTable.rows[i].cells[12].innerHTML;
            if (stoppedDaysHoursValueString.indexOf(',') > -1) {
                let stoppedDaysValueString = stoppedDaysHoursValueString.substr(0, stoppedDaysHoursValueString.indexOf(','));
                let stoppedDaysValue = stoppedDaysValueString.replace(" дн.","");
                stoppedDays.focus();
                stoppedDays.value = stoppedDaysValue;

                let stoppedHoursValueStringWithSymbol = stoppedDaysHoursValueString.substr(stoppedDaysHoursValueString.indexOf(','), stoppedDaysHoursValueString.length);
                let stoppedHoursValueString = stoppedHoursValueStringWithSymbol.replace(", ", "");
                let stoppedHoursValue = stoppedHoursValueString.replace("ч.","");
                stoppedHours.value = stoppedHoursValue;
            } else if (stoppedDaysHoursValueString.localeCompare("-") == 0){
                stoppedDays.focus();
                stoppedDays.value = 0;
                stoppedHours.focus();
                stoppedHours.value = 0;
            } else if (stoppedDaysHoursValueString.indexOf('ч') > -1) {
                let stoppedHoursValue = stoppedDaysHoursValueString.replace("ч.","");
                stoppedDays.focus();
                stoppedDays.value = 0;
                stoppedHours.focus();
                stoppedHours.value = stoppedHoursValue;
            } else {
                let stoppedDaysValue = stoppedDaysHoursValueString.replace(" дн.","");
                stoppedDays.focus();
                stoppedDays.value = stoppedDaysValue;
                stoppedHours.focus();
                stoppedHours.value = 0;
            }
            serverName.focus();
        }

        Modules.Events.addListener(virtuozzoServersTable, "contextmenu", function (e) {
            selectedRow = e.target.parentNode.rowIndex - 1;
            menu.popup(e); // e || {left: 'Number', top: 'Number', direction: '', width: 'Number'}

            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
            e.cancelBubble = true;
        }, true);


        function deleteTableItem(i) {
            let sumString = virtuozzoServersTable.rows[i].cells[13].innerHTML;
            let sum = parseFloat(sumString.replace(" руб.", ""));
            Modules.Events.Messages.send("removeCost", sum);

            virtuozzoServersTable.deleteRow(i);

            if (virtuozzoServersTable.rows.length == 0) {
                hideVirtuozzoResultsTable();
            }
        }

        function cloneTableItem(i) {
            let sumString = virtuozzoServersTable.rows[i].cells[13].innerHTML;
            let sum = parseFloat(sumString.replace(" руб.", ""));
            Modules.Events.Messages.send("addCost", sum);

            let rowClone = virtuozzoServersTable.rows[i];
            virtuozzoServersTable.innerHTML += rowClone.innerHTML;
        }
//End Of Context Menu

        let sum = 0;
        let costOfServersList = [];
        let exportDoc = "";
        let exportResult = "";
        serverName.focus();

        function addToList() {
            showVirtuozzoResultsTable();

            let regionValue = region.selectedIndex;
            console.log("region:" + region.value);
            let serverNameValue = validateServerName(serverName.value);
            console.log("validated_serverName:" + serverNameValue);
            let coresValue = validateCPULimits(isNumberInputCorrect(cores.value));
            console.log("validated_coresValue:" + coresValue);
            let frequencyValue = validateFrequencyLimits(isNumberInputCorrect(frequency.value));
            console.log("validated_frequency:" + frequencyValue);
            let diskValue = validateDiskLimits(isNumberInputCorrect(disk.value));
            console.log("validated_diskCapacity:" + diskValue);
            let backupCountValue = validatebackupCount(isNumberInputCorrect(backupCount.value));
            console.log("validated_backupCountValue:" + backupCountValue);
            // let backupSpaceValue = validatebackupSpace(isNumberInputCorrect(backupSpace.value), parseFloat(diskValue), parseFloat(backupCountValue));
            // console.log("validated_backupSpaceValue:" + backupSpaceValue);
            let ramValue = validateRamLimits(isNumberInputCorrect(ram.value));
            console.log("validated_RamCapacity:" + ramValue);
            let ipv4Value = validateipv4Limits(isNumberInputCorrect(ipv4.value));
            console.log("validated_ipv4Limits:" + ipv4Value);
            let trafficOutValue = validateTrafficOutLimits(isNumberInputCorrect(trafficOut.value));
            console.log("validated_TrafficLimits:" + trafficOutValue);
            //windows must be only vm
            if (osType.value.localeCompare(priceLimits.osType[1]) === 0) {
                vtType.selectedIndex = 1;
            }
            let vtTypeIndex = vtType.selectedIndex;
            console.log("vtType:" + vtType.value);
            let osTypeIndex = osType.selectedIndex;
            console.log("osType:" + osType.value);

            let runningDaysValue = validateRunningDays(isNumberInputCorrect(runningDays.value));
            console.log("validated_runningDays:" + runningDaysValue);

            let runningHoursValue = validateRunningHours(isNumberInputCorrect(runningHours.value));
            console.log("validated_runningHours:" + runningHoursValue);

            let stoppedDaysValue = validateStoppedDays(isNumberInputCorrect(stoppedDays.value));
            console.log("validated_stoppedDays:" + stoppedDaysValue);

            let stoppedHoursValue = validateStoppedHours(isNumberInputCorrect(stoppedHours.value));
            console.log("validated_stoppedHours:" + stoppedHoursValue);

            if (runningDaysValue | runningHoursValue | stoppedDaysValue | stoppedHoursValue != 0) {
                let virtuozzoServer = new Virtuozzo.Server(
                    regionValue,
                    serverNameValue,
                    coresValue,
                    frequencyValue,
                    ramValue,
                    diskValue,
                    backupCountValue,
                    diskValue,
                    ipv4Value,
                    priceConfiguration.isMonthIPPayments,
                    trafficOutValue,
                    vtTypeIndex,
                    osTypeIndex,
                    runningDaysValue,
                    runningHoursValue,
                    stoppedDaysValue,
                    stoppedHoursValue);

                virtuozzoCalculator.addServer(virtuozzoServer);
                let costOfServer = virtuozzoCalculator.getCostOfServer(virtuozzoServer);
                costOfServersList.push(parseFloat(costOfServer));
                sum += parseFloat(costOfServer);
                Modules.Events.Messages.send("addCost", costOfServer);

                let row = virtuozzoServersTable.insertRow(virtuozzoServersTable.rows.length);
                let cellServerName = row.insertCell(0);
                cellServerName.appendChild(document.createTextNode(serverNameValue));

                let cellRegion = row.insertCell(1);
                cellRegion.appendChild(document.createTextNode(currentPrice.region));

                let cellCores = row.insertCell(2);
                cellCores.appendChild(document.createTextNode(coresValue));

                let cellFrequency = row.insertCell(3);
                cellFrequency.appendChild(document.createTextNode(frequencyValue + " ГГц."));

                let cellRam = row.insertCell(4);
                cellRam.appendChild(document.createTextNode(ramValue + " ГБ."));

                let cellDisk = row.insertCell(5);
                cellDisk.appendChild(document.createTextNode(diskValue + " ГБ."));

                let cellBackups = row.insertCell(6);
                cellBackups.appendChild(document.createTextNode(backupCountValue * diskValue + " ГБ."));

                let cellIPv4 = row.insertCell(7);
                cellIPv4.appendChild(document.createTextNode(ipv4Value));

                let cellTrafficOut = row.insertCell(8);
                if (priceConfiguration.isTrafficUnlim == true) {
                    cellTrafficOut.appendChild(document.createTextNode("∞ до 1Gbps"));
                } else {
                    cellTrafficOut.appendChild(document.createTextNode(trafficOutValue + " ГБ. до 1Gbps"));
                }

                let cellVtType = row.insertCell(9);
                cellVtType.appendChild(document.createTextNode(priceLimits.vtType[vtTypeIndex]));

                let cellOSType = row.insertCell(10);
                cellOSType.appendChild(document.createTextNode(priceLimits.osType[osTypeIndex]));

                let cellRunning = row.insertCell(11);
                if ((parseFloat(runningDaysValue) != 0) && (parseFloat(runningHoursValue) != 0)) {
                    cellRunning.appendChild(document.createTextNode(runningDaysValue + " дн., " + runningHoursValue + "ч."));
                } else if ((parseFloat(runningDaysValue) == 0) && (parseFloat(runningHoursValue) != 0)) {
                    cellRunning.appendChild(document.createTextNode(runningHoursValue + " ч."));
                } else if ((parseFloat(runningDaysValue) != 0) && (parseFloat(runningHoursValue) == 0)) {
                    cellRunning.appendChild(document.createTextNode(runningDaysValue + " дн."));
                } else if ((parseFloat(runningDaysValue) == 0) && (parseFloat(runningHoursValue) == 0)) {
                    cellRunning.appendChild(document.createTextNode("-"));
                }

                let cellStopped = row.insertCell(12);
                if ((parseFloat(stoppedDaysValue) != 0) && (parseFloat(stoppedHoursValue) != 0)) {
                    cellStopped.appendChild(document.createTextNode(stoppedDaysValue + " дн., " + stoppedHoursValue + "ч."));
                } else if ((parseFloat(stoppedDaysValue) == 0) && (parseFloat(stoppedHoursValue) != 0)) {
                    cellStopped.appendChild(document.createTextNode(stoppedHoursValue + " ч."));
                } else if ((parseFloat(stoppedDaysValue) != 0) && (parseFloat(stoppedHoursValue) == 0)) {
                    cellStopped.appendChild(document.createTextNode(stoppedDaysValue + " дн."));
                } else if ((parseFloat(stoppedDaysValue) == 0) && (parseFloat(stoppedHoursValue) == 0)) {
                    cellStopped.appendChild(document.createTextNode("-"));
                }

                let cellServerCost = row.insertCell(13);
                cellServerCost.appendChild(document.createTextNode(costOfServer + " руб."));
            } else clearItems();


            serverName.focus();
        }

        function showVirtuozzoResultsTable() {
            virtuozzoServersTableOwn.parentNode.className = virtuozzoServersTableOwn.parentNode.className.replace("collapse", "");
        }

        function hideVirtuozzoResultsTable() {
            virtuozzoServersTableOwn.parentNode.className += " collapse";

        }

        function hideResultsTables() {
            for (let i = 0; i < resultsTables.length; i++) {
                if (resultsTables[i].parentNode.className.indexOf("collapse") == -1) {
                    resultsTables[i].parentNode.className += " collapse";
                }
            }
        }

        function removeItemsFromClearableTables() {
            for (let i = 0; i < clearableTables.length; i++) {
                while(clearableTables[i].getElementsByTagName('tbody')[0].rows[0]) clearableTables[i].getElementsByTagName('tbody')[0].deleteRow(0);
            }
        }


        function clearItems() {
            serverName.focus();
            serverName.value = "";
            region.focus();
            region.selectedIndex = 0;
            cores.focus();
            cores.value = "";
            frequency.focus();
            frequency.value = "";
            disk.focus();
            disk.value = "";
            backupCount.focus();
            backupCount.value = "";
            // backupSpace.focus();
            // backupSpace.value = "";
            ram.focus();
            ram.value = "";
            ipv4.focus();
            ipv4.value = "";
            vtType.focus();
            vtType.selectedIndex = 0;
            osType.focus();
            osType.selectedIndex = 0;

            trafficOut.focus();
            trafficOut.value = "";
            runningDays.focus();
            runningDays.value = "";
            runningHours.focus();
            runningHours.value = "";
            stoppedDays.focus();
            stoppedDays.value = "";
            stoppedHours.focus();
            stoppedHours.value = "";
            serverName.focus();
        }
        function clearList() {
            removeItemsFromClearableTables();
            sum = 0;
            costOfServersList = [];
            hideResultsTables();
            Modules.Events.Messages.send("resetCost");

        }
        function clearLast() {
            let sumLastString = virtuozzoServersTable.rows[virtuozzoServersTable.rows.length - 1].cells[13].innerHTML;
            let sumLast = parseFloat(sumLastString.replace(" руб.", ""));
            Modules.Events.Messages.send("removeCost", sumLast);

            virtuozzoServersTable.deleteRow(virtuozzoServersTable.rows.length -1);
            sum = sum - costOfServersList[costOfServersList.length - 1];
            costOfServersList.pop();

        }


        function generateExportLink(content) {
            downloadSpace.innerHTML = "";
            let exportLink = downloadSpace.appendChild(document.createElement("a"));
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
                serverName.focus();
                serverName.value = priceDefaults.serverName;
                return priceDefaults.serverName;
            } else {
                return serverNameValue;
            }
        }

        function isEmptyOrSpaces(str){
            return str === null || str.match(/^ *$/) !== null;
        }

        function validateCPULimits(coresValue) {
            if (isEmptyOrSpaces(coresValue)) {
                cores.focus();
                cores.value = minCPUCores;
                return minCPUCores;
            }

            if (coresValue < minCPUCores) {
                cores.focus();
                cores.value = minCPUCores;
                return minCPUCores;
            } else if (coresValue > maxCPUCores) {
                cores.focus();
                cores.value = maxCPUCores;
                return maxCPUCores;
            }
            return coresValue;
        }

        function validateFrequencyLimits(frequencyValue) {
            if (isEmptyOrSpaces(frequencyValue)) {
                frequency.focus();
                frequency.value = minFrequency;
                return minFrequency;
            }
            if (frequencyValue < minFrequency) {
                frequency.focus();
                frequency.value = minFrequency;
                return minFrequency;
            } else if (frequencyValue > maxFrequency) {
                frequency.focus();
                frequency.value = maxFrequency;
                return maxFrequency;
            }
            return frequencyValue;
        }

        function validateDiskLimits (diskCapacity) {
            if (isEmptyOrSpaces(diskCapacity)) {
                disk.focus();
                disk.value = minDiskCapacity;
                return minDiskCapacity;
            }
            if (diskCapacity < minDiskCapacity) {
                disk.focus();
                disk.value = minDiskCapacity;
                return minDiskCapacity;
            } else if (diskCapacity > maxDiskCapacity) {
                disk.focus();
                disk.value = maxDiskCapacity;
                return maxDiskCapacity;
            }
            return diskCapacity;
        }

        function validatebackupCount(backupCountValue) {
            if (isEmptyOrSpaces(backupCountValue)) {
                backupCount.focus();
                backupCount.value = 0;
                return 0;
            }

            if (backupCountValue < 0) {
                backupCount.focus();
                backupCount.value = 0;
                return 0;
            } else return backupCountValue;
        }

        function validatebackupSpace(backupSpaceValue, diskCapacity, backupCountValue) {
            if (isEmptyOrSpaces(backupSpaceValue) || (backupCountValue == 0)) {
                backupSpace.focus();
                backupSpace.value = 0;
                return 0;
            }

            if (backupSpaceValue < 0) {
                backupSpace.focus();
                backupSpace.value = 0;
                return 0;
            } else if (backupSpaceValue > diskCapacity) {
                backupSpace.focus();
                backupSpace.value = diskCapacity;
                return diskCapacity;
            } else return backupSpaceValue;
        }

        function validateRamLimits (ramCapacity) {
            if (isEmptyOrSpaces(ramCapacity)) {
                ram.focus();
                ram.value = minRamCapacity;
                return minRamCapacity;
            }
            if (ramCapacity < minRamCapacity) {
                ram.focus();
                ram.value = minRamCapacity;
                return minRamCapacity;
            } else if (ramCapacity > maxRamCapacity) {
                ram.focus();
                ram.value = maxRamCapacity;
                return maxRamCapacity;
            }
            return ramCapacity;
        }
        function validateipv4Limits (ipv4Count) {
            if (isEmptyOrSpaces(ipv4Count)) {
                ipv4.focus();
                ipv4.value = 1;
                return 1; //Recommended minimum 1 ipv4 adress for internet access.
            }
            if (ipv4Count < minIPv4) {
                ipv4.focus();
                ipv4.value = minIPv4;
                return minIPv4;
            } else if (ipv4Count > maxIPv4) {
                ipv4.focus();
                ipv4.value = maxIPv4;
                return maxIPv4;
            }
            return ipv4Count;
        }
        function validateTrafficOutLimits (trafficOutValue) {
            if (isEmptyOrSpaces(trafficOutValue)) {
                trafficOut.focus();
                trafficOut.value = trafficFreeLim;
                return trafficFreeLim;
            } else if (trafficOutValue < trafficFreeLim ) {
                trafficOut.focus();
                trafficOut.value = trafficFreeLim ;
                return trafficFreeLim;
            }

            return trafficOutValue;
        }

        function validateRunningDays(runningDaysValue) {
            if (isEmptyOrSpaces(runningDaysValue) == true) {
                runningDays.focus();
                runningDays.value = 31;
                return 31;
            } else if (runningDaysValue < 0) {
                runningDays.focus();
                runningDays.value = 0;
                return 0;
            } else
                return runningDaysValue;
        }

        function validateRunningHours(runningHoursValue) {
            if (isEmptyOrSpaces(runningHoursValue) == true) {
                runningHours.focus();
                runningHours.value = 0;
                return 0;
            } else if (runningHoursValue < 0) {
                runningHours.focus();
                runningHours.value = 0;
                return 0;
            } else
                return runningHoursValue;
        }

        function validateStoppedDays(stoppedDaysValue) {
            if (isEmptyOrSpaces(stoppedDaysValue) == true) {
                stoppedDays.focus();
                stoppedDays.value = 0;
                return 0;
            } else if (stoppedDaysValue < 0) {
                stoppedDays.focus();
                stoppedDays.value = 0;
                return 0;
            } else
                return stoppedDaysValue;
        }

        function validateStoppedHours(stoppedHoursValue) {
            if (isEmptyOrSpaces(stoppedHoursValue) == true) {
                stoppedHours.focus();
                stoppedHours.value = 0;
                return 0;
            } else if (stoppedHoursValue < 0) {
                stoppedHours.focus();
                stoppedHours.value = 0;
                return stoppedHours.value;
            } else
                return stoppedHoursValue;
        }

    }

    addButtonsEventListeners(addToList, clearItems, clearList) {
        let addButton = document.getElementsByClassName("virtuozzo_addButton")[0];
        let clearItemsButton = document.getElementsByClassName("virtuozzo_clearItemsButton")[0];
        let clearListButton = document.getElementsByClassName("virtuozzo_clearListButton")[0];

        Modules.Events.addListener(addButton, "click", addToList);
        Modules.Events.addListener(clearItemsButton, "click", clearItems);
        Modules.Events.addListener(clearListButton, "click", clearList);
    }

};

VIRTUOZZO.Model = class {
    get price() {
        return this._price;
    }
    constructor(viewInstance) {
        this._viewInstance = viewInstance;
        this._price = new PriceES2015.Virtuozzo();
    }

};

VIRTUOZZO.View = class  {
    constructor() {

    }
};

VIRTUOZZO.viewInstance = new VIRTUOZZO.View();
VIRTUOZZO.modelInstance = new VIRTUOZZO.Model(VIRTUOZZO.viewInstance);
VIRTUOZZO.controllerInstance = new VIRTUOZZO.Controller(VIRTUOZZO.modelInstance);

