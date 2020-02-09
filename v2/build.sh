#!/usr/bin/env bash
version=0.0
time=$(date +"%y-%m-%d %T")
echo $version
echo $time
env GOOS=darwin go build -o "sc" -ldflags="-X 'main.BuildTime=$time' -X 'main.BuildVersion=$version'" .