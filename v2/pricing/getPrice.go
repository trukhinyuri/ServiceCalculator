package pricing

import (
	"encoding/json"
	"net/http"
)

type Result struct {
	Price  int
}

func GetPrice(w http.ResponseWriter, r *http.Request) {
	result := Result{}
	result.Price = getPriceCurrent("");

	resultJSON, err := json.Marshal(result)
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(resultJSON)
}

func getPriceCurrent(w string) int {
	return 0;
}
