import {Modules} from "./modules.js";

class ElasticCloudCalculator {
    constructor() {
        Modules.Loader.getModuleShadowDomRoots("ElasticCloudCalculator").forEach(SDRoot => {
            let elasticCloudPrice = this.getElasticCloudPrice();
            ElasticCloudCalculator._loadDefaults(SDRoot, elasticCloudPrice)
            this.activateSelectSwitches(SDRoot, "ecc_chooser_value_tarifModel");
            this.activateSelectSwitches(SDRoot, "ecc_chooser_value_region");
            this.addSelectorChangedHandler(SDRoot, "ecc_chooser_value_dc_select");
            // this.addSelectorChangedHandler(SDRoot, "ecc_chooser_value_segment_select", this.segmentChanged);
            this.addSubnetField(SDRoot, "ecc_chooser_addSubnetField");
            ElasticCloudCalculator.removeSubnetField(SDRoot, "ecc_chooser_removeSubnetField");
            this.calculateResultHandler(SDRoot, "ecc_addTo_result");

            this.fillDefaultValues(SDRoot);
            // this.addSelectorRegionSwitchLogic(SDRoot);
            // alert(this.getTabChooserValue(SDRoot, "ecc_chooser_value_tarifModel"))
        });
    }

    getElasticCloudPrice() {
        let elasticCloudPriceRaw = Modules.Server.getString("/api/elasticCloud/getPrice");
        // alert(elasticCloudPriceRaw)
        let elasticCloudPriceJSON = JSON.parse(elasticCloudPriceRaw);
        return elasticCloudPriceJSON;
    }

