package ElasticCloudCalculator

import (
	"encoding/json"
	"io/ioutil"
)

func SavePrice() {


	elasticCloudPrice := ElasticCloudPrice{}

	elasticCloudPrice.Id = 0;
	elasticCloudPrice.Name = "ElasticCloud";



	file, _ := json.MarshalIndent(elasticCloudPrice, "", " ")

	_ = ioutil.WriteFile("test.json", file, 0644)

	//return elasticCloudPrice
}
