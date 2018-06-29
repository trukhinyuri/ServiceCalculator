"use strict";
const PriceES2015 = {};
PriceES2015.Virtuozzo = class {
    get currentPrice() {
        return {
            "0" : {
            "region": "Россия, Санкт-Петербург (подписка Virtuozzo Infrastructure SPB)",
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
                "ipv4Hour" : 0.125,
                "ipv6Hour": 0,
                "days" : 31,
                "hours" : 24,
                "minPaymentForActivation" : 500,
                "limits" : {
                "minCPUCores": 1,
                    "maxCPUCores": 24,
                    "minCPUFrequency": 1,
                    "maxCPUFrequency": 2.3,
                    "minRamCapacity": 0.5,
                    "maxRamCapacity": 64,
                    "minDiskCapacity": 10,
                    "maxDiskCapacity": 2000,
                    "minIPv4": 0,
                    "maxIPv4": 10,
                    "vtType": ["Контейнер", "Виртуальная машина (разрешить управление ядром ОС)"],
                    "osType": ["Linux", "Windows"]
            },
            "configuration": {
                "trafficFreeLim": 3072,
                    "isTrafficUnlim": false,
                    "isMonthIPPayments": true
            },
            "defaults" : {
                "serverName": "Облачный сервер",
                    "backupCount" : 0,
                    "backupSize" : 0,
                    "trafficDefault": 0,
                    "runningDays" : 31,
                    "stoppedDays" : 0,
                    "runningHours" : 0,
                    "stoppedHours" : 0
            }
        },
            "1" : {
            "region": "Европа, Амстердам (подписка Virtuozzo Infrastructure AMS)",
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
                "ipv4Hour" : 0.125,
                "ipv6Hour": 0,
                "days" : 31,
                "hours" : 24,
                "minPaymentForActivation" : 500,
                "limits" : {
                    "minCPUCores": 1,
                    "maxCPUCores": 24,
                    "minCPUFrequency": 1,
                    "maxCPUFrequency": 2.3,
                    "minRamCapacity": 0.5,
                    "maxRamCapacity": 64,
                    "minDiskCapacity": 10,
                    "maxDiskCapacity": 2000,
                    "minIPv4": 0,
                    "maxIPv4": 10,
                    "vtType": ["Контейнер", "Виртуальная машина (разрешено управление ядром ОС)"],
                    "osType": ["Linux", "Windows"]
                },
                "configuration": {
                    "trafficFreeLim": 3072,
                    "isTrafficUnlim": false,
                    "isMonthIPPayments": true
                },
                "defaults" : {
                    "serverName": "Облачный сервер",
                    "backupCount" : 0,
                    "backupSize" : 0,
                    "trafficDefault": 0,
                    "runningDays" : 31,
                    "stoppedDays" : 0,
                    "runningHours" : 0,
                    "stoppedHours" : 0
                }
        },
            "2" : {
                "region": "(скоро!) Россия, Санкт-Петербург (подписка InfoboxCloud SPB)",
                "winHour" : 1.5,
                "cpuContainerGhzHour" : 0.3,
                "cpuVMGhzHour" : 0.35,
                "ramGbHour" : 0.19,
                "diskGbHour" : 0.008,
                "balancerHour" : 1.75,
                "diskBackupHour" : 0.005,
                "diskImagesHour" : 0.005,
                "trafficIn" : 0,
                "trafficOutGb" : 0,
                "ipv4Hour" : 0.125,
                "ipv6Hour": 0,
                "days" : 31,
                "hours" : 24,
                "minPaymentForActivation" : 500,
                "limits" : {
                    "minCPUCores": 1,
                    "maxCPUCores": 24,
                    "minCPUFrequency": 0.3,
                    "maxCPUFrequency": 2.3,
                    "minRamCapacity": 1,
                    "maxRamCapacity": 64,
                    "minDiskCapacity": 10,
                    "maxDiskCapacity": 2000,
                    "minIPv4": 0,
                    "maxIPv4": 10,
                    "vtType": ["Контейнер", "Виртуальная машина (разрешить управление ядром ОС)"],
                    "osType": ["Linux", "Windows"]
                },
                "configuration": {
                    "trafficFreeLim": 0,
                    "isTrafficUnlim": true,
                    "isMonthIPPayments": false
                },
                "defaults" : {
                    "serverName": "Облачный сервер",
                    "backupCount" : 0,
                    "backupSize" : 0,
                    "trafficDefault": 0,
                    "runningDays" : 31,
                    "stoppedDays" : 0,
                    "runningHours" : 0,
                    "stoppedHours" : 0
                }
            },
            "3" : {
                "region": "(скоро!) Европа, Амстердам (подписка InfoboxCloud AMS)",
                "winHour" : 1.5,
                "cpuContainerGhzHour" : 0.3,
                "cpuVMGhzHour" : 0.35,
                "ramGbHour" : 0.19,
                "diskGbHour" : 0.008,
                "balancerHour" : 1.75,
                "diskBackupHour" : 0.005,
                "diskImagesHour" : 0.005,
                "trafficIn" : 0,
                "trafficOutGb" : 0,
                "ipv4Hour" : 0.125,
                "ipv6Hour": 0,
                "days" : 31,
                "hours" : 24,
                "minPaymentForActivation" : 500,
                "limits" : {
                    "minCPUCores": 1,
                    "maxCPUCores": 24,
                    "minCPUFrequency": 0.3,
                    "maxCPUFrequency": 2.3,
                    "minRamCapacity": 1,
                    "maxRamCapacity": 64,
                    "minDiskCapacity": 10,
                    "maxDiskCapacity": 2000,
                    "minIPv4": 0,
                    "maxIPv4": 10,
                    "vtType": ["Контейнер", "Виртуальная машина (разрешить управление ядром ОС)"],
                    "osType": ["Linux", "Windows"]
                },
                "configuration": {
                    "trafficFreeLim": 0,
                    "isTrafficUnlim": true,
                    "isMonthIPPayments": false
                },
                "defaults" : {
                    "serverName": "Облачный сервер",
                    "backupCount" : 0,
                    "backupSize" : 0,
                    "trafficDefault": 0,
                    "runningDays" : 31,
                    "stoppedDays" : 0,
                    "runningHours" : 0,
                    "stoppedHours" : 0
                }
            },
            "4" : {
                "region": "(архив) Россия, Санкт-Петербург (подписка Azure Pack Infrastructure)",
                "winHour" : 0,
                "cpuContainerGhzHour" : 0.434,
                "cpuVMGhzHour" : 0.434,
                "ramGbHour" : 0.376,
                "diskGbHour" : 0.012,
                "balancerHour" : 1.75,
                "diskBackupHour" : 0.01,
                "diskImagesHour" : 0.01,
                "trafficIn" : 0,
                "trafficOutGb" : 0,
                "ipv4Hour" : 0.12,
                "ipv6Hour": 0,
                "days" : 31,
                "hours" : 24,
                "minPaymentForActivation" : 500,
                "limits" : {
                    "minCPUCores": 1,
                    "maxCPUCores": 24,
                    "minCPUFrequency": 0.3,
                    "maxCPUFrequency": 2.3,
                    "minRamCapacity": 1,
                    "maxRamCapacity": 64,
                    "minDiskCapacity": 10,
                    "maxDiskCapacity": 2000,
                    "minIPv4": 0,
                    "maxIPv4": 10,
                    "vtType": ["Контейнер", "Виртуальная машина (разрешить управление ядром ОС)"],
                    "osType": ["Linux", "Windows"]
                },
                "configuration": {
                    "trafficFreeLim": 0,
                    "isTrafficUnlim": true,
                    "isMonthIPPayments": false
                },
                "defaults" : {
                    "serverName": "Облачный сервер",
                    "backupCount" : 0,
                    "backupSize" : 0,
                    "trafficDefault": 0,
                    "runningDays" : 31,
                    "stoppedDays" : 0,
                    "runningHours" : 0,
                    "stoppedHours" : 0
                }
            },
            // "0" : {
            //     "region": "Россия, дата-центр в Санкт-Петербурге",
            //     "winHour" : 0.695,
            //     "cpuContainerGhzHour" : 0.272,
            //     "cpuVMGhzHour" : 0.272,
            //     "ramGbHour" : 0.417,
            //     "diskGbHour" : 0.017,
            //     "balancerHour" : 1.75,
            //     "diskBackupHour" : 0.01,
            //     "diskImagesHour" : 0.01,
            //     "trafficIn" : 0,
            //     "trafficOutGb" : 0.90,
            //     "ipv4Month" : 90,
            //     "ipv6Month": 0,
            //     "days" : 30,
            //     "hours" : 24,
            //     "minPaymentForActivation" : 500,
            //     "limits" : {
            //         "cpuCoresMin": 1,
            //         "cpuCoresMax": 24,
            //         "ramMin": 0.5,
            //         "ramMax": 64,
            //         "diskMin": 10,
            //         "diskMax": 2000,
            //         "ipv4Min": 0,
            //         "ipv4Max": 10,
            //         "trafficFree": 3072
            //     },
            //     "defaults" : {
            //         "serverName": "Облачный сервер",
            //         "backupCount" : 0,
            //         "backupSize" : 0,
            //         "daysRunning" : 31,
            //         "daysStopped" : 0,
            //         "hoursRunning" : 0,
            //         "hoursStopped" : 0
            //     }
            // },
            // "1" : {
            //     "region": "Россия, дата-центр в Москве",
            //     "winHour" : 0.34,
            //     "cpuContainerGhzHour" : 0.375,
            //     "cpuVMGhzHour" : 0.75,
            //     "ramGbHour" : 0.55,
            //     "diskGbHour" : 0.0125,
            //     "balancerHour" : 1.75,
            //     "diskBackupHour" : 0.0038,
            //     "diskImagesHour" : 0.0038,
            //     "trafficIn" : 0,
            //     "trafficOutGb" : 0.50,
            //     "ipv4Month" : 90,
            //     "ipv6Month": 0,
            //     "days" : 30,
            //     "hours" : 24,
            //     "minPaymentForActivation" : 500,
            //     "limits" : {
            //         "cpuCoresMin": 1,
            //         "cpuCoresMax": 24,
            //         "ramMin": 0.5,
            //         "ramMax": 64,
            //         "diskMin": 10,
            //         "diskMax": 2000,
            //         "ipv4Min": 0,
            //         "ipv4Max": 10,
            //         "trafficFree": 3072
            //     },
            //     "defaults" : {
            //         "serverName": "Облачный сервер",
            //         "backupCount" : 0,
            //         "backupSize" : 0,
            //         "daysRunning" : 31,
            //         "daysStopped" : 0,
            //         "hoursRunning" : 0,
            //         "hoursStopped" : 0
            //     }
            // },

            //oldCurrent
            // "1" : {
            //     "region": "Европа, дата-центр в Амстердаме",
            //     "winHour" : 0.695,
            //     "cpuContainerGhzHour" : 0.272,
            //     "cpuVMGhzHour" : 0.272,
            //     "ramGbHour" : 0.417,
            //     "diskGbHour" : 0.017,
            //     "balancerHour" : 1.75,
            //     "diskBackupHour" : 0.01,
            //     "diskImagesHour" : 0.01,
            //     "trafficIn" : 0,
            //     "trafficOutGb" : 0.90,
            //     "ipv4Hour" : 90,
            //     "ipv6Hour": 0,
            //     "days" : 30,
            //     "hours" : 24,
            //     "minPaymentForActivation" : 500,
            //     "limits" : {
            //         "cpuCoresMin": 1,
            //         "cpuCoresMax": 24,
            //         "ramMin": 0.5,
            //         "ramMax": 64,
            //         "diskMin": 10,
            //         "diskMax": 2000,
            //         "ipv4Min": 0,
            //         "ipv4Max": 10,
            //         "trafficFree": 3072
            //     },
            //     "defaults" : {
            //         "serverName": "Облачный сервер",
            //         "backupCount" : 0,
            //         "backupSize" : 0,
            //         "daysRunning" : 31,
            //         "daysStopped" : 0,
            //         "hoursRunning" : 0,
            //         "hoursStopped" : 0
            //     }
            // }
        }
    }
};

