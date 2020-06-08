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
	ResourcesPricing ResourcesPricing `json:"resourcesPricing"`
}

type MinimalVMConfig struct {
	VCPU int64 `json:"vCPU"`
	RAM int64 `json:"RAM"`
	LinuxStorage int64 `json:"linuxStorage"`
	WindowsStorage int64 `json:"windowsStorage"`
}

type MaxVMConfig struct {
	VCPU int64 `json:"vCPU"`
	RAM int64 `json:"RAM"`
	Storage int64 `json:"storage"`
}

type ResourcesPricing struct {
	VCPUPrice VCPUPrice `json:"vCPUPrice"`
	RAMPrice RAMPrice `json:"RAMPrice"`
	StoragePrice []StoragePrice `json:"StoragePrice"`
}

type VCPUPrice struct {
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