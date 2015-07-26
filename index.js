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
    var trafficFreeLim = 3072; //gb
    var trafficIn = 0;
    var trafficOutGb = 0.50;
    var ipMonth = 90;
    var days = 30;
    var hours = 24;
    var minPaymentForActivation = 500;

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
    var sum = 0;
    var exportDoc = "";
    var exportResult = "";
    serverName.focus();



    function addToList() {
        var serverNameValue = serverName.value;
        var coresValue = isNumberInputCorrect(cores.value);
        var frequencyValue = isNumberInputCorrect(frequency.value);
        var diskValue = isNumberInputCorrect(disk.value);
        var ramValue = isNumberInputCorrect(ram.value);
        var ipValue = isNumberInputCorrect(ip.value);
        var trafficOutValue = isNumberInputCorrect(trafficOut.value);

        var costOfServer = calculate(coresValue, frequencyValue, ramValue, diskValue, ipValue);
        listSpace.innerHTML+= "Сервер: " + "<strong>" + serverNameValue.toString() + "</strong>"+ "; "
            + "Ядра: " + "<strong>" + coresValue.toString() + "</strong>"+ "; "
            + "Частота: " + "<strong>" + frequencyValue.toString() + "</strong>"+ "; "
            + "Память: " + "<strong>" + ramValue.toString() + "</strong>"+ "; "
            + "Диск: " + "<strong>" + diskValue.toString() + "</strong>"+ "; "
            + "IP: " + "<strong>" + ipValue.toString() + "</strong>"+ "; "
            + "Стоимость: " + "<strong>" + costOfServer.toFixed(2).toString() + "</strong>"+ "; "
            + "</br>";
        exportDoc += "Сервер: " + serverNameValue.toString() + "; "
            + "Ядра: " + coresValue.toString() + "; "
            + "Частота: " + frequencyValue.toString() + "; "
            + "Память: " + ramValue.toString() + "; "
            + "Диск: " + diskValue.toString() + "; "
            + "IP: " + ipValue.toString() + "; "
            + "Стоимость: " + costOfServer.toFixed(2).toString() + "; "
            + "\r\n";
        sum += costOfServer;
        updateResult();
        generateExportLink(exportDoc + exportResult);
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

    function calculate(cores, frequency, ram, disk, ip) {
        var cpuCost = cores*frequency*cpuContainerGhzHour*hours*days;
        console.log("cpu:" + cpuCost);
        var ramCost = ram*ramGbHour*hours*days;
        console.log("ram:" + ramCost);
        var diskCost = disk*diskGbHour*hours*days;
        console.log("disk:" + diskCost);
        var ipCost = ip*ipMonth;
        console.log("ip:" + ipCost);
        var result = cpuCost + ramCost + diskCost + ipCost;
        console.log(result);
        return result;
    }

    function updateResult() {
        resultSpace.innerHTML = "<strong>" + "Примерная стоимость облачной инфраструктуры: " + sum.toFixed(2).toString() + " руб. в месяц"+ "</strong>";
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
}