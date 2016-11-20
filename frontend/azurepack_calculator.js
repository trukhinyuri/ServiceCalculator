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

        // Calculator.prototype.getCostOfServer = function (server) {
        //     var costOfServer =
        //         this._calculateCPUCost(server.region, server.cores)
        //         + this._calculateRAMCost(server)
        //         + this._calculateStorageCost(server)
        //         + this._calculateIPCost(server);
        //     return costOfServer;
        // };

        Calculator.prototype._calculateCPUCost = function (region, cores) {
            var cpuCost = _price.currentPrice[region].vCoreMonth * cores;
            return cpuCost;
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