    static _loadDefaults(SDRoot, elasticCloudPrice) {
        let ecc_chooser_value_tarifModel = SDRoot.querySelectorAll("." + "ecc_chooser_value_tarifModel")[0];
        let ecc_chooser_value_tarifModel_tablinks = ecc_chooser_value_tarifModel.querySelectorAll(".tab_chooser_links");

        for (let i = 0; i < ecc_chooser_value_tarifModel_tablinks.length; i++) {
            ecc_chooser_value_tarifModel_tablinks[i].innerHTML = elasticCloudPrice.billingModel[i].l18n.ru;
        }

        let ecc_chooser_value_region = SDRoot.querySelectorAll("." + "ecc_chooser_value_region")[0];
        let ecc_chooser_value_region_tablinks = ecc_chooser_value_region.querySelectorAll(".tab_chooser_links");

        for (let i = 0; i < ecc_chooser_value_region_tablinks.length; i++) {
            ecc_chooser_value_region_tablinks[i].innerHTML = elasticCloudPrice.billingModel[0].regions[i].l18n.ru;
        }

        ElasticCloudCalculator._selectTabChooserActiveId(SDRoot, "ecc_chooser_value_tarifModel", 0);
        ElasticCloudCalculator._selectTabChooserActiveId(SDRoot, "ecc_chooser_value_region", 0);

        let datacentersDefault = [];
        for (let i = 0; i < elasticCloudPrice.billingModel[0].regions[0].datacenters.length; i++) {
            datacentersDefault.push(elasticCloudPrice.billingModel[0].regions[0].datacenters[i].l18n.ru);
        }
        ElasticCloudCalculator._fillChooser(SDRoot, "ecc_chooser_value_dc", datacentersDefault);

        let segmentsDefault = [];
        for (let i = 0; i < elasticCloudPrice.billingModel[0].regions[0].datacenters[0].segments.length; i++) {
            segmentsDefault.push(elasticCloudPrice.billingModel[0].regions[0].datacenters[0].segments[i].l18n.ru);
        }
        ElasticCloudCalculator._fillChooser(SDRoot, "ecc_chooser_value_segment", segmentsDefault);

        let ecc_chooser_value_vCPU_input = SDRoot.querySelectorAll("." + "ecc_chooser_value_vCPU_input")[0];
        ecc_chooser_value_vCPU_input.placeholder = "от " + elasticCloudPrice.billingModel[0].regions[0].datacenters[0].segments[0].minimalVMConfig.vCPU
            + " до " + "∞";
        ecc_chooser_value_vCPU_input.value = elasticCloudPrice.billingModel[0].regions[0].datacenters[0].segments[0].minimalVMConfig.vCPU;
        ecc_chooser_value_vCPU_input.focus();

        let ecc_chooser_value_RAM_input = SDRoot.querySelectorAll("." + "ecc_chooser_value_RAM_input")[0];
        ecc_chooser_value_RAM_input.placeholder = "от " + elasticCloudPrice.billingModel[0].regions[0].datacenters[0].segments[0].minimalVMConfig.RAM
            + " до " + "∞";
        ecc_chooser_value_RAM_input.value = elasticCloudPrice.billingModel[0].regions[0].datacenters[0].segments[0].minimalVMConfig.RAM;

        let ecc_chooser_name_nonSSD = SDRoot.querySelectorAll("." + "ecc_chooser_name_nonSSD")[0];
        ecc_chooser_name_nonSSD.innerHTML = elasticCloudPrice.billingModel[0].regions[0].datacenters[0].segments[0].resourcesPricing.StoragePrice[0].l18n.ru;

        let ecc_chooser_value_nonSSD_input = SDRoot.querySelectorAll("." + "ecc_chooser_value_nonSSD_input")[0];
        ecc_chooser_value_nonSSD_input.placeholder = "от 0 до ∞";
        ecc_chooser_value_nonSSD_input.value = elasticCloudPrice.billingModel[0].regions[0].datacenters[0].segments[0].minimalVMConfig.windowsStorage;

        let ecc_chooser_name_SAS = SDRoot.querySelectorAll("." + "ecc_chooser_name_SAS")[0];
        ecc_chooser_name_SAS.innerHTML = elasticCloudPrice.billingModel[0].regions[0].datacenters[0].segments[0].resourcesPricing.StoragePrice[1].l18n.ru;

        let ecc_chooser_value_SAS_input = SDRoot.querySelectorAll("." + "ecc_chooser_value_SAS_input")[0];
        ecc_chooser_value_SAS_input.placeholder = "от 0 до ∞";

        let ecc_chooser_name_SSD = SDRoot.querySelectorAll("." + "ecc_chooser_name_SSD")[0];
        ecc_chooser_name_SSD.innerHTML = elasticCloudPrice.billingModel[0].regions[0].datacenters[0].segments[0].resourcesPricing.StoragePrice[2].l18n.ru;

        let ecc_chooser_value_SSD_input = SDRoot.querySelectorAll("." + "ecc_chooser_value_SSD_input")[0];
        ecc_chooser_value_SSD_input.placeholder = "от 0 до ∞";
    }

    fillValues(SDRoot) {
        //ElasticCloudCalculator._selectTabChooserActiveId(SDRoot, "ecc_chooser_value_tarifModel", "1")
    }
    static _formDataChanged(SDRoot, elementClassName, value, id) {
        alert("changed " + elementClassName.toString());
        switch (elementClassName) {
            case "ecc_chooser_value_tarifModel": {
                //ElasticCloudCalculator._tarifModelChanged(SDRoot, id);
            }
            case "ecc_chooser_value_region": {
                //ElasticCloudCalculator._regionChanged(SDRoot, id);
            }
            case "ecc_chooser_value_dc": {
                //ElasticCloudCalculator._dcChanged(SDRoot, id);
            }
            case "ecc_chooser_value_segment": {
                //ElasticCloudCalculator._segmentChanged(SDRoot, id);
            }
        }
    }

