"use strict";
exports.__esModule = true;
exports.runner = void 0;
var webassem_1 = require("./webassem");
var runner = function (code) {
    var output;
    // configuration for wasm
    var config = {
        print: (function () {
            return function (text) {
                if (arguments.length > 1)
                    text = Array.prototype.slice.call(arguments).join(' ');
                // console.log(text);
                if (text != "emsc") {
                    output += text + "\n";
                }
            };
        })()
    };
    return webassem_1.initWasmModule(config).then(function (Module) {
        Module.ccall("run_lua", 'number', ['string'], [code]);
    }).then(function () {
        return output;
    })["catch"](function () {
        return "Error";
    });
};
exports.runner = runner;
