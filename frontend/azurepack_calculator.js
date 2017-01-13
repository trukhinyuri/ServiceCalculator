"use strict";
var AzurePack;
(function (AzurePack) {
    var Calculator = (function () {
        var _servers = [];
        var _vLANs = null;
        var _VPNs = null;
        var _discount = null;
        var _price = null;

        function Calculator(price) {
            if (price != null) {
                _price = price;
                setDefaultSubscriptionParameters();
            } else {
                console.log("Error in azurepack_calculator.js: please, set price");
            }
        }

        function setDefaultSubscriptionParameters() {
            _vLANs = _price.currentPrice[1].defaults.vLANs;
            _VPNs = _price.currentPrice[1].defaults.VPNs;
            _discount = _price.currentPrice[1].discounts[0];
        }

        Calculator.prototype.addServer = function (server) {
            _servers.push(this.validateServer(server));
        };

        Calculator.prototype.modifySubscription = function (vLANs, VPNs, discount) {
            _vLANs = this.validatevLANsCount(vLANs);
            _VPNs = this.validateVPNsCount(VPNs);
            _discount = this.validateDiscountCount(discount);
        };

        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        function isEmptyOrSpaces(str){
            return str === null || str.match(/^ *$/) !== null;
        }

        Calculator.prototype.validatevLANsCount = function (vLANs) {
            var _vLANs = vLANs;

            if (!isNumeric(vLANs)) {
                _vLANs = _price.currentPrice[1].defaults.vLANs;
            }

            if (vLANs < _price.currentPrice[1].defaults.vLANs) {
                _vLANs = _price.currentPrice[1].defaults.vLANs;
            }

            return _vLANs;
        };

        Calculator.prototype.validateVPNsCount = function (VPNs) {
            var _VPNs = VPNs;

            if (!isNumeric(VPNs)) {
                _VPNs = _price.currentPrice[1].defaults.VPNs;
            }

            if (VPNs < _price.currentPrice[1].defaults.VPNs) {
                _VPNs = _price.currentPrice[1].defaults.VPNs;
            }

            return _VPNs;
        };

        Calculator.prototype.validateDiscountCount = function (discount) {
            var _discount = null;

            if (!isNumeric(discount)) {
                _discount = _price.currentPrice[1].discounts[0];
            }

            for (var i in _price.currentPrice[1].discounts) {
                if (discount == _price.currentPrice[1].discounts[i]) {
                    _discount = discount;
                }
            }

            if (_discount == null) {
                _discount = _price.currentPrice[1].discounts[0];
            }

            return _discount;
        };

        Calculator.prototype.validateServer = function (server) {
            var _server = new AzurePack.Server (
                this.validateServerRegion(server.region),
                this.validateServerName(server.serverName),
                this.validateServerCores(server.cores),
                this.validateServerRam(server.ramGb),
                //TODO Disk Validator requires OS knowledge
                this.validateServerDisk(server.diskGb),
                server.snapshots,
                server.ipv4
            );
            return _server;
        }

        Calculator.prototype.validateServerRegion = function (region) {
            var _region = null;

            if (!isNumeric(region)) {
                _region = 1;
            }

            for (var i in _price.currentPrice) {
                if (region == i) {
                    _region = region;
                }
            }

            if (_region == null) {
                _region = 1;
            }

            return _region;
        };

        Calculator.prototype.validateServerName = function (serverName) {
            var _serverName = null;

            if (isEmptyOrSpaces(serverName)) {
                _serverName = _price.currentPrice[1].defaults.serverName;
                return _serverName;
            } else {
                _serverName = serverName;
                return _serverName;
            }
        };

        Calculator.prototype.validateServerCores = function (cores) {
            var _cores = cores;

            if (!isNumeric(cores)) {
                _cores = _price.currentPrice[1].limits.cpuCoresMin;
            }

            if (cores < _price.currentPrice[1].limits.cpuCoresMin) {
                _cores = _price.currentPrice[1].limits.cpuCoresMin;
            } else if (cores > _price.currentPrice[1].limits.cpuCoresMax) {
                _cores = _price.currentPrice[1].limits.cpuCoresMax;
            }

            return _cores;
        };

        Calculator.prototype.validateServerRam = function (ramGb) {
            var _ramGb = null;

            if (!isNumeric(ramGb)) {
                _ramGb = _price.currentPrice[1].limits.ramMin;
                return _ramGb;
            }

            if (ramGb < _price.currentPrice[1].limits.ramMin) {
                _ramGb = _price.currentPrice[1].limits.ramMin;
                return _ramGb;
            } else if (ramGb > _price.currentPrice[1].limits.ramMax) {
                _ramGb = _price.currentPrice[1].limits.ramMax;
                return _ramGb;
            }

            if (_ramGb == null) {
                _ramGb = ramGb;
            }

            return _ramGb;
        };

        Calculator.prototype.validateServerDisk = function (diskGb) {
            var _diskGb = diskGb;

            if (!isNumeric(diskGb)) {
                _diskGb = _price.currentPrice[1].limits.diskMin;
                return _diskGb;
            }

            if (diskGb < _price.currentPrice[1].limits.diskMin) {
                _diskGb = _price.currentPrice[1].limits.diskMin;
                return _diskGb;
            } else if (diskGb > _price.currentPrice[1].limits.diskMax) {
                _diskGb = _price.currentPrice[1].limits.diskMax;
                return _diskGb;
            }

            return _diskGb;
        };

        Calculator.prototype.validateServerSnapshots = function (snapshots) {
            var _cores = cores;

            if (!isNumeric(cores)) {
                _cores = _price.currentPrice[1].limits.cpuCoresMin;
            }

            if (cores < _price.currentPrice[1].limits.cpuCoresMin) {
                _cores = _price.currentPrice[1].limits.cpuCoresMin;
            } else if (cores > _price.currentPrice[1].limits.cpuCoresMax) {
                _cores = _price.currentPrice[1].limits.cpuCoresMax;
            }

            return snapshots;
        };

        Calculator.prototype.validateServerIPv4 = function (ipv4) {
            var _cores = cores;

            if (!isNumeric(cores)) {
                _cores = _price.currentPrice[1].limits.cpuCoresMin;
            }

            if (cores < _price.currentPrice[1].limits.cpuCoresMin) {
                _cores = _price.currentPrice[1].limits.cpuCoresMin;
            } else if (cores > _price.currentPrice[1].limits.cpuCoresMax) {
                _cores = _price.currentPrice[1].limits.cpuCoresMax;
            }

            return ipv4;
        };

        Calculator.prototype.getServers = function () {
            return _servers;
        };

        // Calculator.prototype.getCostOfInfrastructure = function() {
        //     var costOfServers = 0;
        //     if (_servers.length > 0) {
        //         for (var i = 0; i < _servers.length; i++) {
        //             costOfServers += parseFloat(this.getCostOfServer(_servers[i]));
        //         }
        //     }
        //     var costOfInfrastructure = costOfServers + this.getCostOfvLANs() + this.getCostOfVPNs();
        //     var costOfInfrastructureWithDiscounts = costOfInfrastructure * this.getDiscount();
        //     return costOfInfrastructureWithDiscounts.toFixed(2);
        // };

        Calculator.prototype.getCostOfServer = function (server) {
            var costOfServer =
                this._calculateCPUCost(server.region, server.cores)
                + this._calculateRAMCost(server.region, server.ramGb)
                + this._calculateDiskCost(server.region, server.diskGb)
                + this._calculateSnapshotsCost(server.region, server.diskGb, server.snapshots)
                + this._calculateIPCost(server.region, server.ipv4);
            return costOfServer;
        };

        Calculator.prototype.getCostOfAdditionalSubscriptionResources = function (resources) {
            var costOfResources =
                this._calculateVLANsCost(resources.region, resources.vLANs)
                + this._calculateVPNsCost(resources.region, resources.VPNs);
            return costOfResources;
        };

        Calculator.prototype.getCostOfvLANs = function (resources) {
            var costOfvLANs =
                this._calculateVLANsCost(resources.region, resources.vLANs);
            return costOfvLANs;
        };

        Calculator.prototype.getCostOfVPNs = function (resources) {
            var costOfVPNs =
                this._calculateVPNsCost(resources.region, resources.VPNs);
            return costOfVPNs;
        };

        Calculator.prototype._calculateCPUCost = function (region, cores) {
            var cpuCost = _price.currentPrice[region].vCoreMonth
                * _price.currentPrice[region].limits.vCoreMaxPower
                * cores;
            return cpuCost;
        };

        Calculator.prototype._calculateRAMCost = function (region, ramGb) {
            var ramCost = _price.currentPrice[region].ramGbMonth * ramGb;
            return ramCost;
        };

        Calculator.prototype._calculateDiskCost = function (region, diskGb) {
            var diskCost = _price.currentPrice[region].diskGbMonth * diskGb;
            return diskCost;
        };

        Calculator.prototype._calculateIPCost = function (region, ipv4) {
            var ipCost = _price.currentPrice[region].ipv4Month * ipv4;
            return ipCost;
        };

        Calculator.prototype._calculateSnapshotsCost = function (region, diskGb, snapshots) {
            var snapshotsCost = _price.currentPrice[region].diskGbMonth * diskGb * snapshots;
            return snapshotsCost;
        };

        Calculator.prototype._calculateVLANsCost = function (region, vLANs) {
            var vLANsCost = 0;
            if (vLANs > _price.currentPrice[region].defaults.vLANs) {
                vLANsCost = _price.currentPrice[region].vLANMonth * (vLANs - _price.currentPrice[region].defaults.vLANs);
            }

            return vLANsCost;
        };

        Calculator.prototype._calculateVPNsCost = function (region, VPNs) {
            var VPNsCost = 0;
            if (VPNs > _price.currentPrice[region].defaults.VPNs) {
                VPNsCost = _price.currentPrice[region].VPNMonth * (VPNs - _price.currentPrice[region].defaults.VPNs);
            }

            return VPNsCost;
        };

        return Calculator;
    }());

    var Server = (function(){
        function Server(
            region,
            serverName,
            cores,
            ram,
            disk,
            snapshots,
            ipv4
        ) {
            this.region = region;
            this.serverName = serverName;
            this.cores = cores;
            this.ramGb = ram;
            this.diskGb = disk;
            this.snapshots = snapshots;
            this.ipv4 = ipv4;
        }
        return Server;
    }());

    var AdditionalSubscriptionResources = (function(){
        function AdditionalSubscriptionResources(
            region,
            vLANs,
            VPNs
        ) {
            this.region = region;
            this.vLANs = vLANs;
            this.VPNs = VPNs;
        }
        return AdditionalSubscriptionResources;
    }());

    AzurePack.Calculator = Calculator;
    AzurePack.Server = Server;
    AzurePack.AdditionalSubscriptionResources = AdditionalSubscriptionResources;
})(AzurePack || (AzurePack = {}));