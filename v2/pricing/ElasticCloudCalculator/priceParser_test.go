package ElasticCloudCalculator

import (
	"testing"
)

func TestLoadPrice(t *testing.T) {
	elasticCloudPrice := LoadPrice()
	t.Log(elasticCloudPrice)
	for i := 0; i < len(elasticCloudPrice.BillingModel); i++ {
		t.Log("Billing Model RU: ", elasticCloudPrice.BillingModel[i].L18N.EN)
		t.Log("Billing Model RU: ", elasticCloudPrice.BillingModel[i].L18N.RU)
	}

	if elasticCloudPrice.Id != 0 {
		t.Error("Expected 0, got ", elasticCloudPrice.Id)
	}
}
