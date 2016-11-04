"use strict";
var Price;
(function (Price) {
    var VirtuozzoPrice = (function () {
        function VirtuozzoPrice() {
            this.currentPrice = {
                "0" : {
                    "region": "Россия, дата-центр в Санкт-Петербурге",
                    "winHour" : 0.695,
                    "cpuContainerGhzHour" : 0.272,
                    "cpuVMGhzHour" : 0.272,
                    "ramGbHour" : 0.417,
                    "diskGbHour" : 0.017,
                    "balancerHour" : 1.75,
                    "diskBackupHour" : 0.01,
                    "diskImagesHour" : 0.01,
                    "trafficIn" : 0,
                    "trafficOutGb" : 0.90,
                    "ipv4Month" : 90,
                    "ipv6Month": 0,
                    "days" : 30,
                    "hours" : 24,
                    "minPaymentForActivation" : 500,
                    "limits" : {
                        "cpuCoresMin": 1,
                        "cpuCoresMax": 24,
                        "ramMin": 0.5,
                        "ramMax": 64,
                        "diskMin": 10,
                        "diskMax": 2000,
                        "ipv4Min": 0,
                        "ipv4Max": 10,
                        "trafficFree": 3072
                    },
                    "defaults" : {
                        "serverName": "Облачный сервер",
                        "backupCount" : 0,
                        "backupSize" : 0,
                        "daysRunning" : 31,
                        "daysStopped" : 0,
                        "hoursRunning" : 0,
                        "hoursStopped" : 0
                    }
                },
                "1" : {
                    "region": "Россия, дата-центр в Москве",
                    "winHour" : 0.34,
                    "cpuContainerGhzHour" : 0.375,
                    "cpuVMGhzHour" : 0.75,
                    "ramGbHour" : 0.55,
                    "diskGbHour" : 0.0125,
                    "balancerHour" : 1.75,
                    "diskBackupHour" : 0.0038,
                    "diskImagesHour" : 0.0038,
                    "trafficIn" : 0,
                    "trafficOutGb" : 0.50,
                    "ipv4Month" : 90,
                    "ipv6Month": 0,
                    "days" : 30,
                    "hours" : 24,
                    "minPaymentForActivation" : 500,
                    "limits" : {
                        "cpuCoresMin": 1,
                        "cpuCoresMax": 24,
                        "ramMin": 0.5,
                        "ramMax": 64,
                        "diskMin": 10,
                        "diskMax": 2000,
                        "ipv4Min": 0,
                        "ipv4Max": 10,
                        "trafficFree": 3072
                    },
                    "defaults" : {
                        "serverName": "Облачный сервер",
                        "backupCount" : 0,
                        "backupSize" : 0,
                        "daysRunning" : 31,
                        "daysStopped" : 0,
                        "hoursRunning" : 0,
                        "hoursStopped" : 0
                    }
                },
                "2" : {
                    "region": "Европа, дата-центр в Амстердаме",
                    "winHour" : 0.695,
                    "cpuContainerGhzHour" : 0.272,
                    "cpuVMGhzHour" : 0.272,
                    "ramGbHour" : 0.417,
                    "diskGbHour" : 0.017,
                    "balancerHour" : 1.75,
                    "diskBackupHour" : 0.01,
                    "diskImagesHour" : 0.01,
                    "trafficIn" : 0,
                    "trafficOutGb" : 0.90,
                    "ipv4Month" : 90,
                    "ipv6Month": 0,
                    "days" : 30,
                    "hours" : 24,
                    "minPaymentForActivation" : 500,
                    "limits" : {
                        "cpuCoresMin": 1,
                        "cpuCoresMax": 24,
                        "ramMin": 0.5,
                        "ramMax": 64,
                        "diskMin": 10,
                        "diskMax": 2000,
                        "ipv4Min": 0,
                        "ipv4Max": 10,
                        "trafficFree": 3072
                    },
                    "defaults" : {
                        "serverName": "Облачный сервер",
                        "backupCount" : 0,
                        "backupSize" : 0,
                        "daysRunning" : 31,
                        "daysStopped" : 0,
                        "hoursRunning" : 0,
                        "hoursStopped" : 0
                    }
                }
            };
        }
        return VirtuozzoPrice;
    }());
    Price.VirtuozzoPrice = VirtuozzoPrice;
})(Price || (Price = {}));