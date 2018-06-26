#!/usr/bin/env bash
rm -r -f ./bower_components/modules.js/modules-ES5.js
babel ./bower_components/modules.js/modules-ES2015.js --presets latest >> ./bower_components/modules.js/modules-ES5.js
rm -r -f ./bower_components/modules.js/modules.js
uglifyjs --compress --mangle -- ./bower_components/modules.js/modules-ES5.js >> ./bower_components/modules.js/modules.js
rm -r -f ./bower_components/modules.js/modules-ES5.js
rm -r -f ./modules/virtuozzo/virtuozzo-ES5.js
babel ./modules/virtuozzo/virtuozzo-ES2015.js --presets latest >> ./modules/virtuozzo/virtuozzo-ES5.js
rm -r -f ./modules/virtuozzo/virtuozzo.js
uglifyjs --compress --mangle -- ./modules/virtuozzo/virtuozzo-ES5.js>> ./modules/virtuozzo/virtuozzo.js
rm -r -f ./modules/virtuozzo/virtuozzo-ES5.js
rm -r -f price-ES5.js
babel ./price-ES2015.js --presets latest >> ./price-ES5.js
rm -r -f price.js
uglifyjs --compress --mangle -- ./price-ES5.js >> ./price.js
rm -r -f price-ES5.js
rm -r -f index-ES5.js
babel ./index-ES2015.js --presets latest >> ./index-ES5.js
rm -r -f index.js
uglifyjs --compress --mangle -- ./index-ES5.js >> ./index.js
rm -r -f index-ES5.js
rm -r -f virtuozzo_calculator-ES5.js
babel ./virtuozzo_calculator-ES2015.js --presets latest >> ./virtuozzo_calculator-ES5.js
rm -r -f virtuozzo_calculator.js
uglifyjs --compress --mangle -- ./virtuozzo_calculator-ES5.js >> ./virtuozzo_calculator.js
rm -r -f virtuozzo_calculator-ES5.js

