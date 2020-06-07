package ElasticCloudCalculator

type ElasticCloudPrice struct {
	Id      int64  `json:"id"`
	Name    string `json:"name"`
	Version string `json:"version"`
	BillingModel []BillingModel `json:"billingModel"`
}

type BillingModel struct {
	Id      int64  `json:"id"`
	Name    string `json:"name"`
	L18N	L18N	`json:"l18n"`
	Regions []Regions `json:"regions"`
}

type L18N struct {
	RU string `json:"ru"`
	EN string `json:"en"`
}

type Regions struct {
	Id      int64  `json:"id"`
	Name    string `json:"name"`
	L18N	L18N	`json:"l18n"`
	Datacenters []Datacenters `json:"datacenters"`
}

type Datacenters struct {
	Id      int64  `json:"id"`
	Name    string `json:"name"`
	L18N	L18N	`json:"l18n"`
	Segments []Segments `json:"segments"`
}

type Segments struct {
	Id      int64  `json:"id"`
	Name    string `json:"name"`
	L18N	L18N	`json:"l18n"`
	MinimalVMConfig MinimalVMConfig `json:"minimalVMConfig"`
	MaxVMConfig MaxVMConfig `json:"maxVMConfig"`
	ResourcesPricing ResourcesPricing `json:"resourcePricing"`
}

type MinimalVMConfig struct {
	vCPU int64 `json:"vCPU"`
	RAM int64 `json:"RAM"`
	LinuxStorage int64 `json:"linuxStorage"`
	WindowsStorage int64 `json:"windowsStorage"`
}

type MaxVMConfig struct {
	vCPU int64 `json:"vCPU"`
	RAM int64 `json:"RAM"`
	Storage int64 `json:"storage"`
}

type ResourcesPricing struct {
	vCPUPrice vCPUPrice `json:"vCPUPrice"`
	RAMPrice RAMPrice `json:"RAMPrice"`
	StoragePrice []StoragePrice `json:"storagePrice"`
}

type vCPUPrice struct {
	Id      int64  `json:"id"`
	Name    string `json:"name"`
	L18N	L18N	`json:"l18n"`
	CurrencyPrice []CurrencyPrice `json:"currencyPrice"`
}

type RAMPrice struct {
	Id      int64  `json:"id"`
	Name    string `json:"name"`
	L18N	L18N	`json:"l18n"`
	CurrencyPrice []CurrencyPrice `json:"currencyPrice"`
}

type StoragePrice struct {
	Id      int64  `json:"id"`
	Name    string `json:"name"`
	L18N	L18N	`json:"l18n"`
	CurrencyPrice []CurrencyPrice `json:"currencyPrice"`
}

type CurrencyPrice struct {
	Id      int64  `json:"id"`
	Name    string `json:"name"`
	L18N	L18N	`json:"l18n"`
	Value    float64	`json:"value"`
}