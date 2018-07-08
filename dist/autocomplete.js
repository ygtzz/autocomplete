(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AutoComplete = undefined;

var _objectAssign = __webpack_require__(1);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AutoComplete(opts) {
    opts = (0, _objectAssign2.default)({
        target: '.autocomplete',
        dataset: [],
        debounce: 300
    }, opts);
    if (dataset.length < 1) {
        return;
    }
    var self = this;
    self.opts = opts;
    self.target = document.querySelector(opts.target);

    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
    var clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
    var clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;
    var box = self.target.getBoundingClientRect();
    var pos = {
        top: box.top + scrollTop - clientTop,
        left: box.left + scrollLeft - clientLeft,
        width: box.right - box.left,
        height: box.bottom - box.top
    };
    pos.top += pos.height;
    //插入提示框
    var autoId = 'auto-' + +new Date();
    var boxHtml = '<div id="' + autoId + '" style="left:' + pos.left + 'px;top:' + pos.top + 'px;width:' + pos.width + 'px;position:absolute;" class="autoc">\n                     <ul class="autos"></ul>\n                  </div>';
    document.body.insertAdjacentHTML('beforeend', boxHtml);
    self.autoc = document.getElementById(autoId);
    self.pos = -1;
    self.originValue = '';
    self.resultData = [];
    //监听输入框内容
    AutoComplete.prototype._changeAutoCompleteDebounce = debounce(AutoComplete.prototype._changeAutoComplete, opts.debounce);
    //阻止光标上下键移动
    self.target.addEventListener('keydown', function (e) {
        var code = e.which || e.keyCode;
        if (code == 38) {
            e.preventDefault();
        }
    });
    //keyup中可以同时获取到keyCode和input的value
    self.target.addEventListener('keyup', function (e) {
        e.preventDefault();
        var code = e.which || e.keyCode;
        var inputValue = e.target.value;
        self._handleInput(code, inputValue);
    });
}

AutoComplete.prototype._handleInput = function (code, inputValue) {
    console.log('code ' + code);
    //排除 shift,ctrl,alt键
    var excludes = [16, 17, 18];
    if (excludes.indexOf(code) > -1) {
        return;
    }
    //上键 38
    if (code == 38) {
        if (this.pos > -1) {
            this.pos -= 1;
        } else {
            this.pos = this.resultData.length - 1;
        }
        this._highlightAutoComplete(this.pos);
    }
    //下键 40
    else if (code == 40) {
            if (this.pos < this.resultData.length - 1) {
                this.pos += 1;
            } else {
                this.pos = -1;
            }
            this._highlightAutoComplete(this.pos);
        }
        //回车 
        else if (code == 13) {
                this._highlightAutoComplete(this.pos, true);
            } else {
                this._changeAutoCompleteDebounce(inputValue);
            }
};

AutoComplete.prototype._changeAutoComplete = function (inputValue) {
    var autoc = this.autoc;
    var resultData = this._findData(inputValue, this.opts.dataset);
    this.resultData = resultData;
    this.originValue = inputValue;
    if (resultData && resultData.length) {
        autoc.style.display = 'block';
        var dataHtml = resultData.map(function (item) {
            return '<li class="auto-item">\n                        <div class="auto-inner">' + item.value + '</div>\n                    </li>';
        }).join('');
        autoc.querySelector('.autos').innerHTML = dataHtml;
    } else {
        autoc.style.display = 'none';
    }
    //重置位置
    this.pos = -1;
};

AutoComplete.prototype._highlightAutoComplete = function (pos, bEnter) {
    var items = Array.prototype.slice.call(this.autoc.querySelectorAll('.auto-item'));
    items.forEach(function (item) {
        removeClass(item, 'active');
    });
    if (pos != -1) {
        var activeItem = items[pos];
        if (bEnter) {
            this.autoc.style.display = 'none';
        } else {
            addClass(activeItem, 'active');
        }
        this.target.value = activeItem.querySelector('.auto-inner').innerHTML;
    } else {
        this.target.value = this.originValue;
    }
};

AutoComplete.prototype._findData = function (str, dataset) {
    return dataset.filter(function (item) {
        return item.value.indexOf(str) > -1 && str.length > 0;
    });
};

function debounce(fn, delay) {
    var timer;
    return function () {
        var ctx = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(ctx, args);
        }, delay);
    };
}

function addClass(dom, className) {
    dom.classList.add(className);
}

function removeClass(dom, className) {
    dom.classList.remove(className);
}

exports.AutoComplete = AutoComplete;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ })
/******/ ]);
});