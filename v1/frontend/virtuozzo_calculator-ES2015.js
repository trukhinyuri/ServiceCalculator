"use strict";
let Virtuozzo;
(function (Virtuozzo) {
    let Calculator = (function () {
        let _servers = [];
        let _price = null;
        function Calculator(price) {
            if (price != null) {
                _price = price;
            } else {
                console.log("Error in virtuozzo_calculator.js: please, set price");
            }
        }
        Calculator.prototype.addServer = function (server) {
            _servers.push(server);
        };

        Calculator.prototype.getServers = function () {
            return servers;
        };

        Calculator.prototype.getCostOfRunningServer = function(server) {
            let runningTotalHours = this._calculateTotalHours(server.runningDays, server.runningHours);
            console.log("runningTotalHours: " + runningTotalHours);

            let cpuRunningCost = this._calculateCPURunningCost(server.region, server.vCPUCoresCount, server.vCPUFrequencyGhz, server.vtType, server.runningDays, server.runningHours);
            console.log("cpuRunningCost: " + cpuRunningCost);

            let ramRunningCost = this._calculateRamRunningCost(server.region, server.ramGb, server.runningDays, server.runningHours);
            console.log("ramRunningCost: " + ramRunningCost);

            let diskCost = this._calculateDiskCost(server.region, server.diskGb, server.runningDays, server.runningHours);
            console.log("diskRunningCost: " + diskCost);

            let backupCost = this._calculateBackupCost(server.region, server.backupCount, server.backupSpace, server.runningDays, server.runningHours);
            console.log("backupCost: " + backupCost);

            let ipv4Cost = this._calculateIPv4Cost(server.region, server.ipv4Count, server.isMonthIPPayments, server.runningDays, server.runningHours);
            console.log("IPv4Cost: " + ipv4Cost);

            let trafficOutCost = this._calculateTrafficOutCost(server.region, server.trafficOutGb);
            console.log("trafficOutCost: " + trafficOutCost);

            let OSCost = this._calculateOSCost(server.region, server.osType, server.runningDays, server.runningHours);
            console.log("OSCost: " + OSCost);

            let costOfRunningServer = parseFloat(cpuRunningCost) + parseFloat(ramRunningCost) + parseFloat(diskCost) + parseFloat(backupCost) + parseFloat(ipv4Cost) + parseFloat(trafficOutCost) + parseFloat(OSCost);

            return costOfRunningServer.toFixed(2);
        };

        Calculator.prototype.getCostOfStoppedServer = function(server) {
            let stoppedTotalHours = this._calculateTotalHours(server.stoppedDays, server.stoppedHours);
            console.log("runningTotalHours: " + stoppedTotalHours);

            let diskCost = this._calculateDiskCost(server.region, server.diskGb, server.stoppedDays, server.stoppedHours);
            console.log("diskRunningCost: " + diskCost);

            let backupCost = this._calculateBackupCost(server.region, server.backupCount, server.backupSpace, server.stoppedDays, server.stoppedHours);
            console.log("backupCost: " + backupCost);

            // let ipv4Cost = undefined;
            // if ((server.runningDays === 0) && (server.runningHours === 0)) {
            //     ipv4Cost = this._calculateIPv4Cost(server.region, server.ipv4Count, server.isMonthIPPayments,
            //         server.stoppedDays, server.stoppedHours);
            //     console.log("IPv4StoppedCost: " + ipv4Cost);
            // } else {
            //     ipv4Cost = 0; //calculated in running server cost
            // }
            let ipv4Cost = this._calculateIPv4Cost(server.region, server.ipv4Count, server.isMonthIPPayments, server.stoppedDays, server.stoppedHours);
            console.log("ipv4CostStopped: " + ipv4Cost);

            let OSCost = this._calculateOSCost(server.region, server.osType, server.stoppedDays, server.stoppedHours);
            console.log("OSCost: " + OSCost);

            let costOfStoppedServer = parseFloat(diskCost) + parseFloat(backupCost) + parseFloat(ipv4Cost) + parseFloat(OSCost);

            return costOfStoppedServer.toFixed(2);
        };

        Calculator.prototype.getCostOfServer = function(server) {
            let costOfServer = parseFloat(this.getCostOfRunningServer(server)) + parseFloat(this.getCostOfStoppedServer(server));

            return costOfServer.toFixed(2);
        };

        Calculator.prototype._calculateTotalHours = function (days, hours) {
            let totalHours = parseFloat(days) * 24 + parseFloat(hours);
            return totalHours;
        }

        Calculator.prototype._calculateCPURunningCost = function (region, vCPUCoresCount, vCPUFrequencyGhz, vtType, runningDays, runningHours) {
            let cpuCost = null;
            let totalRunningHours = this._calculateTotalHours(runningDays, runningHours);
            //container
            if (vtType == 0) {
                cpuCost = vCPUCoresCount*vCPUFrequencyGhz*_price.currentPrice[region].cpuContainerGhzHour*totalRunningHours; //container
                console.log("cpu:" + cpuCost);
                console.log("vtType:" + "container");
                return cpuCost.toFixed(2);
            }
            //vm
            else if (vtType == 1) {
                cpuCost = vCPUCoresCount*vCPUFrequencyGhz*_price.currentPrice[region].cpuVMGhzHour*totalRunningHours; //vm
                console.log("cpu:" + cpuCost);
                console.log("vtType:" + "vm");
                return cpuCost.toFixed(2);
            }
        };

        Calculator.prototype._calculateRamRunningCost = function (region, ramCount, runningDays, runningHours) {
            let totalRunningHours = this._calculateTotalHours(runningDays, runningHours);
            let ramCost = ramCount*_price.currentPrice[region].ramGbHour*totalRunningHours;
            return ramCost.toFixed(2);
        };

        Calculator.prototype._calculateDiskCost = function (region, diskCount, days, hours) {
            let totalHours = this._calculateTotalHours(days, hours);
            let diskCost = diskCount*_price.currentPrice[region].diskGbHour*totalHours;
            return diskCost.toFixed(2);
        };

        Calculator.prototype._calculateBackupCost = function (region, backupCount, backupSpace, days, hours) {
            let totalHours = this._calculateTotalHours(days, hours);
            let backupCost = backupCount*backupSpace*_price.currentPrice[region].diskBackupHour*totalHours;
            return backupCost.toFixed(2);
        };

        Calculator.prototype._calculateIPv4Cost = function (region, ipv4Count, isMonthIPPayments, days, hours) {
            let totalHours = this._calculateTotalHours(days, hours);
            let ipv4Cost = null;
            if (totalHours > 0) {
                if (isMonthIPPayments == false) {
                    ipv4Cost = ipv4Count*_price.currentPrice[region].ipv4Hour*totalHours;
                } else {
                    let monthCount = (totalHours / 745 >> 0) + 1; //divide without remainder
                    ipv4Cost = ipv4Count*_price.currentPrice[region].ipv4Hour*24*31*monthCount;
                }
                return ipv4Cost.toFixed(2);
            } else return 0;
        };

        Calculator.prototype._calculateTrafficOutCost = function (region, trafficOutCount) {
            if (trafficOutCount < _price.currentPrice[region].configuration.trafficFreeLim) {
                trafficOutCount = 0;
            } else trafficOutCount = trafficOutCount - _price.currentPrice[region].configuration.trafficFreeLim;
            let trafficOutCost = trafficOutCount*_price.currentPrice[region].trafficOutGb;
            return trafficOutCost.toFixed(2);
        };

        Calculator.prototype._calculateOSCost = function (region, osType, days, hours) {
            let OSCost = undefined;
            let totalHours = this._calculateTotalHours(days, hours);

            if (osType == 0) {
                OSCost = 0;
                return OSCost;
            } else if (osType == 1) {
                OSCost = _price.currentPrice[region].winHour*totalHours;
                return OSCost.toFixed(2);
            } else {
                console.log("Error, virtuozzo_calculator.js: Unknown OS");
                return null;
            }
        };


        function getServerTotalCost() {

            let osCost = 0;
            if (osTypeIndex == 1) {
                osCost = price.currentPrice[region].winHour*hours*days;
                console.log("osType:" + "windows");
                console.log("os:" + osCost);
            }
            let result = cpuCost + ramCost + diskCost + ipCost + trafficCost + osCost;
            console.log(result);
            return result;
        }
        

        return Calculator;
    }());

    let Server = (function(){
        function Server(region, serverName, vCPUCoresCount, vCPUFrequencyGhz, ramGb, diskGb, backupCount, backupSpace, ipv4Count, isMonthIPPayments, trafficOutGb, vtType, osType, runningDays, runningHours, stoppedDays, stoppedHours) {
            this.region = region;
            this.serverName = serverName;
            this.vCPUCoresCount = vCPUCoresCount;
            this.vCPUFrequencyGhz = vCPUFrequencyGhz;
            this.ramGb = ramGb;
            this.diskGb = diskGb;
            this.backupCount = backupCount;
            this.backupSpace = backupSpace;
            this.ipv4Count = ipv4Count;
            this.isMonthIPPayments = isMonthIPPayments;
            this.trafficOutGb = trafficOutGb;
            this.vtType = vtType;
            this.osType = osType;
            this.runningDays = runningDays;
            this.runningHours = runningHours;
            this.stoppedDays = stoppedDays;
            this.stoppedHours = stoppedHours;
        }
        return Server;
    }());
    Virtuozzo.Calculator = Calculator;
    Virtuozzo.Server = Server;
})(Virtuozzo || (Virtuozzo = {}));