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
var luaRunner_1 = require("./luaRunner");
var TimeoutError = /** @class */ (function (_super) {
    __extends(TimeoutError, _super);
    function TimeoutError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "TimeoutError";
        return _this;
    }
    return TimeoutError;
}(Error));
/**
 * Run the lua code
 * @param code the code to be run in Lua
 * @param timeout an optional parameter that states the timeout of the code
 */
function run_lua(code, timeout) {
    if (timeout === void 0) { timeout = 5; }
    try {
        var val = luaRunner_1.runner(code);
        // remove undefined from the output
        return val.then(function (e) { return e.slice(9); });
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
exports["default"] = run_lua;
// debug
// run_lua(`    
//     function hello_lua()
//       print("Hello World!")
//       return "A"
//     end
//     return hello_lua()
//     `).then(e=> {
//         console.log(e)
//     })