    static _selectTabChooserActiveId(SDRoot, tab_chooserClassName, id) {
        let tab_chooser = SDRoot.querySelectorAll("." + tab_chooserClassName)[0];
        let tablinks = tab_chooser.querySelectorAll("." + "tab_chooser_links");

        for (let i = 0; i < tablinks.length; i++) {
            if (tablinks[i].id == id) {
                tablinks[i].classList.remove("tab_chooser_links_unselected");
                tablinks[i].classList.add("tab_chooser_links_selected");
            } else {
                tablinks[i].classList.remove("tab_chooser_links_selected");
                tablinks[i].classList.add("tab_chooser_links_unselected");
            }
        }
        ElasticCloudCalculator._formDataChanged(SDRoot, tab_chooserClassName, null, id);
    }

    static _fillChooser(SDRoot, chooserClassName, DCstrings) {
        let chooser_value = SDRoot.querySelectorAll("." + chooserClassName)[0];
        let chooser_value_select = chooser_value.querySelectorAll("."+ "custom-select")[0];
        chooser_value_select.innerHTML = "";
        for (let i = 0; i < DCstrings.length; i++) {
            chooser_value_select.innerHTML += "<option class=\""+ chooserClassName + "_option\" value=" + i + "\">" +
                DCstrings[i] +
                "</option>";
        }
    }

    static _tarifModelChanged(SDRoot, id, content) {
        let ecc_chooser_value_region = SDRoot.querySelectorAll("." + "ecc_chooser_value_region")[0];
        var ecc_chooser_value_region_tab_chooser_links = ecc_chooser_value_region.querySelectorAll("." + "tab_chooser_links");

        let ecc_chooser_value_dc_select = SDRoot.querySelectorAll("." + "ecc_chooser_value_dc_select")[0];

        let ecc_chooser_value_segment_select = SDRoot.querySelectorAll("." + "ecc_chooser_value_segment_select")[0];

        function _setChooserVisible(ecc_chooser_value, DCstrings) {
            ecc_chooser_value.innerHTML = "";
            for (let i = 0; i < DCstrings.length; i++) {
                ecc_chooser_value.innerHTML += "<option class=\"ecc_chooser_value_option\" value=" + i + "\">" +
                    DCstrings[i] +
                    "</option>";
            }
        }

        //Фиксированная в месяц
        if (id == 0) {
            //отображаем доп регионы в PAYG
            for (let i = 0; i < ecc_chooser_value_region_tab_chooser_links.length; i++) {
                if ((ecc_chooser_value_region_tab_chooser_links[i].innerHTML == "Санкт-Петербург")
                    || (ecc_chooser_value_region_tab_chooser_links[i].innerHTML == "Новосибирск")
                    || (ecc_chooser_value_region_tab_chooser_links[i].innerHTML == "Владивосток")){
                    ecc_chooser_value_region_tab_chooser_links[i].classList.remove("tab_chooser_links_inactive");
                }
            }

            _setChooserVisible(ecc_chooser_value_dc_select, ["DataPro", "КЦОД (недоступно для новых подключений)"])
            _setChooserVisible(ecc_chooser_value_segment_select, [
                "Bronze (2,3 ГГц Xeon Gold 6140)",
                "Silver (2,6 ГГц Xeon Gold 6132)",
                "Gold (3,5 ГГц Xeon Gold 6144)"
            ]);


            // setRegions(["Москва", "Санкт-Петербург", "Новосибирск", "Владивосток"]);
        } /*оплата по мере использования*/ else if (id == 1) {
            // скрываем доп регионы в PAYG
            for (let i = 0; i < ecc_chooser_value_region_tab_chooser_links.length; i++) {
                if (ecc_chooser_value_region_tab_chooser_links[i].innerHTML == "Москва") {
                    ecc_chooser_value_region_tab_chooser_links[i].classList.remove("tab_chooser_links_unselected");
                    ecc_chooser_value_region_tab_chooser_links[i].classList.add("tab_chooser_links_selected");
                }

                if ((ecc_chooser_value_region_tab_chooser_links[i].innerHTML == "Санкт-Петербург")
                    || (ecc_chooser_value_region_tab_chooser_links[i].innerHTML == "Новосибирск")
                    || (ecc_chooser_value_region_tab_chooser_links[i].innerHTML == "Владивосток")) {
                    ecc_chooser_value_region_tab_chooser_links[i].classList.remove("tab_chooser_links_selected");
                    ecc_chooser_value_region_tab_chooser_links[i].classList.add("tab_chooser_links_inactive");
                }
            }

            _setChooserVisible(ecc_chooser_value_dc_select, ["DataPro"])
            _setChooserVisible(ecc_chooser_value_segment_select, [
                "Bronze (2,3 ГГц Xeon Gold 6140)",
                "Silver (2,6 ГГц Xeon Gold 6132)",
                "Gold (3,5 ГГц Xeon Gold 6144)"
            ]);
        }
    }

