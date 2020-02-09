"use strict";
(function(){
    var totalCostMessage = document.getElementsByClassName("totalCost")[0];
    var totalCost = 0;
    Modules.Events.Messages.subscribe("addCost", addCost);
    Modules.Events.Messages.subscribe("removeCost", removeCost);
    Modules.Events.Messages.subscribe("resetCost", resetCost);
    function addCost(e) {
        var cost = parseFloat(e.detail.message);
        totalCost += cost;
        updateTotalCost(totalCost.toFixed(2)/1);
    }
    function removeCost(e) {
        var cost = parseFloat(e.detail.message);
        if (cost <= totalCost) {
            totalCost -= cost;
        } else {
            totalCost = 0;
        }
        updateTotalCost(totalCost.toFixed(2)/1);

    }

    function resetCost(e) {
        totalCost = 0;
        updateTotalCost(0);
    }

    function updateTotalCost(newSummaryCost) {
        totalCostMessage.innerHTML = "Примерная стоимость облачной инфраструктуры: "
        + newSummaryCost
            + " руб.";

    }
}());