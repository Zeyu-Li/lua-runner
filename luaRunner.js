"use strict";
exports.__esModule = true;
exports.runner = void 0;
var webassem_1 = require("./webassem");
function runner(code) {
    var output;
    // configuration for wasm
    var config = {
        print: (function () {
            return function (text) {
                if (arguments.length > 1)
                    text = Array.prototype.slice.call(arguments).join(' ');
                console.log(text);
                if (text != "emsc") {
                    output += text + "\n";
                }
            };
        })()
    };
    webassem_1.initWasmModule(config).then(function (Module) {
        Module.ccall("run_lua", 'number', ['string'], [code]);
    });
    return output;
}
exports.runner = runner;
