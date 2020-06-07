import {Modules} from "./../../modules.js";

class ElasticCloudCalculator {
    constructor() {
        let SDRoot = this.buildShadowDomRoot();
        this.activateSelectSwitches(SDRoot, "ecc_chooser_value_tarifModel");
        this.activateSelectSwitches(SDRoot, "ecc_chooser_value_region");
        this.addChooserClickHandler(SDRoot, "ecc_chooser_value_tarifModel",  this._tarifModelChanged);
        this.addChooserClickHandler(SDRoot, "ecc_chooser_value_region",  this._regionChanged);
        this.addSelectorChangedHandler(SDRoot, "ecc_chooser_value_dc_select", this._dcChanged);
        this.addSelectorChangedHandler(SDRoot, "ecc_chooser_value_segment_select", this.segmentChanged);
        // this.addSelectorRegionSwitchLogic(SDRoot);
        // alert(this.getTabChooserValue(SDRoot, "ecc_chooser_value_tarifModel"))
    }

    buildShadowDomRoot() {
        let HeadContainer = document.getElementsByClassName("services")[0].shadowRoot;
        let Container = HeadContainer.querySelectorAll("."+DynamicSDRoot)[0];
        // let InternalContainer = Container.getElementsByClassName(DynamicSDRootInternalClass)[0];
        let SDRoot = Container.shadowRoot;
        return SDRoot;
    }
    // getPrice() {
    //     let price = [{
    //         "version": {
    //             "year": "2019",
    //             "month" : "12",
    //             "day": "8",
    //             "rev": "0"
    //         },
    //         "payModels" : {
    //             "0" : "Фиксированная в месяц",
    //             "1" : "Оплата по мере использования"
    //         }
    //     }];
    //     return price;
    // }
    activateSelectSwitches(SDRoot, tab_chooserClassName) {
        let tab_chooser = SDRoot.querySelectorAll("."+tab_chooserClassName)[0];
        let tablinks = tab_chooser.querySelectorAll(".tab_chooser_links");

        for (let i = 0; i < tablinks.length; i++) {
            Modules.Events.addListener(tablinks[i], "click", function (event) {
                for (let i = 0; i < tablinks.length; i++) {
                    if (tablinks[i].id === event.target.id) {
                        tablinks[i].classList.remove("tab_chooser_links_unselected");
                        tablinks[i].classList.add("tab_chooser_links_selected");
                    } else {
                        tablinks[i].classList.remove("tab_chooser_links_selected");
                        tablinks[i].classList.add("tab_chooser_links_unselected");
                    }
                }
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
    addSelectorChangedHandler(SDRoot, selector, handler) {
        let selectorInstance = SDRoot.querySelectorAll("." + selector)[0];
        Modules.Events.addListener(selectorInstance, "change", function (event) {
            handler(SDRoot, event);
        } );
    }

    _tarifModelChanged(SDRoot, id, content) {
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
    _regionChanged(SDRoot, id, content) {
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

    getTabChooserValue(SDRoot, tabChooserClass) {
        let tab_chooser = SDRoot.querySelectorAll("." + tabChooserClass)[0];
        let tablinks = tab_chooser.querySelectorAll(".tab_chooser_links");

        for (let i = 0; i < tablinks.length; i++) {
            if (tablinks[i].classList.contains("tab_chooser_links_selected")) {
                return(tablinks[i].innerHTML)
            }
        }
    }

    _dcChanged(SDRoot, event) {
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

    _segmentChanged(SDRoot, event) {

    }
}


let ecc = new ElasticCloudCalculator();