/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/* eslint-disable no-console */
__webpack_require__(1);
var fs = __webpack_require__(2);
var fetch = __webpack_require__(3);
var glob = __webpack_require__(4);
var FormData = __webpack_require__(5);

var result = fs.readFileSync(`${process.env.PWD}/styleway.json`, "utf8");
var config = JSON.parse(result);

var url = config.url,
    css = config.css,
    js = config.js,
    source = config.source,
    assets = config.assets,
    rest = _objectWithoutProperties(config, ["url", "css", "js", "source", "assets"]);

glob(`${process.env.PWD}/${css}`, function (err, filesCSS) {
  glob(`${process.env.PWD}/${js}`, function (err2, filesJS) {
    glob(`${process.env.PWD}/${source}`, function (err3, filesSource) {
      glob(`${process.env.PWD}/${assets}`, function (err4, filesAssets) {
        var form = new FormData();
        filesCSS.forEach(function (file) {
          form.append("css", fs.createReadStream(file));
        });
        filesJS.forEach(function (file) {
          form.append("js", fs.createReadStream(file));
        });
        filesSource.forEach(function (file) {
          form.append("source", fs.createReadStream(file));
        });
        filesAssets.forEach(function (file) {
          form.append("assets", fs.createReadStream(file));
        });
        var keys = Object.keys(rest);
        keys.forEach(function (key) {
          return form.append(key, rest[key]);
        });

        fetch(`${config.url}codePlugin/uploadFiles`, {
          headers: form.getHeaders(),
          method: "POST",
          body: form
        }).then(function (res) {
          if (res.status === 200) {
            console.log("Successfully uploaded files");
          } else {
            console.log("There was an error");
            console.log(res);
          }
        }).catch(function (err5) {
          return console.log(err5);
        });
      });
    });
  });
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("glob");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("form-data");

/***/ })
/******/ ]);