    static _regionChanged(SDRoot, id, content) {
        let ecc_chooser_value_tarifModel = SDRoot.querySelectorAll("." + "ecc_chooser_value_tarifModel")[0];
        let tab_chooser_links_tarifModel = ecc_chooser_value_tarifModel.querySelectorAll("." + "tab_chooser_links");
        let ecc_chooser_value_dc_select = SDRoot.querySelectorAll("." + "ecc_chooser_value_dc_select")[0];

        let ecc_chooser_value_segment_select = SDRoot.querySelectorAll("." + "ecc_chooser_value_segment_select")[0];

        function _setChooserVisible(ecc_chooser_value, DCstrings) {
            ecc_chooser_value.innerHTML = "";
            for (let i = 0; i < DCstrings.length; i++) {
                ecc_chooser_value.innerHTML += "<option class=\"ecc_chooser_value_option\" value=" + i + "\">" +
                    DCstrings[i] +
                    "</option>";
            }
        }

        //Москва
        if (id == 0) {
            for (let i = 0; i < tab_chooser_links_tarifModel.length; i++) {
                if (tab_chooser_links_tarifModel[i].classList.contains("tab_chooser_links_selected")) {
                    //Фиксированная в месяц
                    if (i == 0) {
                        _setChooserVisible(ecc_chooser_value_dc_select, ["DataPro", "КЦОД (недоступно для новых подключений)"])
                        _setChooserVisible(ecc_chooser_value_segment_select, [
                            "Bronze (2,3 ГГц Xeon Gold 6140)",
                            "Silver (2,6 ГГц Xeon Gold 6132)",
                            "Gold (3,5 ГГц Xeon Gold 6144)"
                        ]);

                    } /*PAYG*/ else if (i == 1) {
                        _setChooserVisible(ecc_chooser_value_dc_select, ["DataPro"])
                        _setChooserVisible(ecc_chooser_value_segment_select, [
                            "Bronze (2,3 ГГц Xeon Gold 6140)",
                            "Silver (2,6 ГГц Xeon Gold 6132)",
                            "Gold (3,5 ГГц Xeon Gold 6144)"
                        ]);
                    }
                }
            }
        } /*Санкт-Петербург*/ else if (id == 1) {
            for (let i = 0; i < tab_chooser_links_tarifModel.length; i++) {
                if (tab_chooser_links_tarifModel[i].classList.contains("tab_chooser_links_selected")) {
                    //Фиксированная в месяц
                    if (i == 0) {
                        _setChooserVisible(ecc_chooser_value_dc_select, ["Санкт-Петербург - 1"]);
                        _setChooserVisible(ecc_chooser_value_segment_select, [
                            "Standard (2,6 ГГц Xeon E5-2660 v3)"
                        ]);
                    } /*PAYG*/ else if (i == 1) {
                        _setChooserVisible(ecc_chooser_value_dc_select, ["Санкт-Петербург - 1"]);
                        _setChooserVisible(ecc_chooser_value_segment_select, [
                            "Standard (2,6 ГГц Xeon E5-2660 v3)"
                        ]);
                    }
                }
            }
        } /*Новосибирск*/ else if (id == 2) {
            for (let i = 0; i < tab_chooser_links_tarifModel.length; i++) {
                if (tab_chooser_links_tarifModel[i].classList.contains("tab_chooser_links_selected")) {
                    //Фиксированная в месяц
                    if (i == 0) {
                        _setChooserVisible(ecc_chooser_value_dc_select, ["Новосибирск - 1"]);
                        _setChooserVisible(ecc_chooser_value_segment_select, [
                            "Standard (2,6 ГГц Xeon E5-2660 v3)"
                        ]);
                    } /*PAYG*/ else if (i == 1) {
                        _setChooserVisible(ecc_chooser_value_dc_select, ["Новосибирск - 1"]);
                        _setChooserVisible(ecc_chooser_value_segment_select, [
                            "Standard (2,6 ГГц Xeon E5-2660 v3)"
                        ]);
                    }
                }
            }
        } else if (id == 3) {
            for (let i = 0; i < tab_chooser_links_tarifModel.length; i++) {
                if (tab_chooser_links_tarifModel[i].classList.contains("tab_chooser_links_selected")) {
                    //Фиксированная в месяц
                    if (i == 0) {
                        _setChooserVisible(ecc_chooser_value_dc_select, ["Владивосток - 1"]);
                        _setChooserVisible(ecc_chooser_value_segment_select, [
                            "Standard (2,3 ГГц Xeon E5-2658 v4)"
                        ]);
                    } /*PAYG*/ else if (i == 1) {
                        _setChooserVisible(ecc_chooser_value_dc_select, ["Владивосток - 1"]);
                        _setChooserVisible(ecc_chooser_value_segment_select, [
                            "Standard (2,3 ГГц Xeon E5-2658 v4)"
                        ]);
                    }
                }
            }
        }
    }

