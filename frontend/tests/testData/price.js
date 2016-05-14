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
                    "trafficFreeLim" : 3072,
                    "trafficIn" : 0,
                    "trafficOutGb" : 0.90,
                    "ipv4Month" : 90,
                    "ipv6Month": 0,
                    "days" : 30,
                    "hours" : 24,
                    "minPaymentForActivation" : 500
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
                    "trafficFreeLim" : 3072,
                    "trafficIn" : 0,
                    "trafficOutGb" : 0.50,
                    "ipv4Month" : 90,
                    "ipv6Month": 0,
                    "days" : 30,
                    "hours" : 24,
                    "minPaymentForActivation" : 500
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
                    "trafficFreeLim" : 3072,
                    "trafficIn" : 0,
                    "trafficOutGb" : 0.90,
                    "ipv4Month" : 90,
                    "ipv6Month": 0,
                    "days" : 30,
                    "hours" : 24,
                    "minPaymentForActivation" : 500
                }
            };
        }
        return VirtuozzoPrice;
    }());
    Price.VirtuozzoPrice = VirtuozzoPrice;
})(Price || (Price = {}));