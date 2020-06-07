package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"
)

var (
	BuildVersion string = ""
	BuildTime    string = ""
)

var dbUpgradePtr *bool
var servicePortPtr *int
var versionPtr *bool

func init() {
	servicePortPtr = flag.Int("port", 3002, "Service port")
	versionPtr = flag.Bool("version", false, "Show app version")
}

func main() {
	flag.Parse()
	submain(flag.Args())
}

func submain(args []string) {
	startService()
}

func printServiceVersion() {
	fmt.Println(BuildVersion)
}

func startService() {
	mux := http.NewServeMux()

	apiPath := "/api"
	mux.HandleFunc(apiPath+"/version", testApi)

	fileServer := http.FileServer(http.Dir("./frontend"))
	mux.Handle("/", http.StripPrefix("/", fileServer))

	servicePortString := strconv.Itoa(*servicePortPtr)
	log.Println("Starting server on :" + servicePortString)
	log.Fatal(http.ListenAndServe(":"+servicePortString, mux))
}

type Test struct {
	Message  string
	CreateAt time.Time
}

func testApi(w http.ResponseWriter, r *http.Request) {
	testObj := Test{}
	testObj.Message = BuildTime;
	testObj.CreateAt = time.Now().Local()

	testObjJSON, err := json.Marshal(testObj)
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(testObjJSON)
}