    static _dcChanged(SDRoot) {

        let ecc_chooser_value_dc_select = SDRoot.querySelectorAll("." + "ecc_chooser_value_dc_select")[0];

        let ecc_chooser_value_segment_select = SDRoot.querySelectorAll("." + "ecc_chooser_value_segment_select")[0];

        function _setChooserVisible(ecc_chooser_value, DCstrings) {
            ecc_chooser_value.innerHTML = "";
            for (let i = 0; i < DCstrings.length; i++) {
                ecc_chooser_value.innerHTML += "<option class=\"ecc_chooser_value_option\" value=" + i + "\">" +
                    DCstrings[i] +
                    "</option>";
            }
        }

        let selectedDC = ecc_chooser_value_dc_select.options[ecc_chooser_value_dc_select.selectedIndex].text;

        //DataPro
        if (selectedDC == "DataPro") {
            _setChooserVisible(ecc_chooser_value_segment_select, [
                "Bronze (2,3 ГГц Xeon Gold 6140)",
                "Silver (2,6 ГГц Xeon Gold 6132)",
                "Gold (3,5 ГГц Xeon Gold 6144)"
            ]);
        } else if (selectedDC == "КЦОД (недоступно для новых подключений)") {
            _setChooserVisible(ecc_chooser_value_segment_select, [
                "Standard (2,6 ГГц Xeon E5-2660 v3)",
                "Silver (2,6 ГГц Xeon Gold 6132)",
                "Gold (3,5 ГГц Xeon Gold 6144)"
            ]);
        } else if (selectedDC == "Санкт-Петербург - 1") {
            _setChooserVisible(ecc_chooser_value_segment_select, [
                "Standard (2,6 ГГц Xeon E5-2660 v3)"
            ]);
        } else if (selectedDC == "Новосибирск - 1") {
            _setChooserVisible(ecc_chooser_value_segment_select, [
                "Standard (2,6 ГГц Xeon E5-2660 v3)"
            ]);
        } else if (selectedDC == "Владивосток - 1") {
            _setChooserVisible(ecc_chooser_value_segment_select, [
                "Standard (2,3 ГГц Xeon E5-2658 v4)"
            ]);
        }
    }

