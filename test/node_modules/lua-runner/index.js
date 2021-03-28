"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.run_lua_res = exports.run_lua = void 0;
var luaRunner_1 = require("./luaRunner");
/**
 * A custom timeout error
 */
var TimeoutError = /** @class */ (function (_super) {
    __extends(TimeoutError, _super);
    /**
     * The constructor
     * @param message
     * error message
     */
    function TimeoutError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "TimeoutError";
        return _this;
    }
    return TimeoutError;
}(Error));
function run_lua(code, timeout) {
    if (timeout === void 0) { timeout = 5; }
    var codeString = '';
    if (typeof code == "object") {
        // if array of objects try to concate the elements into one string
        try {
            code.forEach(function (element) {
                codeString += element + '\n';
            });
        }
        catch (e) {
            throw new TypeError("The type provided can only be string or string array");
        }
    }
    else if (typeof code == "string") {
        codeString = code;
    }
    try {
        var val = luaRunner_1.runner(codeString);
        // remove undefined from the output and the last char of new line
        return val.then(function (e) { return e.slice(9).slice(0, -1); });
    }
    catch (e) {
        // debug
        console.log("Error: " + e);
    }
    // after timeout seconds, throw timeout error
    setTimeout(function () {
        throw new TimeoutError("Code exceeded " + timeout + " seconds");
    }, timeout * 1000);
}
exports.run_lua = run_lua;
function run_lua_res(code, timeout) {
    if (timeout === void 0) { timeout = 5; }
    return run_lua(code, timeout).then(function (res) {
        return {
            "return": res.lastIndexOf('\n') == -1 ? null : res.slice(0, res.lastIndexOf('\n')),
            exit_code: res.split(/\r?\n/).pop().slice(18)
        };
    });
}
exports.run_lua_res = run_lua_res;
// debug
// run_lua_res("    \n    function hello_lua()\n      print(\"Hello World!\")\n      return \"A\"\n    end\n    \n    return hello_lua()\n    ").then(function (e) {
//     console.log(e);
// });
