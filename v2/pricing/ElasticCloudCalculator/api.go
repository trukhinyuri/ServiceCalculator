package ElasticCloudCalculator

import (
	"encoding/json"
	"net/http"
)

var elasticCloudPrice = LoadPrice("config/ElasticCloud.json")

func GetPrice(w http.ResponseWriter, r *http.Request) {

	resultJSON, err := json.Marshal(elasticCloudPrice)
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(resultJSON)
}

func GetBillingModels(w http.ResponseWriter, r *http.Request) {
	resultJSON, err := json.Marshal(elasticCloudPrice.BillingModel)
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(resultJSON)
}
