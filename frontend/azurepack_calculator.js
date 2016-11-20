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
            _servers.push(this._validateServer(server));
        };

        Calculator.prototype.modifySubscription = function (vLANs, VPNs, discount) {
            _vLANs = this.validatevLANsCount(vLANs);
            _VPNs = this.validateVPNsCount(VPNs);
            _discount = this.validateDiscountCount(discount);
        };

        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
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
        }

        //TODO: Implement _validateServer
        Calculator.prototype._validateServer = function (server) {
            var _server = server;
            return _server;
        }


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

        Calculator.prototype._calculateCPUCost = function (region, cores) {
            var cpuCost = _price.currentPrice[region].vCoreMonth * cores;
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

    AzurePack.Calculator = Calculator;
    AzurePack.Server = Server;
})(AzurePack || (AzurePack = {}));