package ElasticCloudCalculator

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
)

func LoadPrice(path string) ElasticCloudPrice {
	// Open our jsonFile
	jsonFile, err := os.Open(path)
	// if we os.Open returns an error then handle it
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successfully Opened ElasticCloud.json")
	// defer the closing of our jsonFile so that we can parse it later on
	defer jsonFile.Close()

	file, _ := ioutil.ReadAll(jsonFile)

	elasticCloudPrice := ElasticCloudPrice{}

	_ = json.Unmarshal([]byte(file), &elasticCloudPrice)

	return elasticCloudPrice
}
