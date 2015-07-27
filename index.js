Modules.Events.addStartupListener(run);
function run() {
    var winHour = 0.34;
    var cpuContainerGhzHour = 0.375;
    var cpuVMGhzHour = 0.75;
    var ramGbHour = 0.55;
    var diskGbHour = 0.0125;
    var balancerHour = 0.25;
    var diskBackupHour = 0.0038;
    var diskImagesHour = 0.0038;
    var trafficFreeLim = 3000; //gb
    var trafficIn = 0;
    var trafficOutGb = 0.50;
    var ipMonth = 90;
    var days = 30;
    var hours = 24;
    var minPaymentForActivation = 500;

    //limits
    var minCPUCores = 1;
    var maxCPUCores = 24;
    var minFrequency = 1;
    var maxFrequency = 2.3;
    var minDiskCapacity = 10;
    var maxDiskCapacity = 2000;
    var minRamCapacity = 0.5;
    var maxRamCapacity = 64;
    var minIP = 0;
    var maxIP = 10;
    var minTrafficOut = 0;

    var addButton = document.getElementsByClassName("addButton")[0];
    var clearItemsButton = document.getElementsByClassName("clearItemsButton")[0];
    var clearListButton = document.getElementsByClassName("clearListButton")[0];
    var listSpace = document.getElementsByClassName("listSpace")[0];
    var resultSpace = document.getElementsByClassName("resultSpace")[0];
    var downloadSpace = document.getElementsByClassName("downloadSpace")[0];

    Modules.Events.addListener(addButton, "click", addToList);
    Modules.Events.addListener(clearItemsButton, "click", clearItems);
    Modules.Events.addListener(clearListButton, "click", clearList);

    var serverName = document.getElementsByClassName("serverName")[0];
    var cores = document.getElementsByClassName("cores")[0];
    var frequency = document.getElementsByClassName("frequency")[0];
    var disk = document.getElementsByClassName("disk")[0];
    var ram = document.getElementsByClassName("ram")[0];
    var ip = document.getElementsByClassName("ip")[0];
    var trafficOut = document.getElementsByClassName("trafficOut")[0];
    var vtType = document.getElementsByClassName("vtType")[0];
    var osType = document.getElementsByClassName("osType")[0];

    var sum = 0;
    var exportDoc = "";
    var exportResult = "";
    serverName.focus();



    function addToList() {
        var serverNameValue = validateServerName(serverName.value);
        console.log("validated_serverName:" + serverNameValue);
        var coresValue = validateCPULimits(isNumberInputCorrect(cores.value));
        console.log("validated_coresValue:" + coresValue);
        var frequencyValue = validateFrequencyLimits(isNumberInputCorrect(frequency.value));
        console.log("validated_frequency:" + frequencyValue);
        var diskValue = validateDiskLimits(isNumberInputCorrect(disk.value));
        console.log("validated_diskCapacity:" + diskValue);
        var ramValue = validateRamLimits(isNumberInputCorrect(ram.value));
        console.log("validated_RamCapacity:" + ramValue);
        var ipValue = validateIPLimits(isNumberInputCorrect(ip.value));
        console.log("validated_IPLimits:" + ipValue);
        var trafficOutValue = validateTrafficOutLimits(isNumberInputCorrect(trafficOut.value));
        console.log("validated_TrafficLimits:" + trafficOutValue);
        //windows must be only vm
        if (osType.selectedIndex == 1) {
            vtType.selectedIndex = 1;
        }
        var vtTypeIndex = vtType.selectedIndex;
        var osTypeIndex = osType.selectedIndex;


        var costOfServer = calculate(coresValue, frequencyValue, ramValue, diskValue, ipValue, trafficOutValue, vtTypeIndex, osTypeIndex);
        if (costOfServer != 0) {
            listSpace.innerHTML+= "Сервер: " + "<strong>" + serverNameValue.toString() + "</strong>"+ "; </br>"
                + "Ядра: " + "<strong>" + coresValue.toString() + "</strong>"+ "; </br>"
                + "Частота: " + "<strong>" + frequencyValue.toString() + " ГГц</strong>"+ "; </br>"
                + "Память: " + "<strong>" + ramValue.toString() + " Гб</strong>"+ "; </br>"
                + "Диск: " + "<strong>" + diskValue.toString() + " Гб</strong>"+ "; </br>"
                + "Публичные IP-адреса: " + "<strong>" + ipValue.toString() + "</strong>"+ "; </br>"
                + "Исходящий трафик: " + "<strong>" + trafficOutValue.toString() + " Гб</strong>"+ "; </br>"
                + "Тип виртуализации: " + "<strong>" + vtType.value + " </strong>"+ "; </br>"
                + "Операционная система: " + "<strong>" + osType.value + " </strong>"+ "; </br>"
                + "Стоимость: " + "<strong>" + costOfServer.toFixed(2).toString() + "</strong>"+ "; "
                + "</br></br>";
            exportDoc += "Сервер: " + serverNameValue.toString() + "; "
                + "Ядра: " + coresValue.toString() + "; "
                + "Частота: " + frequencyValue.toString() + "; "
                + "Память: " + ramValue.toString() + "; "
                + "Диск: " + diskValue.toString() + "; "
                + "Публичные IP-адреса: " + ipValue.toString() + "; "
                + "Исходящий трафик: " + trafficOutValue.toString() + "; "
                + "Тип виртуализации: " + vtType.value + "; "
                + "Операционная система: " + osType.value + "; "
                + "Стоимость: " + costOfServer.toFixed(2).toString() + "; "
                + "\r\n";
            sum += costOfServer;
            updateResult();
            generateExportLink(exportDoc + exportResult);
        }
        serverName.focus();
    }
    function clearItems() {
        serverName.value = "";
        cores.value = "";
        frequency.value = "";
        disk.value = "";
        ram.value = "";
        ip.value = "";
        trafficOut.value = "";
    }
    function clearList() {
        listSpace.innerHTML = "";
        downloadSpace.innerHTML = "";
        sum = 0;
        updateResult();
    }

    function calculate(cores, frequency, ram, disk, ip, trafficOut, vtTypeIndex, osTypeIndex) {
        var cpuCost = undefined;
        if (vtTypeIndex == 0) {
            cpuCost = cores*frequency*cpuContainerGhzHour*hours*days; //container
            console.log("cpu:" + cpuCost);
            console.log("vtType:" + "container");
        } else if (vtTypeIndex == 1) {
            cpuCost = cores*frequency*cpuVMGhzHour*hours*days; //vm
            console.log("cpu:" + cpuCost);
            console.log("vtType:" + "vm");
        }
        var ramCost = ram*ramGbHour*hours*days;
        console.log("ram:" + ramCost);
        var diskCost = disk*diskGbHour*hours*days;
        console.log("disk:" + diskCost);
        var ipCost = ip*ipMonth;
        console.log("ip:" + ipCost);
        var trafficCost = undefined;
        if (trafficOut > trafficFreeLim) {
            trafficCost = (trafficOut - trafficFreeLim)*trafficOutGb;
            console.log("traffic:" + trafficCost);
        } else if (trafficOut <= trafficFreeLim) {
            trafficCost = 0;
            console.log("traffic:" + "free");
        }
        var osCost = 0;
        if (osTypeIndex == 1) {
            osCost = winHour*hours*days;
            console.log("osType:" + "windows");
            console.log("os:" + osCost);
        }
        var result = cpuCost + ramCost + diskCost + ipCost + trafficCost + osCost;
        console.log(result);
        return result;
    }

    function updateResult() {
        resultSpace.innerHTML = "<strong>" + "Примерная стоимость облачной инфраструктуры: " + sum.toFixed(2).toString() + " руб. в месяц (30 дней)"+ "</strong>";
        exportResult = "Примерная стоимость облачной инфраструктуры: " + sum.toFixed(2).toString() + " руб. в месяц" + "\r\n";
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
    function validateIPLimits (ipCount) {
        if (isEmptyOrSpaces(ipCount)) {
            ip.value = 1;
            return 1; //Recommended minimum 1 ip adress for internet access.
        }
        if (ipCount < minIP) {
            ip.value = minIP;
            return minIP;
        } else if (ipCount > maxIP) {
            ip.value = maxIP;
            return maxIP;
        }
        return ipCount;
    }
    function validateTrafficOutLimits (trafficOutValue) {
        if (isEmptyOrSpaces(trafficOutValue)) {
            trafficOut.value = trafficFreeLim;
            return trafficFreeLim;
        }
        if (trafficOutValue < minTrafficOut) {
            trafficOut.value = trafficFreeLim;
            return trafficFreeLim;
        }
        return trafficOutValue;
    }
}