"use strict";
(function() {

    var price = new PriceES2015.AzurePack();
    var azurepackCalculator = new AzurePack.Calculator(price);

    var addButton = document.getElementsByClassName("azurepack_addButton")[0];
    var clearItemsButton = document.getElementsByClassName("azurepack_clearItemsButton")[0];
    var clearListButton = document.getElementsByClassName("azurepack_clearListButton")[0];
    var resultSpace = document.getElementsByClassName("resultSpace")[0];
    var downloadSpace = document.getElementsByClassName("downloadSpace")[0];
    var updateResourcesButton = document.getElementsByClassName("azurepack_updateResourcesButton")[0];

    Modules.Events.addListener(addButton, "click", addToList);
    Modules.Events.addListener(clearItemsButton, "click", clearItems);
    Modules.Events.addListener(clearListButton, "click", clearList);
    Modules.Events.addListener(updateResourcesButton, "click", updateResources);

    var region = document.getElementsByClassName("azurepack_region")[0];
    var serverName = document.getElementsByClassName("azurepack_serverName")[0];
    var cores = document.getElementsByClassName("azurepack_cores")[0];
    var disk = document.getElementsByClassName("azurepack_disk")[0];
    var snapshots = document.getElementsByClassName("azurepack_snapshotCount")[0];
    var ram = document.getElementsByClassName("azurepack_ram")[0];
    var ipv4 = document.getElementsByClassName("azurepack_ipv4")[0];
    var vLANs = document.getElementsByClassName("azurepack_vLANs")[0];
    var VPNs = document.getElementsByClassName("azurepack_VPNs")[0];
    var discounts = document.getElementsByClassName("azurepack_discounts")[0];
    var azurepackServersTable = document.getElementsByClassName("azurepackServersTable")[0].getElementsByTagName('tbody')[0];
    var azurepackServersTableOwn = document.getElementsByClassName("azurepackServersTable")[0];
    var resultsTables = document.getElementsByClassName("resultsTable");
    var clearableTables = document.getElementsByClassName("clearableTable");
    var azurepackInfrastructureTable = document.getElementsByClassName("azurepackInfrastructureTable")[0].getElementsByTagName('tbody')[0];
    var azurepackInfrastructureTableOwn = document.getElementsByClassName("azurepackInfrastructureTable")[0];


    var selectedRow = null;
    var menu = new ax5.ui.menu({
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

    function fillInputForm(i) {
        serverName.focus();
        serverName.value = azurepackServersTable.rows[i].cells[0].innerHTML;

        cores.focus();
        cores.value = azurepackServersTable.rows[i].cells[2].innerHTML;

        ram.focus();
        var ramValueString = azurepackServersTable.rows[i].cells[3].innerHTML;
        ram.value = parseFloat(ramValueString.replace(" ГБ.", ""));

        disk.focus();
        var diskValueString = azurepackServersTable.rows[i].cells[4].innerHTML;
        var diskValue = parseFloat(diskValueString.replace(" ГБ.", ""))
        disk.value = diskValue;

        snapshots.focus();
        var snapshotsValueString = azurepackServersTable.rows[i].cells[5].innerHTML;
        var snapshotsGbValue = parseFloat(snapshotsValueString.replace(" ГБ.", ""));
        var snapshotsValue = snapshotsGbValue / diskValue;
        snapshots.value = snapshotsValue;

        ipv4.focus();
        ipv4.value = azurepackServersTable.rows[i].cells[6].innerHTML;

        serverName.focus();

    }

    Modules.Events.addListener(azurepackServersTable, "contextmenu", function (e) {
        selectedRow = e.target.parentNode.rowIndex - 1;
        menu.popup(e); // e || {left: 'Number', top: 'Number', direction: '', width: 'Number'}

        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
        e.cancelBubble = true;
    });

    function deleteTableItem(i) {
        

        var sumString = azurepackServersTable.rows[i].cells[7].innerHTML;
        var sum = parseFloat(sumString.replace(" руб.", ""));
        Modules.Events.Messages.send("removeCost", sum);

        azurepackServersTable.deleteRow(i);

        var nonOptimalUtilizationRam = checkNonOptimalUtilizationRam();
        var costOfNonOptimalUtilizationRam = azurepackCalculator.getCostOfRam(1, nonOptimalUtilizationRam);

        var oldCostOfNonOptimalUtilizationRamString = azurepackInfrastructureTable.rows[2].cells[2].innerHTML;
        var oldCostOfNonOptimalUtilizationRam = parseFloat(oldCostOfNonOptimalUtilizationRamString.replace(" руб.", ""));

        var diffCostOfNonOptimalUtilizationRam = costOfNonOptimalUtilizationRam - oldCostOfNonOptimalUtilizationRam;

        azurepackInfrastructureTable.rows[2].cells[1].innerHTML = nonOptimalUtilizationRam + " Гб.";
        azurepackInfrastructureTable.rows[2].cells[2].innerHTML = costOfNonOptimalUtilizationRam + " руб.";

        Modules.Events.Messages.send("addCost", diffCostOfNonOptimalUtilizationRam);

        if (azurepackServersTable.rows.length == 0) {
            hideAzurePackResultsTable();
        }
    }

    function cloneTableItem(i) {
        var sumString = azurepackServersTable.rows[i].cells[7].innerHTML;
        var sum = parseFloat(sumString.replace(" руб.", ""));
        Modules.Events.Messages.send("addCost", sum);

        var rowClone = azurepackServersTable.rows[i];
        azurepackServersTable.innerHTML += rowClone.innerHTML;
    }

    var sum = 0;
    var costOfServersList = [];
    var exportDoc = "";
    var exportResult = "";
    serverName.focus();

    //limits
    var minCPUCores = 1;
    var maxCPUCores = 48;
    var minDiskCapacity = 25;
    var maxDiskCapacity = 65536;
    var minRamCapacity = 2;
    var maxRamCapacity = 256;
    var minipv4 = 0;
    var maxipv4 = 10;
    var vLANsDefault = 2;
    var minvLANs = 2;
    var maxvLANs = 9999;
    var VPNsDefault = 2;
    var minVPNs = 2;
    var maxVPNs = 9999;



    function addToList() {
        showAzurePackResultsTable();

        var regionValue = 1;
        console.log("azurepack_region:" + regionValue);
        var serverNameValue = validateServerName(serverName.value);
        console.log("azurepack_validated_serverName:" + serverNameValue);
        var coresValue = validateCPULimits(isNumberInputCorrect(cores.value));
        console.log("azurepack_validated_coresValue:" + coresValue);
        var ramValue = validateRamLimits(isNumberInputCorrect(ram.value));
        console.log("azurepack_validated_RamCapacity:" + ramValue);
        var diskValue = validateDiskLimits(isNumberInputCorrect(disk.value));
        console.log("azurepack_validated_diskCapacity:" + diskValue);
        var snapshotsValue = validateSnapshotsLimits(isNumberInputCorrect(snapshots.value));
        console.log("azurepack_validated_snapshotsCapacity:" + snapshotsValue);
        var ipv4Value = validateipv4Limits(isNumberInputCorrect(ipv4.value));
        console.log("azurepack_validated_ipv4Limits:" + ipv4Value);

        // var discountValue = discounts.selectedIndex;
        // console.log("region:" + discounts.value);

        var azurepackServer = new AzurePack.Server(
            regionValue,
            serverNameValue,
            coresValue,
            ramValue,
            diskValue,
            snapshotsValue,
            ipv4Value
        );


        var costOfServer = azurepackCalculator.getCostOfServer(azurepackServer);

        costOfServersList.push(parseFloat(costOfServer));
        sum += parseFloat(costOfServer);
        Modules.Events.Messages.send("addCost", costOfServer);


        var row = azurepackServersTable.insertRow(azurepackServersTable.rows.length);
        var cellServerName = row.insertCell(0);
        cellServerName.appendChild(document.createTextNode(serverNameValue));

         var cellRegion = row.insertCell(1);
         if (regionValue == 0) {
             cellRegion.appendChild(document.createTextNode("Россия, Санкт-Петербург (SSD)"));
         } else if (regionValue == 1) {
             cellRegion.appendChild(document.createTextNode("Россия, Санкт-Петербург (SSD + NLSAS СХД)"));
         } else if (regionValue == 2) {
             cellRegion.appendChild(document.createTextNode("Европа, Амстердам (SSD)"));
         }

         var cellCores = row.insertCell(2);
         cellCores.appendChild(document.createTextNode(coresValue));


         var cellRam = row.insertCell(3);
         cellRam.appendChild(document.createTextNode(ramValue + " ГБ."));

         var cellDisk = row.insertCell(4);
         cellDisk.appendChild(document.createTextNode(diskValue + " ГБ."));

         var cellSnapshots = row.insertCell(5);
        cellSnapshots.appendChild(document.createTextNode(snapshotsValue * diskValue + " ГБ."));

         var cellIPv4 = row.insertCell(6);
         cellIPv4.appendChild(document.createTextNode(ipv4Value));

         var cellServerCost = row.insertCell(7);
         cellServerCost.appendChild(document.createTextNode(costOfServer + " руб."));

        updateAzurePackInfrastructureTable();

        serverName.focus();
    }

    function updateAzurePackInfrastructureTable() {
        var regionValue = 1;
        console.log("azurepack_region:" + regionValue);
        var vLANsValue = validatevLANsLimits(isNumberInputCorrect(vLANs.value));
        console.log("azurepack_validated_vLANsLimits:" + vLANsValue);
        var VPNsValue = validateVPNsLimits(isNumberInputCorrect(VPNs.value));
        console.log("azurepack_validated_vLANsLimits:" + VPNsValue);

        var azurepackAdditionalResources = new AzurePack.AdditionalSubscriptionResources(
            regionValue,
            vLANsValue,
            VPNsValue
        );

        var costOfvLANs = azurepackCalculator.getCostOfvLANs(azurepackAdditionalResources);
        var costOfVPNs = azurepackCalculator.getCostOfVPNs(azurepackAdditionalResources);

        var nonOptimalUtilizationRam = checkNonOptimalUtilizationRam();
        var costOfNonOptimalUtilizationRam = azurepackCalculator.getCostOfRam(1, nonOptimalUtilizationRam);

        if ((azurepackInfrastructureTable.rows.length == 0) && (azurepackServersTable.rows.length != 0)) {
            var VLANRow = azurepackInfrastructureTable.insertRow(azurepackInfrastructureTable.rows.length);
            var resourceVLANName = VLANRow.insertCell(0);
            resourceVLANName.appendChild(document.createTextNode("Виртуальные сети (vLAN)"));

            var countVLAN = VLANRow.insertCell(1);
            countVLAN.appendChild(document.createTextNode(vLANsValue));

            var costVLAN = VLANRow.insertCell(2);
            costVLAN.appendChild(document.createTextNode(costOfvLANs + " руб."));

            var VPNRow = azurepackInfrastructureTable.insertRow(azurepackInfrastructureTable.rows.length);
            var resourceVPNName = VPNRow.insertCell(0);
            resourceVPNName.appendChild(document.createTextNode("Site-To-Site VPN /IPSec IKEv2/"));

            var countVPN = VPNRow.insertCell(1);
            countVPN.appendChild(document.createTextNode(VPNsValue));

            var costVPN = VPNRow.insertCell(2);
            costVPN.appendChild(document.createTextNode(costOfVPNs + " руб."));

            var nonOptimalMemoryRow = azurepackInfrastructureTable.insertRow(azurepackInfrastructureTable.rows.length);
            var resourceNonOptimalRamName = nonOptimalMemoryRow.insertCell(0);
            resourceNonOptimalRamName.appendChild(document.createTextNode("Нераспределенный объем RAM (ядер vCPU не должно быть больше количества Гб. RAM в подписке)"));

            var countNonOptimalRam = nonOptimalMemoryRow.insertCell(1);
            countNonOptimalRam.appendChild(document.createTextNode(nonOptimalUtilizationRam + " Гб."))

            var costNonOptimalRam = nonOptimalMemoryRow.insertCell(2);
            costNonOptimalRam.appendChild(document.createTextNode(costOfNonOptimalUtilizationRam + " руб."))

            Modules.Events.Messages.send("addCost", costOfvLANs);
            Modules.Events.Messages.send("addCost", costOfVPNs);
            Modules.Events.Messages.send("addCost", costOfNonOptimalUtilizationRam);

        } else {
            var oldCostOfvLANsString = azurepackInfrastructureTable.rows[0].cells[2].innerHTML;
            var oldCostOfvLANs = parseFloat(oldCostOfvLANsString.replace(" руб.", ""));

            var oldCostOfVPNsString = azurepackInfrastructureTable.rows[1].cells[2].innerHTML;
            var oldCostOfVPNs = parseFloat(oldCostOfVPNsString.replace(" руб.", ""));

            var oldCostOfNonOptimalUtilizationRamString = azurepackInfrastructureTable.rows[2].cells[2].innerHTML;
            var oldCostOfNonOptimalUtilizationRam = parseFloat(oldCostOfNonOptimalUtilizationRamString.replace(" руб.", ""));

            var diffvLANsCost = costOfvLANs - oldCostOfvLANs;
            var diffVPNsCost = costOfVPNs - oldCostOfVPNs;
            var diffCostOfNonOptimalUtilizationRam = costOfNonOptimalUtilizationRam - oldCostOfNonOptimalUtilizationRam;

            azurepackInfrastructureTable.rows[0].cells[1].innerHTML = vLANsValue;
            azurepackInfrastructureTable.rows[0].cells[2].innerHTML = costOfvLANs + " руб.";
            azurepackInfrastructureTable.rows[1].cells[1].innerHTML = VPNsValue;
            azurepackInfrastructureTable.rows[1].cells[2].innerHTML = costOfVPNs + " руб.";
            azurepackInfrastructureTable.rows[2].cells[1].innerHTML = nonOptimalUtilizationRam + " Гб.";
            azurepackInfrastructureTable.rows[2].cells[2].innerHTML = costOfNonOptimalUtilizationRam + " руб.";

            Modules.Events.Messages.send("addCost", diffvLANsCost);
            Modules.Events.Messages.send("addCost", diffVPNsCost);
            Modules.Events.Messages.send("addCost", diffCostOfNonOptimalUtilizationRam);
        }
    }

    function checkNonOptimalUtilizationRam() {
        var sumCores = 0;
        var sumRamGb = 0;
        var sumRamGbString = "";
        var nonOptimalRamCount = 0;
        for (var i = 0; i < azurepackServersTable.rows.length; i++) {
            sumCores += parseFloat(azurepackServersTable.rows[i].cells[2].innerHTML);
            sumRamGbString = azurepackServersTable.rows[i].cells[3].innerHTML;
            sumRamGb += parseFloat(sumRamGbString.replace(" ГБ.", ""));
        }
        if (sumCores > sumRamGb) {
            return sumCores - sumRamGb;
        }
        return 0;
    }

    function updateResources() {
        updateAzurePackInfrastructureTable();
    }

    function showAzurePackResultsTable() {
        azurepackServersTableOwn.parentNode.className = azurepackServersTableOwn.parentNode.className.replace("collapse", "");
    }

    function hideAzurePackResultsTable() {
        azurepackServersTableOwn.parentNode.className += " collapse";

    }

    function hideResultsTables() {
        for (var i = 0; i < resultsTables.length; i++) {
            if (resultsTables[i].parentNode.className.indexOf("collapse") == -1) {
                resultsTables[i].parentNode.className += " collapse";
            }
        }
    }

    function removeItemsFromClearableTables() {
        for (var i = 0; i < clearableTables.length; i++) {
            while(clearableTables[i].getElementsByTagName('tbody')[0].rows[0]) {
                clearableTables[i].getElementsByTagName('tbody')[0].deleteRow(0);
            }
        }
    }

    function clearItems() {
        serverName.focus();
        serverName.value = "";
        cores.focus();
        cores.value = "";
        disk.focus();
        disk.value = "";
        snapshots.focus();
        snapshots.value = "";
        ram.focus();
        ram.value = "";
        ipv4.focus();
        ipv4.value = "";
        vLANs.focus();
        vLANs.value = "";
        VPNs.focus();
        VPNs.value = "";
        serverName.focus();
    }
    function clearList() {

        removeItemsFromClearableTables();
        hideResultsTables();
        Modules.Events.Messages.send("resetCost");
        serverName.focus();
    }
    function clearLast() {
        var sumLastString = azurepackServersTable.rows[azurepackServersTable.rows.length - 1].cells[7].innerHTML;
        var sumLast = parseFloat(sumLastString.replace(" руб.", ""));
        Modules.Events.Messages.send("removeCost", sumLast);

        azurepackServersTable.deleteRow(azurepackServersTable.rows.length -1);
        sum = sum - costOfServersList[costOfServersList.length - 1];
        costOfServersList.pop();
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
            serverName.focus();
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
        } else if (diskCapacity % 25 != 0) {
            disk.focus();
            var correctedDiskCapacity = parseFloat(diskCapacity) + (25 - (parseFloat(diskCapacity) % 25));
            disk.value = correctedDiskCapacity;
            return correctedDiskCapacity;
        }
        return diskCapacity;
    }

    function validateSnapshotsLimits(snapshotsCapacity) {
        if (isEmptyOrSpaces(snapshotsCapacity)) {
            snapshotsCapacity = 0;
            return snapshotsCapacity;
        }
        if (snapshotsCapacity < 0) {
            snapshotsCapacity = 0;
            return snapshotsCapacity;
        }
        return snapshotsCapacity;
    }

    function validatebackupCount(backupCountValue) {
        if (isEmptyOrSpaces(backupCountValue)) {
            snapshotCount.focus();
            snapshotCount.value = 0;
            return 0;
        }

        if (backupCountValue < 0) {
            snapshotCount.focus();
            snapshotCount.value = 0;
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
        if (ipv4Count < minipv4) {
            ipv4.focus();
            ipv4.value = minipv4;
            return minipv4;
        } else if (ipv4Count > maxipv4) {
            ipv4.focus();
            ipv4.value = maxipv4;
            return maxipv4;
        }
        return ipv4Count;
    }

    function validatevLANsLimits(vLANsCount) {
        if (isEmptyOrSpaces(vLANsCount)) {
            vLANs.focus();
            vLANs.value = vLANsDefault;
            return vLANsDefault;
        }
        if (vLANsCount < minvLANs) {
            vLANs.focus();
            vLANs.value = minvLANs;
            return minvLANs;
        } else if (vLANsCount > maxvLANs) {
            vLANs.focus();
            vLANs.value = maxvLANs;
            return maxvLANs;
        }
        else return vLANsCount;
    }

    function validateVPNsLimits(VPNsCount) {
        if (isEmptyOrSpaces(VPNsCount)) {
            VPNs.focus();
            VPNs.value = VPNsDefault;
            return VPNsDefault;
        }
        if (VPNsCount < minVPNs) {
            VPNs.focus();
            VPNs.value = minVPNs;
            return minVPNs;
        } else if (VPNsCount > maxVPNs) {
            VPNs.focus();
            VPNs.value = maxVPNs;
            return maxVPNs;
        }
        else return VPNsCount;
    }
}());