    _segmentChanged(SDRoot) {

    }
    calculateResultHandler (SDRoot, calculateResultButtonClassName) {
        let calculateResultButton = SDRoot.querySelectorAll("." + calculateResultButtonClassName)[0];
        calculateResultButton.addEventListener("click", function () {
            alert(Modules.Server.getString("/api/elasticCloud/getPrice"));
        });
    }

    addSubnetField (SDRoot, addSubnetFieldButtonClassName) {
        let addSubnetFieldButton = SDRoot.querySelectorAll("." + addSubnetFieldButtonClassName)[0];
        addSubnetFieldButton.addEventListener("click", function () {
            let parent = SDRoot.querySelectorAll("." + "ecc_chooser_value_IPv4subnet_space")[0];
            let source = SDRoot.querySelectorAll("." + "ecc_chooser_multi_value_hiddenCodeSource")[0];
            NodeList.prototype.forEach = Array.prototype.forEach;
            let children = source.childNodes;
            children.forEach(function(item){
                let cln = item.cloneNode(true);
                parent.appendChild(cln);
            });
            ElasticCloudCalculator.removeSubnetField(SDRoot, "ecc_chooser_removeSubnetField");
        });
    }

    static removeSubnetField (SDRoot, removeSubnetFieldButtonClassName) {
        let removeSubnetFieldButtons = SDRoot.querySelectorAll("." + removeSubnetFieldButtonClassName);
        let removeSubnetFieldButtonLatest = removeSubnetFieldButtons[removeSubnetFieldButtons.length - 1];
        removeSubnetFieldButtonLatest.addEventListener("click", function (e) {
            let parent = SDRoot.querySelectorAll("." + "ecc_chooser_value_IPv4subnet_space")[0];
            parent.removeChild(e.target.parentNode.parentNode);
         });
    }

    activateSelectSwitches(SDRoot, tab_chooserClassName) {
        let tab_chooser = SDRoot.querySelectorAll("."+tab_chooserClassName)[0];
        let tablinks = tab_chooser.querySelectorAll(".tab_chooser_links");

        for (let i = 0; i < tablinks.length; i++) {
            Modules.Events.addListener(tablinks[i], "click", function (event) {
                ElasticCloudCalculator._selectTabChooserActiveId(SDRoot, tab_chooserClassName, event.target.id)
                ElasticCloudCalculator._formDataChanged(SDRoot, tab_chooserClassName, null, event.target.id);
            });
        }
    }
    addChooserClickHandler(SDRoot, chooser, handler) {
        let selector_instance = SDRoot.querySelectorAll("." + chooser)[0];
        let tablinks = selector_instance.querySelectorAll(".tab_chooser_links");

        for (let i = 0; i < tablinks.length; i++) {
            Modules.Events.addListener(tablinks[i], "click", function (event) {
                for (let i = 0; i < tablinks.length; i++) {
                    if (tablinks[i].id === event.target.id) {
                       handler(SDRoot, event.target.id, tablinks[i].innerHTML);
                    }
                }
            });
        }
    }
    addSelectorChangedHandler(SDRoot, selectorClassName) {
        let selectorInstance = SDRoot.querySelectorAll("." + selectorClassName)[0];
        Modules.Events.addListener(selectorInstance, "change", function (event) {
            ElasticCloudCalculator._formDataChanged(SDRoot, selectorClassName, event.target.id)
        } );
    }




    getTabChooserValue(SDRoot, tabChooserClass) {
        let tab_chooser = SDRoot.querySelectorAll("." + tabChooserClass)[0];
        let tablinks = tab_chooser.querySelectorAll(".tab_chooser_links");

        for (let i = 0; i < tablinks.length; i++) {
            if (tablinks[i].classList.contains("tab_chooser_links_selected")) {
                return(tablinks[i].innerHTML)
            }
        }
    }






}

let ecc = new ElasticCloudCalculator();