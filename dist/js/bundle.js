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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/javascript/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/javascript/index.js":
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n$(document).ready(function () {\n    var corona = {};\n\n    var fetch_data = function fetch_data(cb) {\n\n        //1. get loader\n        $.ajax({\n            url: 'https://coronavirus-worlddata.herokuapp.com/all',\n            type: 'GET',\n            success: function success(res) {\n                console.log(res);\n                corona.data = res;\n                corona.indonesia = res['indonesia'];\n                cb(corona);\n            },\n            error: function error(err) {\n                console.log(err);\n            }\n        });\n    };\n\n    var renderData = function renderData(res, DATA) {\n        //1. finish loader\n        var html = '',\n            replaceCured = void 0,\n            replaceDeaths = void 0;\n        if (DATA.length > 0) {\n            DATA.forEach(function (item) {\n                item.case.cured ? replaceCured = item.case.cured : replaceCured = '-';\n                item.case.deaths ? replaceDeaths = item.case.deaths : replaceDeaths = '-';\n\n                html += '\\n                    <div class=\"story\">\\n                            <div class=\"row\">\\n                                <div class=\"col-md-4\">\\n                                    <div class=\"story__country\">' + item.name + '</div>\\n                                </div>\\n                                <div class=\"col-md-8\">\\n                                    <ul class=\"story__list\">\\n                                        <li class=\"story__item\">Active : ' + item.case.active + '</li>\\n                                        <li class=\"story__item\">Cured : ' + replaceCured + '</li>\\n                                        <li class=\"story__item\">Deaths : ' + replaceDeaths + '</li>\\n                                        <li class=\"story__item\">Total : ' + item.case.total + '</li>\\n                                    </ul>\\n                                </div>\\n                            </div>\\n                    </div>\\n                ';\n            });\n        }\n\n        $('.collection-country').html(html);\n        $('.total_results').html(DATA.length + ' country');\n\n        $('.d_active').text('Active : ' + res.indonesia.active);\n        $('.d_cured').text('Cured : ' + res.indonesia.cured);\n        $('.d_deaths').text('Deaths : ' + res.indonesia.deaths);\n        $('.d_total').text('Total : ' + res.indonesia.total);\n    };\n\n    var onSearch = function onSearch() {\n        var input = void 0,\n            filter = void 0,\n            containerWrapper = void 0,\n            parentData = void 0,\n            childData = void 0,\n            i = void 0,\n            textValue = void 0;\n\n        input = document.querySelector('#name');\n        filter = input.value.toUpperCase();\n\n        containerWrapper = document.querySelector('.collection-country');\n        parentData = document.getElementsByClassName('story');\n\n        for (i = 0; i < parentData.length; i++) {\n            childData = parentData[i].getElementsByClassName('story__country')[0];\n\n            if (childData) {\n                textValue = childData.textContent || childData.innerText;\n                if (textValue.toUpperCase().indexOf(filter) > -1) {\n                    parentData[i].style.display = 'block';\n                } else {\n                    parentData[i].style.display = 'none';\n                }\n            }\n        }\n    };\n\n    fetch_data(function (res) {\n        var keys = void 0,\n            DATA = [];\n\n        keys = Object.keys(res.data);\n\n        keys.forEach(function (item) {\n\n            DATA.push({\n                name: item,\n                case: corona.data[item]\n            });\n        });\n\n        renderData(res, DATA);\n    });\n\n    $(document).on('keyup', '#name', function () {\n        onSearch();\n    });\n});\n\n//# sourceURL=webpack:///./src/javascript/index.js?");

/***/ })

/******/ });