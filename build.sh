#!/usr/bin/env bash

#
# Simple "build" script that just copies the app into the build/ directory.
#

mkdir build/
rm -rf build/*
cp -r src/*.html src/*.css src/bar src/line src/scatter src/lib/generateChartImg.js src/lib/chartStorage.js src/lib/sortPoints.js src/chartBuilder build/
