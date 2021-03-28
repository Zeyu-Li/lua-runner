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
        return val;
    }
    catch (e) {
        // debug
        console.log(e);
    }
    // after timeout seconds, throw timeout error
    setTimeout(function () {
        throw new TimeoutError("Code exceeded " + timeout + " seconds");
    }, timeout * 1000);
}
console.log(run_lua("--[[\n    This is a Lua online editor!\n    Currently running Lua version 5.4.0\n    Source code here: https://github.com/Zeyu-Li/Lua-Online\n    ]]\n    \n    function hello_lua()\n      print(\"Hello World!\")\n      return \"Hit Ctrl-B to rebuild\"\n    end\n    \n    return hello_lua()\n    "));