PriceES2015.AzurePack = class {
    get currentPrice() {
        return {
            "1" : {
                "region": "Россия, дата-центр в Санкт-Петербурге",
                "vCoreMonth" : 750,
                "ramGbMonth" : 280,
                "diskGbMonth" : 9.5,
                "diskBackupMonth" : 9.5,
                "ipv4Month" : 90,
                "vLANMonth" : 50,
                "VPNMonth" : 100,
                "discounts": {
                    "0" : 1,
                    "1" : 0.95,
                    "2" : 0.90
                },
                "limits" : {
                    "cpuCoresMin": 1,
                    "cpuCoresMax": 48,
                    "vCoreMaxPower": 0.9,
                    "ramMin": 2,
                    "ramMax": 256,
                    "diskMin": 25,
                    "diskMax": 65536,
                    "ipv4Min": 0,
                    "ipv4Max": 10,
                    "diskStepGb": 50
                },
                "defaults" : {
                    "serverName": "Облачный сервер",
                    "backupCount" : 0,
                    "vLANs": 2,
                    "VPNs" : 2
                }
            }
        }
    }
};

// let Price;
// (function (Price) {
//     let VirtuozzoPrice = (function () {
//         function VirtuozzoPrice() {
//             this.currentPrice = {
//                 "0" : {
//                     "region": "Россия, дата-центр в Санкт-Петербурге (подписка InfoboxCloud SPB)",
//                     "winHour" : 1.5,
//                     "cpuContainerGhzHour" : 0.3,
//                     "cpuVMGhzHour" : 0.35,
//                     "ramGbHour" : 0.19,
//                     "diskGbHour" : 0.008,
//                     "balancerHour" : 1.75,
//                     "diskBackupHour" : 0.005,
//                     "diskImagesHour" : 0.005,
//                     "trafficIn" : 0,
//                     "trafficOutGb" : 0,
//                     "ipv4Hour" : 0.125,
//                     "ipv6Hour": 0,
//                     "days" : 30,
//                     "hours" : 24,
//                     "minPaymentForActivation" : 990,
//                     "limits" : {
//                         "minCPUCores": 1,
//                         "maxCPUCores": 24,
//                         "minCPUFrequency": 0.3,
//                         "maxCPUFrequency": 2.3,
//                         "minRamCapacity": 0.5,
//                         "maxRamCapacity": 64,
//                         "minDiskCapacity": 10,
//                         "maxDiskCapacity": 2000,
//                         "minIPv4": 0,
//                         "maxIPv4": 10,
//                         "vtType": ["Контейнер", "Виртуальная машина (разрешить управление ядром ОС)"],
//                         "osType": ["Linux", "Windows"]
//                     },
//                     "configuration": {
//                         "trafficFreeLim": 0,
//                         "isTrafficUnlim": true,
//                         "isMonthIPPayments": false
//                     },
//                     "defaults" : {
//                         "serverName": "Cloud Server",
//                         "backupCount" : 1,
//                         "backupSize" : 0,
//                         "trafficDefault": 0,
//                         "runningDays" : 31,
//                         "stoppedDays" : 0,
//                         "runningHours" : 0,
//                         "stoppedHours" : 0
//                     }
//                 },
//                 "1" : {
//                     "region": "Европа, дата-центр в Амстердаме (подписка InfoboxCloud AMS)",
//                     "winHour" : 1.5,
//                     "cpuContainerGhzHour" : 0.3,
//                     "cpuVMGhzHour" : 0.35,
//                     "ramGbHour" : 0.19,
//                     "diskGbHour" : 0.008,
//                     "balancerHour" : 1.75,
//                     "diskBackupHour" : 0.005,
//                     "diskImagesHour" : 0.005,
//                     "trafficIn" : 0,
//                     "trafficOutGb" : 0,
//                     "ipv4Hour" : 0.125,
//                     "ipv6Hour": 0,
//                     "days" : 30,
//                     "hours" : 24,
//                     "minPaymentForActivation" : 990,
//                     "limits" : {
//                         "minCPUCores": 1,
//                         "maxCPUCores": 24,
//                         "minCPUFrequency": 0.3,
//                         "maxCPUFrequency": 2.3,
//                         "minRamCapacity": 0.5,
//                         "maxRamCapacity": 64,
//                         "minDiskCapacity": 10,
//                         "maxDiskCapacity": 2000,
//                         "minIPv4": 0,
//                         "maxIPv4": 10,
//                         "vtType": ["Контейнер", "Виртуальная машина (разрешить управление ядром ОС)"],
//                         "osType": ["Linux", "Windows"]
//                     },
//                     "configuration": {
//                         "trafficFreeLim": 0,
//                         "isTrafficUnlim": false,
//                         "isMonthIPPayments": false
//                     },
//                     "defaults" : {
//                         "serverName": "Cloud Server",
//                         "backupCount" : 1,
//                         "backupSize" : 0,
//                         "trafficDefault": 0,
//                         "runningDays" : 31,
//                         "stoppedDays" : 0,
//                         "runningHours" : 0,
//                         "stoppedHours" : 0
//                     }
//                 },
//                 // "0" : {
//                 //     "region": "Россия, дата-центр в Санкт-Петербурге",
//                 //     "winHour" : 0.695,
//                 //     "cpuContainerGhzHour" : 0.272,
//                 //     "cpuVMGhzHour" : 0.272,
//                 //     "ramGbHour" : 0.417,
//                 //     "diskGbHour" : 0.017,
//                 //     "balancerHour" : 1.75,
//                 //     "diskBackupHour" : 0.01,
//                 //     "diskImagesHour" : 0.01,
//                 //     "trafficIn" : 0,
//                 //     "trafficOutGb" : 0.90,
//                 //     "ipv4Month" : 90,
//                 //     "ipv6Month": 0,
//                 //     "days" : 30,
//                 //     "hours" : 24,
//                 //     "minPaymentForActivation" : 500,
//                 //     "limits" : {
//                 //         "cpuCoresMin": 1,
//                 //         "cpuCoresMax": 24,
//                 //         "ramMin": 0.5,
//                 //         "ramMax": 64,
//                 //         "diskMin": 10,
//                 //         "diskMax": 2000,
//                 //         "ipv4Min": 0,
//                 //         "ipv4Max": 10,
//                 //         "trafficFree": 3072
//                 //     },
//                 //     "defaults" : {
//                 //         "serverName": "Облачный сервер",
//                 //         "backupCount" : 0,
//                 //         "backupSize" : 0,
//                 //         "daysRunning" : 31,
//                 //         "daysStopped" : 0,
//                 //         "hoursRunning" : 0,
//                 //         "hoursStopped" : 0
//                 //     }
//                 // },
//                 // "1" : {
//                 //     "region": "Россия, дата-центр в Москве",
//                 //     "winHour" : 0.34,
//                 //     "cpuContainerGhzHour" : 0.375,
//                 //     "cpuVMGhzHour" : 0.75,
//                 //     "ramGbHour" : 0.55,
//                 //     "diskGbHour" : 0.0125,
//                 //     "balancerHour" : 1.75,
//                 //     "diskBackupHour" : 0.0038,
//                 //     "diskImagesHour" : 0.0038,
//                 //     "trafficIn" : 0,
//                 //     "trafficOutGb" : 0.50,
//                 //     "ipv4Month" : 90,
//                 //     "ipv6Month": 0,
//                 //     "days" : 30,
//                 //     "hours" : 24,
//                 //     "minPaymentForActivation" : 500,
//                 //     "limits" : {
//                 //         "cpuCoresMin": 1,
//                 //         "cpuCoresMax": 24,
//                 //         "ramMin": 0.5,
//                 //         "ramMax": 64,
//                 //         "diskMin": 10,
//                 //         "diskMax": 2000,
//                 //         "ipv4Min": 0,
//                 //         "ipv4Max": 10,
//                 //         "trafficFree": 3072
//                 //     },
//                 //     "defaults" : {
//                 //         "serverName": "Облачный сервер",
//                 //         "backupCount" : 0,
//                 //         "backupSize" : 0,
//                 //         "daysRunning" : 31,
//                 //         "daysStopped" : 0,
//                 //         "hoursRunning" : 0,
//                 //         "hoursStopped" : 0
//                 //     }
//                 // },
//
//                 //oldCurrent
//                 // "1" : {
//                 //     "region": "Европа, дата-центр в Амстердаме",
//                 //     "winHour" : 0.695,
//                 //     "cpuContainerGhzHour" : 0.272,
//                 //     "cpuVMGhzHour" : 0.272,
//                 //     "ramGbHour" : 0.417,
//                 //     "diskGbHour" : 0.017,
//                 //     "balancerHour" : 1.75,
//                 //     "diskBackupHour" : 0.01,
//                 //     "diskImagesHour" : 0.01,
//                 //     "trafficIn" : 0,
//                 //     "trafficOutGb" : 0.90,
//                 //     "ipv4Hour" : 90,
//                 //     "ipv6Hour": 0,
//                 //     "days" : 30,
//                 //     "hours" : 24,
//                 //     "minPaymentForActivation" : 500,
//                 //     "limits" : {
//                 //         "cpuCoresMin": 1,
//                 //         "cpuCoresMax": 24,
//                 //         "ramMin": 0.5,
//                 //         "ramMax": 64,
//                 //         "diskMin": 10,
//                 //         "diskMax": 2000,
//                 //         "ipv4Min": 0,
//                 //         "ipv4Max": 10,
//                 //         "trafficFree": 3072
//                 //     },
//                 //     "defaults" : {
//                 //         "serverName": "Облачный сервер",
//                 //         "backupCount" : 0,
//                 //         "backupSize" : 0,
//                 //         "daysRunning" : 31,
//                 //         "daysStopped" : 0,
//                 //         "hoursRunning" : 0,
//                 //         "hoursStopped" : 0
//                 //     }
//                 // }
//             };
//         }
//         return VirtuozzoPrice;
//     }());
//
//     let AzurePackPrice = (function () {
//         function AzurePackPrice() {
//             this.currentPrice = {
//                 "1" : {
//                     "region": "Россия, дата-центр в Санкт-Петербурге",
//                     "vCoreMonth" : 750,
//                     "ramGbMonth" : 280,
//                     "diskGbMonth" : 9.5,
//                     "diskBackupMonth" : 9.5,
//                     "ipv4Month" : 90,
//                     "vLANMonth" : 50,
//                     "VPNMonth" : 100,
//                     "discounts": {
//                         "0" : 1,
//                         "1" : 0.95,
//                         "2" : 0.90
//                     },
//                     "limits" : {
//                         "cpuCoresMin": 1,
//                         "cpuCoresMax": 48,
//                         "vCoreMaxPower": 0.9,
//                         "ramMin": 2,
//                         "ramMax": 256,
//                         "diskMin": 25,
//                         "diskMax": 65536,
//                         "ipv4Min": 0,
//                         "ipv4Max": 10,
//                         "diskStepGb": 50
//                     },
//                     "defaults" : {
//                         "serverName": "Облачный сервер",
//                         "backupCount" : 0,
//                         "vLANs": 2,
//                         "VPNs" : 2
//                     }
//                 }
//             };
//         }
//         return AzurePackPrice;
//     }());
//     Price.VirtuozzoPrice = VirtuozzoPrice;
//     Price.AzurePackPrice = AzurePackPrice;
// })(Price || (Price = {}));